import { createHash } from "node:crypto"
import { readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"

// Emits /r/checksums.json: a sha256 for every published registry artifact plus
// a registryVersion fingerprint derived from the artifact hashes. kit-doctor
// compares a consumer's kit-manifest.json against this file to detect drift.
// Must run LAST in the registry build so it covers every emitted artifact.

const root = process.cwd()
const registryDir = path.join(root, "public", "r")

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else files.push(full)
  }
  return files
}

const files = (await walk(registryDir))
  .map((file) => path.relative(path.join(root, "public"), file))
  .filter((relative) => relative !== path.join("r", "checksums.json"))
  .sort()

const artifacts = {}
for (const relative of files) {
  const contents = await readFile(path.join(root, "public", relative))
  artifacts[relative.split(path.sep).join("/")] = {
    sha256: createHash("sha256").update(contents).digest("hex"),
    bytes: contents.length,
  }
}

const fingerprint = createHash("sha256")
  .update(Object.entries(artifacts).map(([file, meta]) => `${file}:${meta.sha256}`).join("\n"))
  .digest("hex")

const checksums = {
  format: "kit-checksums/1",
  registryVersion: fingerprint.slice(0, 12),
  artifactCount: Object.keys(artifacts).length,
  artifacts,
}
await writeFile(path.join(registryDir, "checksums.json"), `${JSON.stringify(checksums, null, 2)}\n`)
console.log(`Emitted checksums for ${checksums.artifactCount} artifacts (registryVersion ${checksums.registryVersion}).`)
