# verify-feedback

Server-side gate for the portfolio's feedback form. Verifies a Cloudflare
Turnstile token, checks a 5-per-minute-per-IP rate limit, then inserts
into `public.messages` using the service role key — the browser never
gets direct insert access.

Deployed via the Supabase MCP connector. To redeploy after editing
`index.ts`, use the `deploy_edge_function` tool (or `supabase functions
deploy verify-feedback --no-verify-jwt` from the CLI if you prefer).

## Current state (as of this deploy)

- Function is live at `verify-feedback`, `verify_jwt: false` (anonymous
  site visitors call this — they don't have a Supabase auth session).
- `TURNSTILE_SECRET_KEY` is set as a project secret in the Supabase
  dashboard (Project Settings → Edge Functions → Secrets).
- `anon` and `authenticated` roles have had `INSERT` revoked on
  `public.messages` (see migration `revoke_anon_insert_on_messages`).
  Only `service_role` (used inside this function) can insert now.

## If you need to redo any of this

1. Set the secret (dashboard, or CLI: `supabase secrets set
TURNSTILE_SECRET_KEY=...`). `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.

2. Deploy the function.

3. Lock down the table (safe to re-run, uses `if exists`):

   ```sql
   drop policy if exists "Allow rate-limited insert to messages" on public.messages;
   revoke insert on public.messages from anon;
   revoke insert on public.messages from authenticated;
   ```

## Testing locally

Turnstile will reject requests from `localhost` unless you add it to the
widget's allowed domains in the Cloudflare dashboard — otherwise you'll
see Turnstile error 110200 ("domain not allowed") in local dev. Not
required for production, which already has the right domain configured.
