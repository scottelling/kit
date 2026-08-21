import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

// Verifies the KIT format layer (SPEC.md): framework-free token dialects,
// the vanilla piece dialect, doctrine, and checksums. Fails loudly on any
// break in the shared token language.

const root = process.cwd()
const failures = []

function fail(message) {
  failures.push(message)
}

async function readJson(relative) {
  return JSON.parse(await readFile(path.join(root, relative), "utf8"))
}

async function readText(relative) {
  return readFile(path.join(root, relative), "utf8")
}

const systems = [
  { id: "purple-rain", item: "public/r/tokens.json", dir: "public/r" },
  { id: "jade", item: "public/r/jade/tokens.json", dir: "public/r/jade" },
  { id: "os", item: "public/r/os/tokens.json", dir: "public/r/os" },
  { id: "animation", item: "public/r/animation/tokens.json", dir: "public/r/animation" },
  { id: "vanilla-kit", item: "public/r/vanilla-kit/tokens.json", dir: "public/r/vanilla-kit" },
  { id: "voltage", item: "public/r/voltage/tokens.json", dir: "public/r/voltage" },
  { id: "calm", item: "public/r/calm/tokens.json", dir: "public/r/calm" },
  { id: "shadow", item: "public/r/shadow/smooth-shadow.json", dir: "public/r/shadow" },
]

// 1. Token dialect parity: every declared variable appears in tokens.css with
// the exact source value, for the base scopes of every system.
const rootScopes = {}
for (const system of systems) {
  let item, css, designTokens
  try {
    item = await readJson(system.item)
    css = await readText(`${system.dir}/tokens.css`)
    designTokens = await readJson(`${system.dir}/design-tokens.json`)
  } catch (error) {
    fail(`${system.id}: missing token dialect artifact — ${error.message}`)
    continue
  }

  function blockDeclarations(source) {
    const declarations = {}
    for (const match of source.matchAll(/^\s{2}(--[\w-]+):\s*(.+);$/gm)) {
      declarations[match[1]] = match[2]
    }
    return declarations
  }
  const rootBlock = css.match(/^:root \{\n([\s\S]*?)\n\}/m)
  const darkBlock = css.match(/^\.dark,\n\[data-kit-appearance="dark"\] \{\n([\s\S]*?)\n\}/m)
  const scopes = [
    ["theme", rootBlock, { ...(item.cssVars?.theme ?? {}) }],
    ["light", rootBlock, { ...(item.cssVars?.light ?? {}) }],
    ["dark", darkBlock, { ...(item.cssVars?.dark ?? {}) }],
  ]
  for (const [group, block, expected] of scopes) {
    if (Object.keys(expected).length === 0) continue
    if (!block) {
      fail(`${system.id}: tokens.css is missing the block that carries the ${group} variables`)
      continue
    }
    const declarations = blockDeclarations(block[1])
    for (const [name, value] of Object.entries(expected)) {
      // Tailwind self-reference glue (`radius-x: var(--radius-x)`) is
      // intentionally not emitted; the light scope carries the real value.
      if (group === "theme" && String(value).trim() === `var(--${name})`) continue
      if (declarations[`--${name}`] === undefined) {
        fail(`${system.id}: --${name} (${group}) is declared in the registry item but missing from tokens.css`)
      } else if (declarations[`--${name}`] !== String(value)) {
        fail(`${system.id}: --${name} (${group}) value drifted between the registry item and tokens.css`)
      }
    }
  }
  for (const group of ["theme", "light", "dark"]) {
    const source = item.cssVars?.[group] ?? {}
    const emitted = designTokens.groups?.[group] ?? {}
    for (const [name, value] of Object.entries(source)) {
      if (emitted[name]?.$value !== String(value)) {
        fail(`${system.id}: design-tokens.json ${group}.${name} does not match the registry item`)
      }
    }
  }
  rootScopes[system.id] = new Set(
    [...Object.keys(item.cssVars?.theme ?? {}), ...Object.keys(item.cssVars?.light ?? {})].map((name) => `--${name}`),
  )
  if (/\[object Object\]/.test(css)) fail(`${system.id}: tokens.css contains a serialization error`)
  if (/^@utility\s/m.test(css)) fail(`${system.id}: tokens.css leaks a Tailwind @utility rule`)
}

// 2. Vanilla dialect: only universal variables, complete registry, parseable JS.
const complete = ["purple-rain", "jade", "os", "animation", "vanilla-kit", "voltage", "calm"]
const universal = complete
  .map((id) => rootScopes[id])
  .filter(Boolean)
  .reduce((acc, set) => (acc ? new Set([...acc].filter((name) => set.has(name))) : set), null)

const vanillaManifest = await readJson("registry/vanilla/manifest.json")
const vanillaCss = await readText("public/r/vanilla/kit.css")
for (const reference of new Set([...vanillaCss.matchAll(/var\((--[\w-]+)/g)].map((match) => match[1]))) {
  if (universal && !universal.has(reference)) {
    fail(`vanilla: ${reference} is not universal across the complete systems`)
  }
}
if (!/--kit-control-height/.test(vanillaCss)) fail("vanilla: kit.css lost the 44px control-height token usage")

const vanillaIndex = await readJson("public/r/vanilla/registry.json")
for (const piece of vanillaManifest.pieces) {
  const listed = vanillaIndex.pieces.find((entry) => entry.name === piece.name)
  if (!listed) fail(`vanilla: ${piece.name} missing from the emitted registry index`)
  let item
  try {
    item = await readJson(`public/r/vanilla/${piece.name}.json`)
  } catch {
    fail(`vanilla: ${piece.name}.json was not emitted`)
    continue
  }
  if (item.format !== "kit-piece/1") fail(`vanilla: ${piece.name}.json is not kit-piece/1`)
  const css = item.files.find((file) => file.type === "css")
  if (!css || !vanillaCss.includes(css.content.trim().split("\n").slice(-3).join("\n"))) {
    fail(`vanilla: ${piece.name} css is missing from the kit.css bundle`)
  }
}
try {
  execFileSync(process.execPath, ["--check", path.join(root, "public/r/vanilla/kit.js")], { stdio: "pipe" })
} catch {
  fail("vanilla: kit.js does not parse")
}

const starter = await readJson("public/r/vanilla/starter.json")
const starterCss = await readText("public/r/vanilla/starter.css")
const starterJs = await readText("public/r/vanilla/starter.js")
if (starter.format !== "kit-project-starter/1") fail("vanilla starter: starter.json is not kit-project-starter/1")
for (const expected of ["index.html", "starter.css", "starter.js", "kit-manifest.json", "README.md", "AGENTS.md", "CLAUDE.md", "docs/BRAIN.md", "docs/START_HERE.md", "docs/LEDGER.md"]) {
  if (!starter.files?.some((file) => file.path === expected && file.content)) {
    fail(`vanilla starter: ${expected} is missing from starter.json`)
  }
}
for (const reference of new Set([...starterCss.matchAll(/var\((--[\w-]+)/g)].map((match) => match[1]))) {
  if (universal && !universal.has(reference)) {
    fail(`vanilla starter: ${reference} is not universal across the complete systems`)
  }
}
if (/\{\{[^}]+\}\}/.test(JSON.stringify(starter))) fail("vanilla starter: unresolved placeholder remains")
try {
  execFileSync(process.execPath, ["--check", path.join(root, "public/r/vanilla/starter.js")], { stdio: "pipe" })
} catch {
  fail("vanilla starter: starter.js does not parse")
}
if (starterJs !== starter.files.find((file) => file.path === "starter.js")?.content) {
  fail("vanilla starter: emitted starter.js drifted from starter.json")
}

// 3. Demo page pairs the bundle with every complete system's tokens.css.
const demo = await readText("public/vanilla.html")
for (const href of ["/r/tokens.css", "/r/jade/tokens.css", "/r/os/tokens.css", "/r/animation/tokens.css", "/r/vanilla-kit/tokens.css", "/r/voltage/tokens.css", "/r/calm/tokens.css", "/r/vanilla/kit.css", "/r/vanilla/kit.js"]) {
  if (!demo.includes(href)) fail(`demo: /vanilla page does not reference ${href}`)
}
for (const asset of ["/r/vanilla/starter.css", "/r/vanilla/starter.js"]) {
  if (!demo.includes(asset)) fail(`demo: /vanilla page does not reference ${asset}`)
}

// 4. Doctrine is published and well-formed.
const doctrine = await readJson("public/r/doctrine.json")
if (doctrine.format !== "kit-doctrine/1") fail("doctrine.json is not kit-doctrine/1")
if (doctrine.minimums?.controlHeightPx !== 44) fail("doctrine.json lost the 44px minimum")

// 5. Checksums cover the new artifacts and hash accurately.
const checksums = await readJson("public/r/checksums.json")
const mustCover = [
  "r/tokens.css",
  "r/jade/tokens.css",
  "r/os/tokens.css",
  "r/animation/tokens.css",
  "r/vanilla-kit/tokens.css",
  "r/voltage/tokens.css",
  "r/calm/tokens.css",
  "r/shadow/tokens.css",
  "r/design-tokens.json",
  "r/doctrine.json",
  "r/vanilla/kit.css",
  "r/vanilla/kit.js",
  "r/vanilla/registry.json",
  "r/vanilla/starter.json",
  "r/vanilla/starter.css",
  "r/vanilla/starter.js",
]
for (const artifact of mustCover) {
  if (!checksums.artifacts?.[artifact]) fail(`checksums.json does not cover ${artifact}`)
}
for (const artifact of ["r/tokens.css", "r/vanilla/kit.css", "r/doctrine.json"]) {
  const recorded = checksums.artifacts?.[artifact]?.sha256
  if (recorded) {
    const actual = createHash("sha256").update(await readFile(path.join(root, "public", artifact))).digest("hex")
    if (actual !== recorded) fail(`checksums.json hash for ${artifact} is stale — re-run the registry build`)
  }
}

// 6. Sourced kits (docs/KIT-INTAKE.md): quirks preserved, provenance and
// bridge published, showroom routed, bridge targets real.
let sourcedIds = []
try {
  sourcedIds = (await readdir(path.join(root, "registry", "sourced"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
} catch {}
let sourcedManifest = []
try {
  sourcedManifest = await readJson("lib/sourced-kits.generated.json")
} catch {
  if (sourcedIds.length > 0) fail("lib/sourced-kits.generated.json is missing — run the registry build")
}
let sourcedRouteExists = true
try {
  await readText("app/kit/[sourced]/page.tsx")
} catch {
  sourcedRouteExists = false
}
for (const id of sourcedIds) {
  let index, sourcedProvenance, sourcedBridge, sourcedTokens
  try {
    index = await readJson(`public/r/${id}/registry.json`)
    sourcedProvenance = await readJson(`public/r/${id}/provenance.json`)
    sourcedBridge = await readJson(`public/r/${id}/bridge.json`)
    sourcedTokens = await readText(`public/r/${id}/tokens.css`)
    await readText(`public/r/${id}/kit.css`)
    await readText(`public/kit-${id}.html`)
  } catch (error) {
    fail(`sourced ${id}: missing published artifact — ${error.message}`)
    continue
  }
  if (index.format !== "kit-sourced-registry/1") fail(`sourced ${id}: registry.json is not kit-sourced-registry/1`)
  if (index.pieces?.length !== index.componentCount) fail(`sourced ${id}: piece count does not match componentCount`)
  if (sourcedProvenance.format !== "kit-provenance/1") fail(`sourced ${id}: provenance.json is not kit-provenance/1`)
  for (const section of ["extracted", "derived", "quirks", "doctrineDeltas", "cautions"]) {
    if (!Array.isArray(sourcedProvenance[section]) || sourcedProvenance[section].length === 0) {
      fail(`sourced ${id}: provenance.${section} is missing or empty`)
    }
  }
  if (sourcedBridge.format !== "kit-bridge/1") fail(`sourced ${id}: bridge.json is not kit-bridge/1`)
  for (const entry of sourcedBridge.map ?? []) {
    if (entry.universal !== null && universal && !universal.has(entry.universal)) {
      fail(`sourced ${id}: bridge maps ${entry.space} to ${entry.universal}, which is not a universal variable`)
    }
  }
  if (/\[object Object\]/.test(sourcedTokens)) fail(`sourced ${id}: tokens.css contains a serialization error`)
  const manifestEntry = sourcedManifest.find((entry) => entry.id === id)
  if (!manifestEntry) {
    fail(`sourced ${id}: missing from lib/sourced-kits.generated.json — the Explore switcher will not show it`)
  } else {
    if (manifestEntry.route !== index.showroomRoute) fail(`sourced ${id}: manifest route differs from meta showroomRoute`)
    if (manifestEntry.pieceCount !== index.componentCount) fail(`sourced ${id}: manifest pieceCount differs from componentCount`)
  }
  if (!sourcedRouteExists) fail(`sourced ${id}: app/kit/[sourced]/page.tsx is missing — no Explore showroom shell`)
  for (const piece of index.pieces ?? []) {
    if (piece.provenance !== "extracted" && piece.provenance !== "derived") {
      fail(`sourced ${id}: piece "${piece.name}" lacks an extracted/derived provenance flag`)
    }
  }
}

if (failures.length > 0) {
  console.error(`KIT format verification failed (${failures.length}):`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}
console.log(`KIT format verified: ${systems.length} token dialects, ${vanillaManifest.pieces.length} vanilla pieces, ${sourcedIds.length} sourced kit(s), doctrine, demo, and ${checksums.artifactCount} checksummed artifacts.`)
