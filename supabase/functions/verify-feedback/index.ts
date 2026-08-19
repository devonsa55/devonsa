// Supabase Edge Function: verify-feedback
//
// Verifies a Cloudflare Turnstile token server-side, then inserts the
// feedback message using the service role key. This is the only path
// allowed to write to `public.messages` — the anon key's insert grant
// has been revoked on that table. See README.md in this folder.

import { createClient } from 'jsr:@supabase/supabase-js@2'

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const NAME_MAX = 100
const MESSAGE_MAX = 500

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { name, message, turnstileToken } = await req.json()

    if (
      typeof name !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !message.trim()
    ) {
      return new Response(JSON.stringify({ error: 'Name and message are required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (name.length > NAME_MAX || message.length > MESSAGE_MAX) {
      return new Response(JSON.stringify({ error: 'Name or message is too long.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (typeof turnstileToken !== 'string' || !turnstileToken) {
      return new Response(JSON.stringify({ error: 'Missing verification token.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const secretKey = Deno.env.get('TURNSTILE_SECRET_KEY')
    if (!secretKey) {
      console.error('TURNSTILE_SECRET_KEY is not set')
      return new Response(JSON.stringify({ error: 'Server misconfigured.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const visitorIp =
      req.headers.get('cf-connecting-ip') ??
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      null

    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: turnstileToken,
        remoteip: visitorIp ?? undefined,
      }),
    })
    const verifyResult = await verifyRes.json()

    if (!verifyResult.success) {
      return new Response(JSON.stringify({ error: 'Verification failed. Please try again.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Same 5-per-minute-per-IP limit the table's RLS policy already
    // enforces for any other insert path; re-checked here since this
    // function writes via the service role, which bypasses RLS.
    if (visitorIp) {
      const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString()
      const { count, error: countError } = await supabaseAdmin
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('client_ip', visitorIp)
        .gt('created_at', oneMinuteAgo)

      if (!countError && (count ?? 0) >= 5) {
        return new Response(
          JSON.stringify({ error: "You're sending messages too quickly. Please wait a bit." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
      }
    }

    const { error: insertError } = await supabaseAdmin
      .from('messages')
      .insert({ name: name.trim(), message: message.trim(), client_ip: visitorIp })

    if (insertError) {
      console.error('Insert failed:', insertError)
      return new Response(JSON.stringify({ error: 'Could not save your message.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
