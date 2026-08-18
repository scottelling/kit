import { readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const registry = JSON.parse(await readFile(path.join(root, "registry", "os", "registry.json"), "utf8"))
const library = JSON.parse(await readFile(path.join(root, "lib", "os-library.json"), "utf8"))
const shared = JSON.parse(await readFile(path.join(root, "lib", "purple-rain-library.json"), "utf8"))
const universal = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "os-tokens.json"), "utf8"))
const failures = []
const tokenUrl = "https://kit.scottelling.com/r/os/tokens.json"
const nativeNames = ["desktop-shell", "window-shell", "menu-bar", "dock", "widget-shell", "master-detail", "split-view", "command-bar", "settings-sheet"]
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

if (library.length !== shared.length + nativeNames.length) failures.push(`OS library has ${library.length} pieces instead of ${shared.length + nativeNames.length}`)
if (new Set(library.map((item) => item.name)).size !== library.length) failures.push("OS library names are not unique")
if (new Set(library.map((item) => item.category)).size !== 9) failures.push("OS library does not contain exactly nine families")
if (uiItems.length !== universal.length) failures.push(`OS registry has ${uiItems.length} UI items; expected ${universal.length}`)

for (const name of nativeNames) {
  if (!library.some((item) => item.name === name && item.category === "OS Patterns")) failures.push(`${name} is missing from the counted OS patterns`)
  if (!uiItems.some((item) => item.name === name)) failures.push(`${name} is missing from the OS registry`)
}

const tokenItem = registry.items.find((item) => item.name === "tokens")
if (!tokenItem) {
  failures.push("OS token item is missing")
} else {
  if (tokenItem.cssVars?.theme?.["kit-control-height"] !== "44px") failures.push("OS does not enforce 44-pixel controls")
  for (const mode of ["light", "dark"]) {
    const values = Object.values(tokenItem.cssVars?.[mode] ?? {})
    if (values.filter((value) => typeof value === "string" && value.startsWith("oklch(")).length < 20) failures.push(`OS ${mode} palette is not fully OKLCH`)
  }
  for (const preset of ["hacker", "ethereal", "paper"]) {
    const selector = `.os-theme-${preset}`
    if (!tokenItem.css?.[selector]?.["--background"]) failures.push(`${preset} is missing from the installable theme item`)
  }
}

for (const [preset, values] of Object.entries(tokens.presets)) {
  const colors = Object.values(values).filter((value) => typeof value === "string" && value.startsWith("oklch("))
  if (colors.length < 20) failures.push(`${preset} is not a complete OKLCH preset`)
}

for (const [name, values] of Object.entries({ daylight: tokens.light, default: tokens.dark, ...tokens.presets })) {
  for (const [role, first, second] of [
    ["reading", values.background, values.foreground],
    ["supporting text", values.background, values["muted-foreground"]],
    ["primary action", values.primary, values["primary-foreground"]],
    ["destructive action", values.destructive, values["destructive-foreground"]],
    ["positive action", values.positive, values["positive-foreground"]],
  ]) {
    if (contrast(first, second) < 4.5) failures.push(`${name} ${role} contrast is below 4.5:1`)
  }
}

for (const item of uiItems) {
  if (!item.registryDependencies?.includes(tokenUrl)) failures.push(`${item.name} does not carry OS foundations automatically`)
  if (nativeNames.includes(item.name) && item.dependencies?.length) failures.push(`${item.name} adds an unapproved package dependency`)
  for (const file of item.files ?? []) {
    try { await stat(path.join(root, file.path)) } catch { failures.push(`${item.name} source is missing: ${file.path}`) }
  }
}

for (const name of ["registry", "tokens", ...universal.map((item) => item.name)]) {
  try {
    const emitted = JSON.parse(await readFile(path.join(root, "public", "r", "os", `${name}.json`), "utf8"))
    if (!emitted.$schema) failures.push(`os/${name}.json is missing its registry schema`)
  } catch (error) {
    failures.push(`os/${name}.json is missing or invalid: ${error.message}`)
  }
}

const inspectedFiles = [
  path.join(root, "lib", "os-tokens.json"),
  path.join(root, "app", "kit", "os", "os.css"),
  path.join(root, "app", "kit", "os", "os-workbench.tsx"),
  ...nativeNames.map((name) => path.join(root, "registry", "os", "patterns", `${name}.tsx`)),
]
const banned = ["backdrop-filter", "backdrop-blur", "linear-gradient", "radial-gradient", "conic-gradient", "text-shadow", "transition-all", "animate-pulse", "animate-spin", "glow", "aura"]

for (const file of inspectedFiles) {
  const source = await readFile(file, "utf8")
  for (const term of banned) if (source.toLowerCase().includes(term)) failures.push(`${path.relative(root, file)} contains forbidden ${term}`)
}

const page = await readFile(path.join(root, "app", "kit", "os", "page.tsx"), "utf8")
const experience = await readFile(path.join(root, "app", "kit", "kit-experience.tsx"), "utf8")
const header = await readFile(path.join(root, "components", "site-header.tsx"), "utf8")
if (!page.includes("universal-library.json")) failures.push("OS showroom is not driven by the universal inventory")
if (!experience.includes("<OsWorkbench")) failures.push("OS showroom is missing the shared desktop, phone, and widget proof")
if (!experience.includes("osThemes.map")) failures.push("OS showroom does not expose every theme mood")
if (!header.includes('item.category === "OS Patterns"')) failures.push("OS-native patterns are missing from the plain-language finder")

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log("Verified OS: complete universal library, nine owned OS structures, opt-in creative patterns, five solid theme moods, 44-pixel controls, OKLCH foundations, zero unapproved dependencies, and public output.")
