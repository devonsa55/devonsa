#!/usr/bin/env node
// Re-encrypts the password-gated case study URL and patches PasswordGate.tsx.
// Matches src/utils/crypto.ts: PBKDF2(SHA-256, 100k) -> AES-256-GCM, 128-bit tag.
//
// Usage:
//   CASE_STUDY_PASSWORD='...' node scripts/encrypt-case-study-url.mjs <url> [--dry-run]
//
// The password is read from the environment so it never lands in the repo or shell history args.
import { webcrypto as crypto } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const url = process.argv[2]
const dryRun = process.argv.includes('--dry-run')
const password = process.env.CASE_STUDY_PASSWORD
const target = process.env.GATE_FILE
  ? resolve(process.env.GATE_FILE)
  : resolve(dirname(fileURLToPath(import.meta.url)), '../src/components/ui/PasswordGate.tsx')

if (!url || !/^https:\/\//.test(url)) {
  console.error('Usage: CASE_STUDY_PASSWORD=... node scripts/encrypt-case-study-url.mjs <https-url> [--dry-run]')
  process.exit(1)
}
if (!password) {
  console.error('Set CASE_STUDY_PASSWORD in the environment.')
  process.exit(1)
}

const hex = (buf) => Buffer.from(buf).toString('hex')
const enc = new TextEncoder()
const salt = crypto.getRandomValues(new Uint8Array(16))
const iv = crypto.getRandomValues(new Uint8Array(12))

const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
  baseKey,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt', 'decrypt'],
)
const out = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv, tagLength: 128 }, key, enc.encode(url)))
const ciphertext = out.slice(0, out.length - 16)
const authTag = out.slice(out.length - 16)

// Round-trip check before touching the file.
const back = new TextDecoder().decode(
  await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, key, out),
)
if (back !== url) throw new Error('Round-trip verification failed')

let src = readFileSync(target, 'utf8')
const set = (name, value) => {
  const re = new RegExp(`(const ${name} =\\s*)'[0-9a-f]*'`)
  if (!re.test(src)) throw new Error(`Could not find constant ${name} in ${target}`)
  src = src.replace(re, `$1'${value}'`)
}
set('SALT', hex(salt))
set('IV', hex(iv))
set('CIPHERTEXT', hex(ciphertext))
set('AUTH_TAG', hex(authTag))

if (dryRun) {
  console.log('Dry run OK (round-trip verified). No file written.')
} else {
  writeFileSync(target, src)
  console.log(`Updated ${target} (round-trip verified).`)
}
