import { createHash } from "node:crypto"
import { readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const failures = []
const registry = JSON.parse(await readFile(path.join(root, "registry", "calm", "registry.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "calm-tokens.json"), "utf8"))
const universal = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))
const css = await readFile(path.join(root, "app", "kit", "calm", "calm.css"), "utf8")
const workbench = await readFile(path.join(root, "app", "kit", "calm", "calm-workbench.tsx"), "utf8")
const publicTokens = JSON.parse(await readFile(path.join(root, "public", "r", "calm", "tokens.json"), "utf8"))
const source = await readFile(path.join(root, "sources", "calm", "calm-desktop-kit.md"))
const tokenUrl = "https://kit.scottelling.com/r/calm/tokens.json"

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

if (registry.name !== "calm") failures.push("Calm registry has the wrong identity")
if (registry.homepage !== "https://kit.scottelling.com/kit/calm") failures.push("Calm registry has the wrong showroom")
if (tokens.theme["kit-control-height"] !== "44px") failures.push("Calm lost the 44-pixel control contract")
if (tokens.theme["kit-standard"] !== "180ms") failures.push("Calm lost its short interruptible timing")
if (JSON.stringify(tokens.light) !== JSON.stringify(tokens.dark)) failures.push("Calm invents a light appearance outside the source authority")
if (createHash("sha256").update(source).digest("hex") !== "3c75e3210cc5e9a4e5fdfd9c01cc17538dd4bcfc4d152aa23cda70d18db28eca") failures.push("The archived Calm source changed")

for (const role of ["font-sans", "font-heading", "font-mono"]) {
  if (tokens.light[role] !== tokens.theme[role] || tokens.dark[role] !== tokens.theme[role]) failures.push(`Calm ${role} will not survive a clean install`)
  if (publicTokens.css?.[":root"]?.[`--${role}`] !== tokens.theme[role]) failures.push(`Calm public tokens do not install --${role}`)
}

for (const [name, expected] of Object.entries({
  background: "oklch(0.173482 0.002043 286.185)",
  sidebar: "oklch(0.154794 0.002103 286.152)",
  card: "oklch(0.191680 0.001992 286.210)",
  foreground: "oklch(0.943794 0.004562 78.298)",
  primary: "oklch(0.758168 0.125202 277.958)",
  destructive: "oklch(0.784754 0.125210 20.281)",
})) {
  if (tokens.dark[name] !== expected) failures.push(`Calm changed the exact ${name} source color`)
}

for (const [surface, ink] of [["background", "foreground"], ["card", "card-foreground"], ["popover", "popover-foreground"], ["primary", "primary-foreground"], ["secondary", "secondary-foreground"], ["muted", "muted-foreground"], ["accent", "accent-foreground"], ["destructive", "destructive-foreground"], ["positive", "positive-foreground"], ["sidebar", "sidebar-foreground"], ["sidebar-primary", "sidebar-primary-foreground"], ["sidebar-accent", "sidebar-accent-foreground"]]) {
  const ratio = contrast(tokens.dark[surface], tokens.dark[ink])
  if (ratio < 4.5) failures.push(`Calm ${surface}/${ink} contrast is ${ratio.toFixed(2)} instead of at least 4.5`)
}

for (const shadow of ["shadow-control", "shadow-panel", "shadow-inset"]) if (tokens.dark[shadow] !== "none") failures.push(`Calm puts shadow on stable ${shadow.replace("shadow-", "")} surfaces`)

const items = registry.items.filter((item) => item.type === "registry:ui")
if (items.length !== universal.length) failures.push(`Calm has ${items.length} pieces instead of ${universal.length}`)
for (const item of items) if (JSON.stringify(item.registryDependencies) !== JSON.stringify([tokenUrl])) failures.push(`${item.name} does not carry only Calm tokens`)

for (const required of ["Search everything", "New note", "Resize navigation", "Resize utilities", "Ask or command", "Command", "Undo", "aria-current", "role=\"tab\"", "Mark ready"]) {
  if (!workbench.includes(required)) failures.push(`Calm workbench is missing ${required}`)
}
for (const forbidden of ["backdrop-filter", "linear-gradient", "radial-gradient", "filter: blur", "animation-iteration-count: infinite"]) {
  if (css.includes(forbidden)) failures.push(`Calm introduces forbidden effect: ${forbidden}`)
}
for (const required of ["min-height: var(--kit-control-height)", "max-width: 76rem", "max-width: 40rem", "prefers-reduced-motion", "overflow: auto", "box-shadow: var(--calm-float-shadow)"]) {
  if (!css.includes(required)) failures.push(`Calm responsive or interaction contract is missing ${required}`)
}

for (const file of [
  "sources/calm/calm-desktop-kit.md",
  "docs/CALM-KIT-INTAKE.md",
  "public/r/calm/registry.json",
  "public/r/calm/tokens.json",
  "public/r/calm/tokens.css",
  "public/r/calm/design-tokens.json",
  "public/r/calm/button.json",
]) {
  try { await stat(path.join(root, file)) } catch { failures.push(`${file} is missing`) }
}

if (failures.length) {
  console.error(`Calm verification failed (${failures.length}):`)
  console.error(failures.map((failure) => `  - ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified Calm Desktop: ${items.length} individually installable pieces, exact dark graphite authority, stable flat surfaces, transient-only shadow, 44-pixel controls, responsive drawers, command flow, archived source, and public output.`)
