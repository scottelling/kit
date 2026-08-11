import { readFile } from "node:fs/promises"
import path from "node:path"

// kit-doctor: reports whether a consumer project's installed KIT artifacts
// still match the published registry.
//
//   node scripts/kit-doctor.mjs /path/to/consumer-project
//
// Reads <project>/kit-manifest.json, fetches <registry>/r/checksums.json, and
// prints current / behind / unknown for every installed artifact. Set
// KIT_CHECKSUMS_FILE to a local checksums.json to run without a network.

const projectDir = process.argv[2]
if (!projectDir) {
  console.error("Usage: node scripts/kit-doctor.mjs <consumer-project-dir>")
  process.exit(2)
}

const manifestPath = path.join(path.resolve(projectDir), "kit-manifest.json")
let manifest
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"))
} catch (error) {
  console.error(`Could not read ${manifestPath}: ${error.message}`)
  console.error("A consumer declares its installed pieces in kit-manifest.json (format kit-manifest/1).")
  process.exit(2)
}

if (manifest.format !== "kit-manifest/1") {
  console.error(`Unsupported manifest format "${manifest.format}" (expected kit-manifest/1).`)
  process.exit(2)
}

let checksums
if (process.env.KIT_CHECKSUMS_FILE) {
  checksums = JSON.parse(await readFile(process.env.KIT_CHECKSUMS_FILE, "utf8"))
} else {
  const registry = (manifest.registry ?? "https://kit.scottelling.com").replace(/\/$/, "")
  const response = await fetch(`${registry}/r/checksums.json`)
  if (!response.ok) {
    console.error(`Could not fetch ${registry}/r/checksums.json (${response.status}).`)
    process.exit(2)
  }
  checksums = await response.json()
}

const installed = manifest.installed ?? []
let behind = 0
let unknown = 0

console.log(`kit-doctor — ${manifest.project ?? path.basename(path.resolve(projectDir))}`)
console.log(`system: ${manifest.system ?? "(not declared)"} | registry version: ${checksums.registryVersion}`)
console.log("")

for (const entry of installed) {
  const live = checksums.artifacts?.[entry.artifact]
  if (!live) {
    unknown += 1
    console.log(`  unknown   ${entry.artifact} — not in the live registry (renamed or removed?)`)
  } else if (live.sha256 === entry.sha256) {
    console.log(`  current   ${entry.artifact}`)
  } else {
    behind += 1
    console.log(`  behind    ${entry.artifact} — the registry has a newer version`)
  }
}

console.log("")
if (installed.length === 0) {
  console.log("No installed artifacts declared. Add entries to kit-manifest.json when pieces are installed.")
} else if (behind === 0 && unknown === 0) {
  console.log(`All ${installed.length} installed artifacts match the live registry.`)
} else {
  console.log(`${behind} behind, ${unknown} unknown, of ${installed.length} installed.`)
}
process.exit(behind > 0 || unknown > 0 ? 1 : 0)
