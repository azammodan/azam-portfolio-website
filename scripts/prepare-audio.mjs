import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

// CC0: https://opengameart.org/content/calm-piano-1-vaporware
// Download at build time; visitors play the copy hosted with the static site.
const target = new URL('../public/audio/vaporware.mp3', import.meta.url)
const expected = '1697fa1b7ed6f3fe1eca4daa4f9d1a2eb3db8fe40a0f3c283529ab47e57b5b38'
const matches = bytes => createHash('sha256').update(bytes).digest('hex') === expected
let cached
try { cached = await readFile(target) } catch {}
if (!cached || !matches(cached)) {
  const response = await fetch('https://opengameart.org/sites/default/files/003_Vaporware_2.mp3', { signal: AbortSignal.timeout(60000) })
  if (!response.ok) throw new Error(`Music download failed: ${response.status}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (!matches(bytes)) throw new Error('Music checksum mismatch')
  await mkdir(new URL('../public/audio/', import.meta.url), { recursive: true })
  await writeFile(target, bytes)
}
