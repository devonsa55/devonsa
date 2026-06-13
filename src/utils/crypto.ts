export async function decryptUrl(
  passwordText: string,
  saltHex: string,
  ivHex: string,
  ciphertextHex: string,
  authTagHex: string,
): Promise<string> {
  const encoder = new TextEncoder()
  const passwordBytes = encoder.encode(passwordText)

  const hexToBytes = (hex: string) => {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16)
    }
    return bytes
  }

  const salt = hexToBytes(saltHex)
  const iv = hexToBytes(ivHex)
  const ciphertext = hexToBytes(ciphertextHex)
  const authTag = hexToBytes(authTagHex)

  // Combine ciphertext and authTag
  const encryptedData = new Uint8Array(ciphertext.length + authTag.length)
  encryptedData.set(ciphertext)
  encryptedData.set(authTag, ciphertext.length)

  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    passwordBytes,
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  )

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )

  const decryptedBytes = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
      tagLength: 128,
    },
    key,
    encryptedData,
  )

  const decoder = new TextDecoder()
  return decoder.decode(decryptedBytes)
}
