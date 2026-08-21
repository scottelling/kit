import { readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const failures = []
const registry = JSON.parse(await readFile(path.join(root, "registry", "voltage", "registry.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "voltage-tokens.json"), "utf8"))
const universal = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))
const css = await readFile(path.join(root, "app", "kit", "voltage", "voltage.css"), "utf8")
const workbench = await readFile(path.join(root, "app", "kit", "voltage", "voltage-workbench.tsx"), "utf8")
const publicTokens = JSON.parse(await readFile(path.join(root, "public", "r", "voltage", "tokens.json"), "utf8"))
const tokenUrl = "https://kit.scottelling.com/r/voltage/tokens.json"

function relativeLuminance(value) {
  const match = String(value).match(/oklch\(([-.\d]+)\s+([-.\d]+)\s+([-.\d]+)/)
  if (!match) return null
  const lightness = Number(match[1])
  const chroma = Number(match[2])
  const hue = Number(match[3]) * Math.PI / 180
  const a = chroma * Math.cos(hue)
  const b = chroma * Math.sin(hue)
  const lPrime = lightness + 0.3963377774 * a + 0.2158037573 * b
  const mPrime = lightness - 0.1055613458 * a - 0.0638541728 * b
  const sPrime = lightness - 0.0894841775 * a - 1.291485548 * b
  const l = lPrime ** 3
  const m = mPrime ** 3
  const s = sPrime ** 3
  const red = Math.max(0, Math.min(1, 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s))
  const green = Math.max(0, Math.min(1, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s))
  const blue = Math.max(0, Math.min(1, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s))
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrast(first, second) {
  const a = relativeLuminance(first)
  const b = relativeLuminance(second)
  if (a === null || b === null) return 0
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

if (registry.name !== "voltage") failures.push("Voltage registry has the wrong identity")
if (registry.homepage !== "https://kit.scottelling.com/kit/voltage") failures.push("Voltage registry has the wrong showroom")
if (tokens.theme["kit-control-height"] !== "44px") failures.push("Voltage lost the 44-pixel control contract")
if (tokens.theme["kit-standard"] !== "200ms") failures.push("Voltage motion no longer uses its maintained short timing")
for (const role of ["font-sans", "font-heading", "font-mono"]) {
  if (tokens.light[role] !== tokens.theme[role] || tokens.dark[role] !== tokens.theme[role]) {
    failures.push(`Voltage ${role} will not survive installation in a clean project`)
  }
  if (publicTokens.css?.[":root"]?.[`--${role}`] !== tokens.theme[role]) {
    failures.push(`Voltage public tokens do not install an actual --${role} value`)
  }
}

for (const mode of ["light", "dark"]) {
  if (!tokens[mode]?.background || !tokens[mode]?.foreground) failures.push(`Voltage is missing ${mode} foundations`)
  for (const [name, value] of Object.entries(tokens[mode] ?? {})) {
    if (["background", "foreground", "card", "primary", "positive", "destructive", "border", "ring"].includes(name) && !String(value).startsWith("oklch(")) {
      failures.push(`Voltage ${mode}.${name} is not maintained in OKLCH`)
    }
  }
  for (const role of ["voltage-violet", "voltage-blue", "voltage-cyan", "voltage-green", "voltage-amber", "voltage-pink"]) {
    if (!tokens[mode]?.[role]) failures.push(`Voltage ${mode} is missing ${role}`)
  }
  for (const [surface, ink] of [["background", "foreground"], ["card", "card-foreground"], ["popover", "popover-foreground"], ["primary", "primary-foreground"], ["secondary", "secondary-foreground"], ["muted", "muted-foreground"], ["accent", "accent-foreground"], ["destructive", "destructive-foreground"], ["positive", "positive-foreground"], ["sidebar", "sidebar-foreground"], ["sidebar-primary", "sidebar-primary-foreground"], ["sidebar-accent", "sidebar-accent-foreground"]]) {
    const ratio = contrast(tokens[mode]?.[surface], tokens[mode]?.[ink])
    if (ratio < 4.5) failures.push(`Voltage ${mode} ${surface}/${ink} contrast is ${ratio.toFixed(2)} instead of at least 4.5`)
  }
}

const items = registry.items.filter((item) => item.type === "registry:ui")
if (items.length !== universal.length) failures.push(`Voltage has ${items.length} pieces instead of ${universal.length}`)
for (const item of items) {
  if (JSON.stringify(item.registryDependencies) !== JSON.stringify([tokenUrl])) failures.push(`${item.name} does not carry only Voltage tokens`)
}

for (const required of ["Start over", "Protection", "Performance", "Space", "System health", "aria-current", "aria-pressed"]) {
  if (!workbench.includes(required)) failures.push(`Voltage workbench is missing ${required}`)
}
for (const forbidden of ["backdrop-filter", "linear-gradient", "radial-gradient", "filter: blur", "animation-iteration-count: infinite"]) {
  if (css.includes(forbidden)) failures.push(`Voltage introduces forbidden effect: ${forbidden}`)
}
for (const required of ["repeat(5, minmax(0, 1fr))", "min-height: 3.5rem", "prefers-reduced-motion", "var(--kit-control-height)"]) {
  if (!css.includes(required)) failures.push(`Voltage responsive or accessibility contract is missing ${required}`)
}

for (const file of [
  "sources/voltage/reference.png",
  "docs/VOLTAGE-KIT-INTAKE.md",
  "public/r/voltage/registry.json",
  "public/r/voltage/tokens.json",
  "public/r/voltage/tokens.css",
  "public/r/voltage/design-tokens.json",
  "public/r/voltage/button.json",
]) {
  try { await stat(path.join(root, file)) } catch { failures.push(`${file} is missing`) }
}

if (failures.length) {
  console.error(`Voltage verification failed (${failures.length}):`)
  console.error(failures.map((failure) => `  - ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified Voltage: ${items.length} individually installable pieces, exact light and dark OKLCH foundations, visible five-choice phone rail, solid materials, 44-pixel controls, reduced motion, archived reference, and public output.`)
