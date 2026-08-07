import { readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const registry = JSON.parse(await readFile(path.join(root, "registry", "animation", "registry.json"), "utf8"))
const library = JSON.parse(await readFile(path.join(root, "lib", "animation-library.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "animation-tokens.json"), "utf8"))
const shared = JSON.parse(await readFile(path.join(root, "lib", "purple-rain-library.json"), "utf8"))
const universal = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))
const failures = []
const tokenUrl = "https://kit.scottelling.com/r/animation/tokens.json"
const nativeNames = [
  "studio-shell", "studio-header", "workspace-switcher", "project-switcher", "storyboard-rail", "scene-list-item",
  "stage-viewport", "device-frame", "preview-toolbar", "ai-director", "command-suggestion-list", "inspector-panel",
  "layer-list", "style-inspector", "motion-inspector", "motion-preset-picker", "transport", "motion-timeline",
  "timeline-segment", "playhead", "delivery-workspace", "delivery-action", "render-status", "motion-check",
  "code-panel", "template-gallery", "guided-tour", "workspace-error-boundary",
]
const uiItems = registry.items.filter((item) => item.type === "registry:ui")

function parseOklch(value) {
  const match = /^oklch\(([-.\d]+)\s+([-.\d]+)\s+([-.\d]+)/.exec(value ?? "")
  return match ? { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) } : null
}

function luminance(value) {
  const angle = value.h * Math.PI / 180
  const a = value.c * Math.cos(angle)
  const b = value.c * Math.sin(angle)
  const lRoot = value.l + 0.3963377774 * a + 0.2158037573 * b
  const mRoot = value.l - 0.1055613458 * a - 0.0638541728 * b
  const sRoot = value.l - 0.0894841775 * a - 1.291485548 * b
  const l = lRoot ** 3
  const m = mRoot ** 3
  const s = sRoot ** 3
  const clamp = (channel) => Math.max(0, Math.min(1, channel))
  const r = clamp(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)
  const g = clamp(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)
  const blue = clamp(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
  return 0.2126 * r + 0.7152 * g + 0.0722 * blue
}

function contrast(first, second) {
  const a = parseOklch(first)
  const b = parseOklch(second)
  if (!a || !b) return 0
  const firstLuminance = luminance(a)
  const secondLuminance = luminance(b)
  return (Math.max(firstLuminance, secondLuminance) + 0.05) / (Math.min(firstLuminance, secondLuminance) + 0.05)
}

if (library.length !== shared.length + nativeNames.length) failures.push(`Animation library has ${library.length} pieces instead of ${shared.length + nativeNames.length}`)
if (new Set(library.map((item) => item.name)).size !== library.length) failures.push("Animation library names are not unique")
if (new Set(library.map((item) => item.category)).size !== 9) failures.push("Animation library does not contain the eight shared families plus Animation Patterns")
if (uiItems.length !== universal.length) failures.push(`Animation registry has ${uiItems.length} UI items; expected ${universal.length}`)

for (const name of nativeNames) {
  if (!library.some((item) => item.name === name && item.category === "Animation Patterns")) failures.push(`${name} is missing from the counted Animation patterns`)
  if (!uiItems.some((item) => item.name === name)) failures.push(`${name} is missing from the Animation registry`)
}

const tokenItem = registry.items.find((item) => item.name === "tokens")
if (!tokenItem) {
  failures.push("Animation token item is missing")
} else {
  if (tokenItem.cssVars?.theme?.["kit-control-height"] !== "44px") failures.push("Animation does not enforce 44-pixel controls")
  if (JSON.stringify(tokenItem.cssVars?.light) !== JSON.stringify(tokenItem.cssVars?.dark)) failures.push("Animation invents a second color mode instead of preserving its single dark authority")
  if (!tokenItem.description.includes("No light theme is invented")) failures.push("Animation does not explain its honest dark-only mode")
  const colors = Object.values(tokenItem.cssVars?.dark ?? {}).filter((value) => typeof value === "string" && value.startsWith("oklch("))
  if (colors.length < 40) failures.push("Animation is not fully translated to semantic OKLCH roles")
}

if (JSON.stringify(tokens.source) !== JSON.stringify(tokenItem?.cssVars?.dark)) failures.push("Animation source tokens and registry tokens diverged")
for (const [role, first, second] of [
  ["reading", tokens.source.background, tokens.source.foreground],
  ["primary action", tokens.source.primary, tokens.source["primary-foreground"]],
  ["destructive action", tokens.source.destructive, tokens.source["destructive-foreground"]],
  ["positive action", tokens.source.positive, tokens.source["positive-foreground"]],
]) {
  if (contrast(first, second) < 4.5) failures.push(`Animation ${role} contrast is below 4.5:1`)
}

for (const item of uiItems) {
  if (!item.registryDependencies?.includes(tokenUrl)) failures.push(`${item.name} does not carry Animation foundations automatically`)
  if (nativeNames.includes(item.name) && item.dependencies?.length) failures.push(`${item.name} adds an unapproved package dependency`)
  for (const file of item.files ?? []) {
    try { await stat(path.join(root, file.path)) } catch { failures.push(`${item.name} source is missing: ${file.path}`) }
  }
}

for (const name of ["registry", "tokens", ...universal.map((item) => item.name)]) {
  try {
    const emitted = JSON.parse(await readFile(path.join(root, "public", "r", "animation", `${name}.json`), "utf8"))
    if (!emitted.$schema) failures.push(`animation/${name}.json is missing its registry schema`)
  } catch (error) {
    failures.push(`animation/${name}.json is missing or invalid: ${error.message}`)
  }
}

const inspectedFiles = [
  path.join(root, "lib", "animation-tokens.json"),
  path.join(root, "app", "kit", "animation", "animation.css"),
  path.join(root, "app", "kit", "animation", "animation-workbench.tsx"),
  ...nativeNames.map((name) => path.join(root, "registry", "animation", "patterns", `${name}.tsx`)),
]
const banned = ["backdrop-filter", "backdrop-blur", "linear-gradient", "radial-gradient", "conic-gradient", "text-shadow", "transition-all", "animate-pulse", "animate-spin", "ambient-blob"]

for (const file of inspectedFiles) {
  const source = await readFile(file, "utf8")
  for (const term of banned) if (source.toLowerCase().includes(term)) failures.push(`${path.relative(root, file)} contains forbidden ${term}`)
  if (/#[0-9a-f]{3,8}\b/i.test(source)) failures.push(`${path.relative(root, file)} contains a raw color instead of a semantic role`)
  if (/rgba?\(/i.test(source)) failures.push(`${path.relative(root, file)} contains a legacy RGB color instead of OKLCH`)
}

const page = await readFile(path.join(root, "app", "kit", "animation", "page.tsx"), "utf8")
const experience = await readFile(path.join(root, "app", "kit", "kit-experience.tsx"), "utf8")
const header = await readFile(path.join(root, "components", "site-header.tsx"), "utf8")
const intake = await readFile(path.join(root, "docs", "ANIMATION-STUDIO-KIT-INTAKE.md"), "utf8")
if (!page.includes("universal-library.json")) failures.push("Animation showroom is not driven by the universal inventory")
if (!experience.includes("<AnimationWorkbench")) failures.push("Animation showroom is missing the connected creative-workspace proof")
if (!experience.includes("No invented light theme")) failures.push("Animation showroom hides its dark-only source boundary")
if (!header.includes('item.category === "Animation Patterns"')) failures.push("Animation-native patterns are missing from the plain-language finder")
if (!intake.includes("f5e9efc19859b82f64d03ea97dee81ec06f5d7ed")) failures.push("Animation intake does not pin the inspected source commit")

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log("Verified Animation Studio: complete universal library, 28 owned creative-workspace structures, opt-in OS patterns, exact dark authority, 44-pixel controls, semantic OKLCH foundations, zero unapproved dependencies, and public output.")
