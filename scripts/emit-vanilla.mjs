import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

// Emits the framework-free dialect: per-piece JSON, combined kit.css/kit.js
// bundles, the registry index, and the complete swap-ready starter. The public
// /vanilla page is generated from that starter, so the download and proof stay
// identical.

const root = process.cwd()
const site = "https://kit.scottelling.com"
const sourceDir = path.join(root, "registry", "vanilla")
const starterDir = path.join(sourceDir, "starter")
const outDir = path.join(root, "public", "r", "vanilla")

const manifest = JSON.parse(await readFile(path.join(sourceDir, "manifest.json"), "utf8"))
await mkdir(outDir, { recursive: true })

async function readPieceFile(name, extension) {
  try {
    return await readFile(path.join(sourceDir, `${name}.${extension}`), "utf8")
  } catch {
    return null
  }
}

const pieces = []
for (const meta of manifest.pieces) {
  const css = await readPieceFile(meta.name, "css")
  const html = await readPieceFile(meta.name, "html")
  const js = await readPieceFile(meta.name, "js")
  if (!css || !html) {
    throw new Error(`vanilla piece "${meta.name}" is missing its css or html source`)
  }
  pieces.push({ ...meta, css, html, js })
}

for (const piece of pieces) {
  const files = [
    { path: `${piece.name}.css`, type: "css", content: piece.css },
    { path: `${piece.name}.html`, type: "html", content: piece.html },
  ]
  if (piece.js) files.push({ path: `${piece.name}.js`, type: "js", content: piece.js })
  const item = {
    format: "kit-piece/1",
    name: piece.name,
    title: piece.title,
    description: piece.description,
    dialect: "vanilla",
    systems: "universal",
    requires: { tokens: `${site}/r/vanilla-kit/tokens.css (or another complete KIT tokens.css)` },
    files,
  }
  await writeFile(path.join(outDir, `${piece.name}.json`), `${JSON.stringify(item, null, 2)}\n`)
}

const bundleHeader = `/* KIT vanilla dialect bundle — generated; do not hand-edit. Pair with a system tokens.css. */\n\n`
await writeFile(path.join(outDir, "kit.css"), bundleHeader + pieces.map((p) => p.css).join("\n"))
const jsPieces = pieces.filter((p) => p.js)
await writeFile(
  path.join(outDir, "kit.js"),
  `/* KIT vanilla dialect behaviors — generated; do not hand-edit. */\n\n${jsPieces.map((p) => p.js.trim()).join("\n;\n")}\n`,
)

const starterFiles = [
  ["index.html", "html"],
  ["starter.css", "css"],
  ["starter.js", "js"],
  ["kit-manifest.json", "json"],
  ["README.md", "markdown"],
  ["AGENTS.md", "markdown"],
  ["CLAUDE.md", "markdown"],
  ["docs/BRAIN.md", "markdown"],
  ["docs/START_HERE.md", "markdown"],
  ["docs/LEDGER.md", "markdown"],
]
const starterContents = Object.fromEntries(
  await Promise.all(starterFiles.map(async ([file]) => [file, await readFile(path.join(starterDir, file), "utf8")])),
)
const starter = {
  format: "kit-project-starter/1",
  name: "vanilla-project-starter",
  title: "Vanilla Project Starter",
  description: "A neutral, swap-ready foundation for apps, landing pages, shops, and content products.",
  defaultSystem: "vanilla-kit",
  systems: ["vanilla-kit", "purple-rain", "jade", "os", "animation"],
  files: starterFiles.map(([file, type]) => ({ path: file, type, content: starterContents[file] })),
}
await writeFile(path.join(outDir, "starter.json"), `${JSON.stringify(starter, null, 2)}\n`)
await writeFile(path.join(outDir, "starter.css"), starterContents["starter.css"])
await writeFile(path.join(outDir, "starter.js"), starterContents["starter.js"])

const index = {
  format: manifest.format,
  description: manifest.description,
  bundle: { css: `${site}/r/vanilla/kit.css`, js: `${site}/r/vanilla/kit.js` },
  starter: { url: `${site}/r/vanilla/starter.json`, preview: `${site}/vanilla` },
  pieces: manifest.pieces.map((piece) => ({ ...piece, url: `${site}/r/vanilla/${piece.name}.json` })),
}
await writeFile(path.join(outDir, "registry.json"), `${JSON.stringify(index, null, 2)}\n`)

const demo = starterContents["index.html"]
  .replaceAll("https://kit.scottelling.com/r/", "/r/")
  .replace('href="./starter.css"', 'href="/r/vanilla/starter.css"')
  .replace('src="./starter.js"', 'src="/r/vanilla/starter.js"')
await writeFile(path.join(root, "public", "vanilla.html"), demo)

console.log(`Emitted ${pieces.length} framework-free pieces and the complete Vanilla project starter.`)
