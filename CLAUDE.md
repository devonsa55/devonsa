# Devon Anderson — portfolio (devonsa.work)

Personal UX portfolio. React 19 + TypeScript SPA, built with Vite 8, styled with Tailwind 4 plus per-component CSS, hosted on Vercel. Visual design rules live in [DESIGN.md](./DESIGN.md) — read it before any UI work.

## Commands

- `npm run dev` — dev server on :5173
- `npm run build` — `tsc` then `vite build` into `dist/` (also prerenders per-page HTML, see SEO)
- `npm run lint` — ESLint 9 flat config, includes React Hooks rules
- Pre-commit hook (husky + lint-staged) runs Prettier and `eslint --fix` on staged files, so files may be reformatted on commit.

## Deploying

- **Pushing to `main` deploys to production** via Vercel's Git integration. There is no GitHub Actions workflow anymore.
- Work on a branch; merge to `main` only when Devon explicitly says to deploy. Branch pushes get Vercel previews, but previews sit behind Vercel login and can't be checked by an agent — verify locally, then verify on devonsa.work right after a production deploy.
- Production env vars are set in the Vercel project: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_TURNSTILE_SITE_KEY` (see `.env.example`; real values in the gitignored `.env.local`).

## Hosting config (`vercel.json`)

- `cleanUrls: true` serves `/project/x` from `dist/project/x.html`. There is deliberately **no** catch-all rewrite: every real page has its own prerendered HTML file, and anything else gets `dist/404.html` with a real 404 status (it boots the app, which renders the styled NotFound page).
- Hashed build output goes to `dist/static/` (`build.assetsDir`) and is cached immutably for a year. `public/assets/` is **not** fingerprinted, so it must not be cached long — don't move build output back into `/assets`.
- Security headers on every response: `nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`, and a CSP in **report-only** mode. Plan: switch to an enforced `Content-Security-Policy` on or after 2026-11-12 if the console shows no violations. If you add a third-party script, font, frame or API origin, add it to the CSP first.

## Routing

- `BrowserRouter` with clean URLs (`/project/:id`, `/strategy/:id`, `/ai-project/:id`, `/about`, `/contact`). The site used hash URLs until Nov 2026; `src/main.tsx` rewrites old `/#/...` links to clean paths before the router reads them — keep that.
- Every page except Home is `React.lazy`-loaded and prefetched when the homepage goes idle (`App.tsx`). The feedback form (which pulls in Supabase) loads only when opened.
- In-page anchors (`/#work`, `/#strategy`, `/#systems`) are scrolled to by `ScrollToHash` in `App.tsx`, which retries for up to 4 s because the target page mounts only after the previous page's exit animation. "Back to Work" links point at the section the page came from.

## SEO and link previews

- `src/seo/pages.ts` is the single source of each page's title, description and preview image, derived from `src/data/*.ts`. It's used at runtime by `usePageMeta` and at build time by the `prerender-page-meta` plugin in `vite.config.ts`, which writes `dist/<route>.html` (and `404.html`) with the right `<title>`, description, canonical and Open Graph tags — link previews don't run JavaScript.
- Preview images: `public/og/<id>.jpg` (1200x630) per case study; `public/og/default.jpg` (avatar + name card) for every other page.
- **Adding a page or case study:** add its data, add a matching `public/og/<id>.jpg` if it's a case study, and add its URL to `public/sitemap.xml` (the sitemap is hand-maintained).

## Images

- Site images are WebP, sized to about 2x their displayed width (case-study screenshots max 1800px, carousel photos 1400px). Convert new images the same way; the build does no image optimization.
- Everything in `public/` ships to production, so delete files that nothing references.

## Feedback form (Supabase)

- Submissions go through the `verify-feedback` Supabase Edge Function (`supabase/functions/verify-feedback/`), which verifies a Cloudflare Turnstile token, rate-limits per IP, and inserts with the service role key. The anon key has **no** insert access to `public.messages` — don't add direct client inserts back.
- Turnstile rejects `localhost` (error 110200) unless it's added to the widget's allowed domains, so the form can't be submitted in local dev.

## Theming

- Light/dark via `data-mode="dark"` on `<html>`, persisted in `localStorage['portfolio-mode']` (`src/context/ThemeContext.tsx`). Color tokens are CSS variables in `src/index.css`; style through tokens and check both modes.

## Dependency upgrade plan and constraints

Done: minor updates, ESLint 9 + React Hooks rules, Vite 8, React 19 + framer-motion 14, Tailwind 4 + tailwind-merge 3 + lucide 1.x. No major upgrades are pending.

Pinned on purpose:

- `@vitejs/plugin-react` stays on 5.x: 6.x's optional Babel 8 peers conflict with the Babel 7 still used by `shadcn` and `eslint-plugin-react-hooks`. Revisit when those move to Babel 8.
- ESLint stays on 9: `eslint-plugin-react` doesn't support ESLint 10 yet.
- Skip TypeScript 7 (the native rewrite) until the ecosystem needs it.

## Tailwind 4 notes

- There is no `tailwind.config.js`: theme tokens live in the `@theme inline` block at the top of `src/index.css`, and PostCSS uses `@tailwindcss/postcss`.
- **Unlayered CSS beats every utility, whatever its specificity.** Element-level rules (`*`, `body`, headings, `a`, `button`, `img`...) must stay inside `@layer base` in `src/index.css`, or they cancel utilities (an unlayered `* { padding: 0 }` wiped out all spacing during the upgrade). Don't define classes that share a Tailwind utility's name (an unlayered `.text-center` was beating `sm:text-left`).
- `translate-*`, `scale-*` and `rotate-*` set the separate `translate`/`scale`/`rotate` properties, so they **stack** with a CSS `transform` on the same element instead of replacing it. Use one or the other.
- The `@theme` block restores Tailwind 3's fixed `text-*` line heights; v4's ratio line heights grew headings whose font size is overridden by component CSS.
- Classes like `text-text-primary`, `border-text-primary`, `border-border-subtle` and `bg-bg-secondary` generate **no CSS** (those colors were never in the theme, in v3 either). Pages look right without them; adding the tokens to `@theme` would switch them on and change colors, so do that deliberately with a screenshot diff.
- lucide 1.x dropped brand icons; `Github`, `Linkedin` and `Youtube` come from `src/components/ui/BrandIcons.tsx`.

## Verifying changes

- After any change: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- For anything visual, compare before and after. Headless Chrome screenshots of the old and new builds (served with `vite preview` on two ports), diffed pixel by pixel, worked well for the Vite upgrade. Animations make two captures of the _same_ build differ by 1–3%, so compare against that noise floor, not zero.
- The built-in browser pane pauses animations while hidden, so page transitions can look stuck there; take a screenshot to force a repaint before concluding something is broken.
- After editing `vite.config.ts` or switching branches, the dev server can serve stale optimized deps ("504 Outdated Optimize Dep"); restart it.

## Accessibility

Audited Nov 2026 with axe-core (WCAG 2.0–2.2 A/AA + best practices) plus a contrast scan, in light and dark mode on every page: 0 violations. Keep it that way.

- Each page has exactly one `<h1>`. `SectionHeader` takes `level={1}` for the About page. Decorative/label headings keep their styled tag but set `aria-level` (e.g. footer `<h4 aria-level={2}>`) so the outline has no skipped levels without changing visuals.
- Skip link + `<main id="main-content" tabIndex={-1}>` and a `RouteAnnouncer` live region live in `App.tsx`; the announcer reads `document.title` after each route change.
- Reduced motion: `MotionConfig reducedMotion="user"`, a `prefers-reduced-motion` block at the end of `src/index.css`, and `scrollBehavior()` / `prefersReducedMotion()` in `src/utils/motion.ts` for programmatic scrolls (use them instead of hard-coding `behavior: 'smooth'`). The typewriter, carousel autoplay and particle field handle it individually.
- Text contrast: `--text-quinary` is the lowest allowed text color. Don't dim text with `opacity` below 0.6.
- Focus rings: custom `outline-hidden` elements need `focus-visible:outline-solid` too (Tailwind 4 sets outline-style none). `bg-text-primary` style utilities aren't generated, so use `bg-(--text-primary)` / `outline-(--text-primary)`.
- Clickable things are real `<button>`/`<a>` elements, not divs.
