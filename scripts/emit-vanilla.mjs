import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

// Emits the vanilla dialect: per-piece JSON, the combined kit.css/kit.js
// bundles, the vanilla registry index, and the static /vanilla demo page.
// The demo is generated from the same snippets the registry publishes, so the
// two can never drift apart.

const root = process.cwd()
const site = "https://kit.scottelling.com"
const sourceDir = path.join(root, "registry", "vanilla")
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
    requires: { tokens: `${site}/r/tokens.css (or the jade/os/animation tokens.css)` },
    files,
  }
  await writeFile(path.join(outDir, `${piece.name}.json`), `${JSON.stringify(item, null, 2)}\n`)
}

const index = {
  format: manifest.format,
  description: manifest.description,
  bundle: { css: `${site}/r/vanilla/kit.css`, js: `${site}/r/vanilla/kit.js` },
  pieces: manifest.pieces.map((piece) => ({ ...piece, url: `${site}/r/vanilla/${piece.name}.json` })),
}
await writeFile(path.join(outDir, "registry.json"), `${JSON.stringify(index, null, 2)}\n`)

const bundleHeader = `/* KIT vanilla dialect bundle — generated; do not hand-edit. Pair with a system tokens.css. */\n\n`
await writeFile(path.join(outDir, "kit.css"), bundleHeader + pieces.map((p) => p.css).join("\n"))
const jsPieces = pieces.filter((p) => p.js)
await writeFile(
  path.join(outDir, "kit.js"),
  `/* KIT vanilla dialect behaviors — generated; do not hand-edit. */\n\n${jsPieces.map((p) => p.js.trim()).join("\n;\n")}\n`,
)

const demoSections = pieces
  .map(
    (piece) => `      <section class="demo-piece" id="${piece.name}">
        <h2>${piece.title}</h2>
        <p>${piece.description}</p>
        <div class="demo-stage">
${piece.html.trim().split("\n").map((line) => `          ${line}`).join("\n")}
        </div>
      </section>`,
  )
  .join("\n")

const demo = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>KIT vanilla dialect — one page, every system</title>
<meta name="description" content="The same plain HTML rendered by each complete KIT system. No React, no Tailwind, no build step." />
<link rel="stylesheet" href="/r/tokens.css" id="kit-tokens" />
<link rel="stylesheet" href="/r/vanilla/kit.css" />
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif);
    line-height: var(--kit-leading, 1.5);
    transition: background-color 180ms ease-out, color 180ms ease-out;
  }
  .demo-shell { max-width: 880px; margin: 0 auto; padding: 24px 16px 64px; }
  .demo-header { display: flex; flex-direction: column; gap: 12px; padding: 8px 0 24px; }
  .demo-header h1 { margin: 0; font-family: var(--font-heading, inherit); font-size: clamp(26px, 5vw, 38px); line-height: 1.1; }
  .demo-header > p { margin: 0; color: var(--muted-foreground); max-width: 60ch; font-size: var(--kit-body-size, 15px); }
  .demo-controls { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .demo-piece { padding: 28px 0; border-top: 1px solid var(--border); }
  .demo-piece h2 { margin: 0 0 4px; font-family: var(--font-heading, inherit); font-size: 20px; }
  .demo-piece > p { margin: 0 0 16px; color: var(--muted-foreground); font-size: var(--kit-body-size, 15px); }
  .demo-stage { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
  .demo-stage:has(.kit-badge) { flex-direction: row; flex-wrap: wrap; align-items: center; }
  .demo-note { font-size: var(--kit-compact-size, 12px); color: var(--muted-foreground); }
  @media (prefers-reduced-motion: reduce) { body { transition: none; } }
</style>
</head>
<body>
  <div class="demo-shell">
    <header class="demo-header">
      <h1>One page. Every system. No framework.</h1>
      <p>This is plain HTML with the KIT vanilla pieces and one tokens.css link. Switch the system below — only the stylesheet changes. That is the whole idea: the tokens are the shared language.</p>
      <div class="demo-controls" role="group" aria-label="Visual system">
        <button class="kit-button" data-variant="secondary" type="button" data-kit-system="/r/tokens.css" aria-pressed="true">Purple Rain</button>
        <button class="kit-button" data-variant="secondary" type="button" data-kit-system="/r/jade/tokens.css" aria-pressed="false">JADE</button>
        <button class="kit-button" data-variant="secondary" type="button" data-kit-system="/r/os/tokens.css" aria-pressed="false">OS</button>
        <button class="kit-button" data-variant="secondary" type="button" data-kit-system="/r/animation/tokens.css" aria-pressed="false">Animation</button>
        <button class="kit-button" data-variant="ghost" type="button" id="appearance-toggle" aria-pressed="false">Dark</button>
      </div>
      <p class="demo-note">This plain page keeps your system font; finished products load each system's real families. Get the pieces at <a href="/r/vanilla/registry.json">/r/vanilla/registry.json</a>.</p>
    </header>
${demoSections}
  </div>
  <script src="/r/vanilla/kit.js" defer></script>
  <script>
    document.addEventListener("click", function (event) {
      var systemButton = event.target.closest("[data-kit-system]")
      if (systemButton) {
        document.getElementById("kit-tokens").setAttribute("href", systemButton.getAttribute("data-kit-system"))
        document.querySelectorAll("[data-kit-system]").forEach(function (b) {
          b.setAttribute("aria-pressed", b === systemButton ? "true" : "false")
        })
      }
    })
    var appearance = document.getElementById("appearance-toggle")
    appearance.addEventListener("click", function () {
      var dark = document.documentElement.classList.toggle("dark")
      appearance.setAttribute("aria-pressed", dark ? "true" : "false")
      appearance.textContent = dark ? "Light" : "Dark"
    })
  </script>
</body>
</html>
`
await writeFile(path.join(root, "public", "vanilla.html"), demo)

console.log(`Emitted ${pieces.length} vanilla pieces, bundles, registry index, and the /vanilla demo page.`)
