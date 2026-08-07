import { readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const failures = []
const icons = JSON.parse(await readFile(path.join(root, "lib", "icon-catalog.json"), "utf8"))
const fonts = JSON.parse(await readFile(path.join(root, "lib", "font-library.json"), "utf8"))
const adoption = JSON.parse(await readFile(path.join(root, "lib", "adoption-contract.json"), "utf8"))
const catalog = JSON.parse(await readFile(path.join(root, "lib", "system-catalog.json"), "utf8"))
const universal = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))
const manifests = [
  ["purple-rain", "registry.json", "https://kit.scottelling.com/r/tokens.json"],
  ["jade", "registry/jade/registry.json", "https://kit.scottelling.com/r/jade/tokens.json"],
  ["os-kit", "registry/os/registry.json", "https://kit.scottelling.com/r/os/tokens.json"],
  ["animation-studio", "registry/animation/registry.json", "https://kit.scottelling.com/r/animation/tokens.json"],
]

if (icons.families.length !== 2) failures.push("icon library does not contain exactly two approved interface families")
for (const family of icons.families) {
  if (family.count !== family.icons.length) failures.push(`${family.name} count has drifted`)
  if (new Set(family.icons.map((icon) => icon.name)).size !== family.icons.length) failures.push(`${family.name} contains duplicate names`)
  if (family.icons.some((icon) => !icon.label || !icon.category)) failures.push(`${family.name} contains an unlabelled or unclassified icon`)
}
if (!icons.families.some((family) => family.id === "lucide" && family.icons.length > 1500)) failures.push("Lucide catalog is incomplete")
if (!icons.families.some((family) => family.id === "material" && family.icons.length > 4000)) failures.push("Material Symbols catalog is incomplete")

const sprite = await readFile(path.join(root, "public", "icons", "lucide-sprite.svg"), "utf8")
const spriteCount = [...sprite.matchAll(/<symbol id="lucide-/gu)].length
const lucideCount = icons.families.find((family) => family.id === "lucide")?.count ?? 0
if (spriteCount !== lucideCount) failures.push(`Lucide sprite has ${spriteCount} symbols instead of ${lucideCount}`)

for (const file of [
  "public/fonts/material-symbols/MaterialSymbolsRounded.woff2",
  "sources/material-symbols/MaterialSymbolsRounded.codepoints",
  "licenses/material-symbols/LICENSE.txt",
]) {
  try { await stat(path.join(root, file)) } catch { failures.push(`${file} is missing`) }
}

if (fonts.families.length < 10) failures.push("font library is missing approved families")
if (!fonts.families.some((font) => font.id === "outfit") || !fonts.families.some((font) => font.id === "jetbrains-mono")) failures.push("Animation Studio's type system is missing")
for (const pairing of fonts.pairings) {
  for (const role of ["heading", "body", "mono"]) if (!fonts.families.some((font) => font.id === pairing[role])) failures.push(`${pairing.name} references a missing ${role} family`)
}

for (const requirement of ["preserve", "change", "repairBeforeSwap", "proof", "representativeScreens", "iconPolicy", "fontPolicy", "rollback"]) {
  if (!adoption[requirement] || Object.keys(adoption[requirement]).length === 0) failures.push(`adoption contract is missing ${requirement}`)
}

if (catalog.items.length !== universal.length) failures.push("system catalog has drifted from the universal library")
if (!catalog.layers.some((layer) => layer.id === "specialty" && layer.count > 0)) failures.push("system catalog does not preserve specialist patterns")

const universalNames = new Set(universal.map((item) => item.name))
for (const [name, file, tokenUrl] of manifests) {
  const registry = JSON.parse(await readFile(path.join(root, file), "utf8"))
  const items = registry.items.filter((item) => item.type === "registry:ui")
  if (items.length !== universal.length) failures.push(`${name} does not carry the complete catalog`)
  for (const item of items) {
    if (!universalNames.has(item.name)) failures.push(`${name} contains an unclassified component: ${item.name}`)
    if (JSON.stringify(item.registryDependencies) !== JSON.stringify([tokenUrl])) failures.push(`${name} ${item.name} does not remain opt-in with only its own foundations`)
  }
}

for (const [source, emitted] of [
  ["lib/icon-catalog.json", "public/r/icon-catalog.json"],
  ["lib/system-catalog.json", "public/r/system-catalog.json"],
  ["lib/adoption-contract.json", "public/r/adoption-contract.json"],
]) {
  if (await readFile(path.join(root, source), "utf8") !== await readFile(path.join(root, emitted), "utf8")) failures.push(`${emitted} is stale`)
}

for (const page of ["app/studio/icons/page.tsx", "app/studio/fonts/page.tsx", "app/studio/swap/page.tsx"]) {
  try { await stat(path.join(root, page)) } catch { failures.push(`${page} is missing`) }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified one ${universal.length}-piece catalog across every kit, ${icons.families.reduce((sum, family) => sum + family.count, 0)} browseable icons, ${fonts.families.length} approved font families, and one reversible swap contract.`)
