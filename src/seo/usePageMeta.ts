import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMeta, pages, SITE_URL } from './pages'

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

// Keeps the tab title, description, canonical URL and social tags in sync
// with the current route. The build-time prerender writes the same values
// into each page's HTML for crawlers that don't run JavaScript.
export const usePageMeta = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = getPageMeta(pathname)
    const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`

    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)

    // Case studies have a preview image; other pages drop any left over
    // from the previous route
    const imageKeys = [
      ['property', 'og:image'],
      ['property', 'og:image:width'],
      ['property', 'og:image:height'],
      ['name', 'twitter:card'],
    ] as const
    if (meta.image) {
      setMeta('property', 'og:image', `${SITE_URL}${meta.image}`)
      setMeta('property', 'og:image:width', '1200')
      setMeta('property', 'og:image:height', '630')
      setMeta('name', 'twitter:card', 'summary_large_image')
    } else {
      imageKeys.forEach(([attr, key]) =>
        document.head.querySelector(`meta[${attr}="${key}"]`)?.remove(),
      )
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    // Unknown addresses (the 404 page) shouldn't claim a canonical URL
    if (!pages.some((p) => p.path === meta.path)) {
      canonical?.remove()
      return
    }
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [pathname])
}
