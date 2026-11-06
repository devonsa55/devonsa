import { defineConfig, createServer, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs/promises'
import type { PageMeta } from './src/seo/pages'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Writes dist/<route>.html for every page with that page's title,
// description, canonical URL and Open Graph tags filled in. Link previews
// (LinkedIn, Slack, iMessage) don't run JavaScript, so without this every
// shared link would show the homepage's title. The body is still the SPA.
// Vercel's cleanUrls serves /project/x from project/x.html.
const prerenderPageMeta = (): Plugin => ({
  name: 'prerender-page-meta',
  apply: 'build',
  async closeBundle() {
    const loader = await createServer({
      configFile: false,
      root: __dirname,
      logLevel: 'silent',
      server: { middlewareMode: true, hmr: false },
      appType: 'custom',
    })
    const { pages, SITE_URL, NOT_FOUND_META } = (await loader.ssrLoadModule(
      '/src/seo/pages.ts',
    )) as {
      pages: PageMeta[]
      SITE_URL: string
      NOT_FOUND_META: Omit<PageMeta, 'path'>
    }
    await loader.close()

    const outDir = path.resolve(__dirname, 'dist')
    const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8')

    const render = (meta: { title: string; description: string }, url: string | null) => {
      const title = escapeHtml(meta.title)
      const description = escapeHtml(meta.description)
      return template
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
        .replace(
          /<meta name="description"[\s\S]*?\/>/,
          `<meta name="description" content="${description}" />`,
        )
        .replace(
          /<meta property="og:title"[\s\S]*?\/>/,
          `<meta property="og:title" content="${title}" />`,
        )
        .replace(
          /<meta property="og:description"[\s\S]*?\/>/,
          `<meta property="og:description" content="${description}" />`,
        )
        .replace(
          /<meta property="og:url"[\s\S]*?\/>/,
          url
            ? `<meta property="og:url" content="${url}" />\n  <link rel="canonical" href="${url}" />`
            : '',
        )
    }

    for (const page of pages) {
      const url = `${SITE_URL}${page.path === '/' ? '/' : page.path}`
      const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
      await fs.mkdir(path.dirname(path.join(outDir, file)), { recursive: true })
      await fs.writeFile(path.join(outDir, file), render(page, url))
    }

    // Vercel serves 404.html, with a 404 status, for any unmatched address.
    // It still boots the app, so the router shows the styled NotFound page.
    await fs.writeFile(path.join(outDir, '404.html'), render(NOT_FOUND_META, null))
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), prerenderPageMeta()],
  base: '/',
  build: {
    // Hashed build output lives in /static so it can be cached immutably;
    // /assets is reserved for un-hashed files copied from public/assets.
    assetsDir: 'static',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
