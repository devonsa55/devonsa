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
