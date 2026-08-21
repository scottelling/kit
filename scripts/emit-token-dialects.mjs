import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

// Emits the framework-free token dialects from the built registry items, so a
// project with no React, Tailwind, or shadcn can still speak the exact same
// token language. The built shadcn items stay canonical; these files must
// never be hand-edited.

const root = process.cwd()
const site = "https://kit.scottelling.com"

const systems = [
  { id: "purple-rain", title: "Purple Rain", item: "public/r/tokens.json", outDir: "public/r", sourceUrl: `${site}/r/tokens.json` },
  { id: "jade", title: "JADE", item: "public/r/jade/tokens.json", outDir: "public/r/jade", sourceUrl: `${site}/r/jade/tokens.json` },
  { id: "os", title: "OS", item: "public/r/os/tokens.json", outDir: "public/r/os", sourceUrl: `${site}/r/os/tokens.json` },
  { id: "animation", title: "Animation Studio", item: "public/r/animation/tokens.json", outDir: "public/r/animation", sourceUrl: `${site}/r/animation/tokens.json` },
  { id: "vanilla-kit", title: "Vanilla", item: "public/r/vanilla-kit/tokens.json", outDir: "public/r/vanilla-kit", sourceUrl: `${site}/r/vanilla-kit/tokens.json` },
  { id: "voltage", title: "Voltage", item: "public/r/voltage/tokens.json", outDir: "public/r/voltage", sourceUrl: `${site}/r/voltage/tokens.json` },
  { id: "calm", title: "Calm Desktop", item: "public/r/calm/tokens.json", outDir: "public/r/calm", sourceUrl: `${site}/r/calm/tokens.json` },
  { id: "shadow", title: "Shadow", item: "public/r/shadow/smooth-shadow.json", outDir: "public/r/shadow", sourceUrl: `${site}/r/shadow/smooth-shadow.json` },
]

function inferType(name, value) {
  const v = String(value).trim()
  if (/^(oklch|oklab|rgb|rgba|hsl|hsla|#)/.test(v)) return "color"
  if (/^-?\d+(\.\d+)?(px|rem|em|%|vw|vh|ch)$/.test(v)) return "dimension"
  if (/^-?\d+(\.\d+)?m?s$/.test(v)) return "duration"
  if (/^cubic-bezier\(/.test(v)) return "cubicBezier"
  if (name.startsWith("font") || /serif|monospace|sans-serif/.test(v)) return "fontFamily"
  if (/^-?\d+(\.\d+)?$/.test(v)) return "number"
  return null
}

function tokenGroup(vars) {
  const group = {}
  for (const [name, value] of Object.entries(vars)) {
    const entry = { $value: value }
    const type = inferType(name, value)
    if (type) entry.$type = type
    group[name] = entry
  }
  return group
}

// Tailwind's @utility directive means nothing outside Tailwind; the plain-CSS
// dialect exposes the same names as ordinary classes.
function plainSelector(selector) {
  const utility = selector.match(/^@utility\s+([\w-]+)$/)
  return utility ? `.${utility[1]}` : selector
}

function cssBlock(selector, body, addVarPrefix, depth = 0) {
  const pad = "  ".repeat(depth)
  const lines = Object.entries(body).map(([key, value]) => {
    if (value !== null && typeof value === "object") {
      return cssBlock(plainSelector(key), value, false, depth + 1)
    }
    return `${pad}  ${addVarPrefix ? `--${key}` : key}: ${value};`
  })
  return `${pad}${plainSelector(selector)} {\n${lines.join("\n")}\n${pad}}`
}

function assertTrailingRulesAgree(system, cssVars, css) {
  for (const [section, selector] of [["light", ":root"], ["dark", ".dark"]]) {
    const declared = cssVars[section] ?? {}
    const trailing = css?.[selector] ?? {}
    for (const [prop, value] of Object.entries(trailing)) {
      const name = prop.replace(/^--/, "")
      if (!(name in declared)) {
        throw new Error(`${system}: trailing ${selector} rule declares --${name}, which is missing from cssVars.${section}`)
      }
      if (declared[name] !== value) {
        throw new Error(`${system}: --${name} differs between cssVars.${section} (${declared[name]}) and the trailing ${selector} rule (${value})`)
      }
    }
  }
}

let emitted = 0
for (const system of systems) {
  const item = JSON.parse(await readFile(path.join(root, system.item), "utf8"))
  const cssVars = item.cssVars ?? {}
  const css = item.css ?? {}
  assertTrailingRulesAgree(system.id, cssVars, css)

  // Tailwind's @theme block maps its namespace onto runtime variables with
  // self-references like `radius-control: var(--radius-control)`. Those are
  // glue, not values — in plain CSS they would be circular. The runtime value
  // lives in the light scope, which wins any collision; a collision of two
  // real values is a source conflict and fails the build.
  const themeVars = {}
  for (const [name, value] of Object.entries(cssVars.theme ?? {})) {
    if (String(value).trim() === `var(--${name})`) continue
    themeVars[name] = value
  }
  const lightVars = cssVars.light ?? {}
  for (const name of Object.keys(themeVars)) {
    if (name in lightVars && String(lightVars[name]) !== String(themeVars[name])) {
      throw new Error(`${system.id}: --${name} has conflicting real values in theme and light scopes`)
    }
  }
  const rootVars = { ...themeVars, ...lightVars }
  const darkVars = cssVars.dark ?? {}
  const extraRules = Object.entries(css).filter(([selector]) => selector !== ":root" && selector !== ".dark")

  const header = [
    `/*`,
    ` * ${system.title} tokens — KIT framework-free dialect.`,
    ` * Generated from ${system.sourceUrl}; do not hand-edit and do not rename variables.`,
    ` * Token names and values are the shared language: identical to what the shadcn`,
    ` * dialect installs. Fonts referenced here are loaded by the consuming project.`,
    ` * Dark mode: add class "dark" or [data-kit-appearance="dark"] to a root element.`,
    ` */`,
  ].join("\n")

  const parts = [header, cssBlock(":root", rootVars, true)]
  if (Object.keys(darkVars).length > 0) {
    parts.push(cssBlock(`.dark,\n[data-kit-appearance="dark"]`, darkVars, true))
  }
  const skippedUtilities = []
  for (const [selector, body] of extraRules) {
    if (/^@utility\s.*\*/.test(selector)) {
      skippedUtilities.push(selector)
      continue
    }
    parts.push(cssBlock(selector, body, false))
  }
  if (skippedUtilities.length > 0) {
    parts.push(
      [
        `/*`,
        ` * Omitted (Tailwind-only, value-parameterized): ${skippedUtilities.join(", ")}.`,
        ` * In this dialect, set the matching custom property directly on the element,`,
        ` * e.g. style="--smooth-ring-color: <color>".`,
        ` */`,
      ].join("\n"),
    )
  }
  await writeFile(path.join(root, system.outDir, "tokens.css"), `${parts.join("\n\n")}\n`)

  const designTokens = {
    format: "kit-design-tokens/1",
    system: system.id,
    title: system.title,
    source: system.sourceUrl,
    groups: {
      theme: tokenGroup(cssVars.theme ?? {}),
      light: tokenGroup(cssVars.light ?? {}),
      dark: tokenGroup(cssVars.dark ?? {}),
    },
  }
  const flatRules = extraRules.filter(([, body]) => Object.values(body).every((value) => typeof value !== "object"))
  if (flatRules.length > 0) {
    designTokens.groups.rules = Object.fromEntries(
      flatRules.map(([selector, vars]) => [
        plainSelector(selector),
        tokenGroup(Object.fromEntries(Object.entries(vars).map(([prop, value]) => [prop.replace(/^--/, ""), value]))),
      ]),
    )
  }
  await writeFile(path.join(root, system.outDir, "design-tokens.json"), `${JSON.stringify(designTokens, null, 2)}\n`)
  emitted += 2
}

console.log(`Emitted ${emitted} framework-free token artifacts for ${systems.length} systems.`)
