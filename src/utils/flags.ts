// Preview flags for work that isn't public yet.
//
// A flag is switched on per browser by opening any page with `?<flag>=on`
// (and off again with `?<flag>=off`). The choice is remembered in
// localStorage, so one shared link is enough:
//   https://devonsa.work/project/lime-support-agent?lime=on
//
// This hides a page from the site's navigation and from search engines. It
// is not access control: the page's code and images still ship with the site.
export type Flag = 'lime'

const storageKey = (flag: Flag) => `portfolio-flag-${flag}`

const readStored = (flag: Flag): boolean => {
  try {
    return localStorage.getItem(storageKey(flag)) === 'on'
  } catch {
    return false
  }
}

const writeStored = (flag: Flag, on: boolean) => {
  try {
    if (on) localStorage.setItem(storageKey(flag), 'on')
    else localStorage.removeItem(storageKey(flag))
  } catch {
    // Private windows can block storage; the flag then lasts for this URL only
  }
}

export const isFlagEnabled = (flag: Flag): boolean => {
  // The build-time prerender loads modules that call this outside a browser
  if (typeof window === 'undefined') return false

  const param = new URLSearchParams(window.location.search).get(flag)
  if (param === 'on' || param === 'off') {
    writeStored(flag, param === 'on')
    return param === 'on'
  }
  return readStored(flag)
}
