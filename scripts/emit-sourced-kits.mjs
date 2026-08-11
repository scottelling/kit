import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"

// Publishes every sourced kit (docs/KIT-INTAKE.md) from registry/sourced/<id>/
// to /r/<id>/ plus its showroom page. Sourced kits are preserved as authored;
// this script validates and copies — it never rewrites kit content.

const root = process.cwd()
const site = "https://kit.scottelling.com"
const sourcedDir = path.join(root, "registry", "sourced")

let kitIds = []
try {
  kitIds = (await readdir(sourcedDir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name)
} catch {
  await writeFile(path.join(root, "lib", "sourced-kits.generated.json"), "[]\n")
  console.log("No sourced kits to emit.")
  process.exit(0)
}

const manifest = []

const required = ["meta.json", "tokens.css", "kit.css", "provenance.json", "bridge.json", "pieces.json", "showroom.html"]

for (const id of kitIds.sort()) {
  const dir = path.join(sourcedDir, id)
  const files = {}
  for (const name of required) {
    try {
      files[name] = await readFile(path.join(dir, name), "utf8")
    } catch {
      throw new Error(`sourced kit "${id}" is missing ${name}`)
    }
  }

  const meta = JSON.parse(files["meta.json"])
  const provenance = JSON.parse(files["provenance.json"])
  const bridge = JSON.parse(files["bridge.json"])
  const pieces = JSON.parse(files["pieces.json"])
  if (meta.format !== "kit-sourced-meta/1") throw new Error(`${id}: meta.json is not kit-sourced-meta/1`)
  if (meta.id !== id) throw new Error(`${id}: meta.id "${meta.id}" does not match its directory`)
  if (provenance.format !== "kit-provenance/1") throw new Error(`${id}: provenance.json is not kit-provenance/1`)
  if (bridge.format !== "kit-bridge/1") throw new Error(`${id}: bridge.json is not kit-bridge/1`)
  if (pieces.format !== "kit-pieces/1") throw new Error(`${id}: pieces.json is not kit-pieces/1`)
  if (pieces.pieces.length !== meta.componentCount) {
    throw new Error(`${id}: meta.componentCount (${meta.componentCount}) does not match pieces.json (${pieces.pieces.length})`)
  }

  const outDir = path.join(root, "public", "r", id)
  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, "tokens.css"), files["tokens.css"])
  await writeFile(path.join(outDir, "kit.css"), files["kit.css"])
  await writeFile(path.join(outDir, "provenance.json"), files["provenance.json"])
  await writeFile(path.join(outDir, "bridge.json"), files["bridge.json"])

  let hasJs = false
  try {
    const js = await readFile(path.join(dir, "kit.js"), "utf8")
    await writeFile(path.join(outDir, "kit.js"), js)
    hasJs = true
  } catch {}

  const index = {
    ...meta,
    format: "kit-sourced-registry/1",
    install: {
      tokens: `${site}/r/${id}/tokens.css`,
      css: `${site}/r/${id}/kit.css`,
      ...(hasJs ? { js: `${site}/r/${id}/kit.js` } : {}),
      note: "Install tokens.css + kit.css verbatim and use the native class names. Read provenance.json (quirks, doctrine deltas, cautions) and bridge.json before styling.",
    },
    artifacts: {
      provenance: `${site}/r/${id}/provenance.json`,
      bridge: `${site}/r/${id}/bridge.json`,
      showroom: `${site}${meta.showroomRoute}`,
    },
    pieces: pieces.pieces,
  }
  await writeFile(path.join(outDir, "registry.json"), `${JSON.stringify(index, null, 2)}\n`)
  await writeFile(path.join(root, "public", `kit-${id}.html`), files["showroom.html"])

  manifest.push({
    id,
    title: meta.title,
    description: meta.description,
    pieceCount: pieces.pieces.length,
    sectionCount: new Set(pieces.pieces.map((piece) => piece.section)).size,
    themes: meta.themes,
    route: meta.showroomRoute,
    documentUrl: `/kit-${id}.html`,
    source: meta.source.site,
    audited: meta.source.audited,
  })
  console.log(`Emitted sourced kit "${id}": ${pieces.pieces.length} pieces, showroom at ${meta.showroomRoute}.`)
}

// The app's Explore switcher and the /kit/[sourced] shell import this at build
// time, so every sourced kit appears in the site automatically.
await writeFile(path.join(root, "lib", "sourced-kits.generated.json"), `${JSON.stringify(manifest, null, 2)}\n`)
