// Single source for each page's <title> and description.
// Used at runtime (usePageMeta) and at build time (prerender plugin in
// vite.config.ts), so link previews and the browser tab always agree.
import { projects } from '../data/projects'
import { strategyFrameworks } from '../data/strategy'
import { aiProjects } from '../data/ai-projects'

export const SITE_URL = 'https://devonsa.work'
const SITE_NAME = 'Devon Anderson'

export interface PageMeta {
  path: string
  title: string
  description: string
  // Link-preview image (1200x630 JPEG in public/og/). Case studies use
  // their own; every other page falls back to the name-and-avatar card.
  image?: string
}

const DEFAULT_META: PageMeta = {
  path: '/',
  title: 'Devon Anderson | UX Design Portfolio',
  description:
    'Devon Anderson is a Staff UX Designer (contract at Lime, formerly Google) specializing in AI agent workflows, Generative AI interfaces, and scalable communication platforms.',
}

const withName = (title: string) => `${title} | ${SITE_NAME}`

const DEFAULT_IMAGE = '/og/default.jpg'

export const pages: PageMeta[] = [
  DEFAULT_META,
  {
    path: '/about',
    title: withName('About'),
    description:
      'About Devon Anderson: a Staff UX Designer with a background in philosophy and environmental science, designing agentic AI and communication systems at scale.',
  },
  {
    path: '/contact',
    title: withName('Contact'),
    description:
      'Get in touch with Devon Anderson about product design, AI tools, or a project you have in mind.',
  },
  ...projects.map((p) => ({
    path: `/project/${p.id}`,
    title: withName(p.title),
    description: p.description || p.subtitle,
    image: `/og/${p.id}.jpg`,
  })),
  ...strategyFrameworks.map((s) => ({
    path: `/strategy/${s.id}`,
    title: withName(s.title),
    description: s.description || s.subtitle || s.title,
    image: `/og/${s.id}.jpg`,
  })),
  ...aiProjects.map((a) => ({
    path: `/ai-project/${a.id}`,
    title: withName(a.title),
    description: a.subtitle,
  })),
].map((page) => ({ ...page, image: page.image ?? DEFAULT_IMAGE }))

// Served by Vercel (as 404.html) for any address that isn't a real page
export const NOT_FOUND_META: Omit<PageMeta, 'path'> = {
  title: withName('Page not found'),
  description: "This page doesn't exist or has moved. Head back to Devon Anderson's portfolio.",
}

export const getPageMeta = (pathname: string): PageMeta => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return pages.find((p) => p.path === normalized) ?? { ...NOT_FOUND_META, path: normalized }
}
