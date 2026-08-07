import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const lucideDirectory = path.join(root, "node_modules", "lucide-react", "dist", "esm", "icons")
const materialCodepoints = path.join(root, "sources", "material-symbols", "MaterialSymbolsRounded.codepoints")

function labelFor(name) {
  return name
    .split(/[-_]/u)
    .map((word) => /^\d/u.test(word) ? word.toUpperCase() : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ")
}

const categoryRules = [
  ["Actions", /(^|[-_])(add|plus|remove|minus|edit|pen|delete|trash|copy|save|share|download|upload|search|settings|check|close|refresh|sync|undo|redo|play|pause|stop)([-_]|$)/u],
  ["Navigation", /(arrow|chevron|navigation|menu|home|route|corner|move|panel|layout|sidebar)/u],
  ["Files & content", /(file|folder|archive|document|article|description|note|book|clipboard|receipt|text|type|table|list)/u],
  ["Communication", /(message|mail|phone|chat|send|inbox|outbox|comment|forum|contact|rss)/u],
  ["Media", /(volume|music|video|camera|image|film|mic|audio|headphone|disc|cast|radio)/u],
  ["People", /(user|person|people|group|social|account|face|child|man|woman|accessibility)/u],
  ["Devices", /(device|desktop|monitor|laptop|mobile|tablet|watch|keyboard|mouse|printer|router|wifi|bluetooth)/u],
  ["Places", /(map|place|location|pin|globe|earth|travel|flight|train|car|bus|ship|building|store|school|hospital)/u],
]

function categoryFor(name) {
  return categoryRules.find(([, pattern]) => pattern.test(name))?.[0] ?? "Objects & ideas"
}

function xmlName(name) {
  return name.replace(/[A-Z]/gu, (letter) => `-${letter.toLowerCase()}`)
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function serializeNode([element, attributes]) {
  const values = Object.entries(attributes)
    .filter(([name, value]) => name !== "key" && value !== undefined && value !== null)
    .map(([name, value]) => `${xmlName(name)}="${escapeXml(value)}"`)
    .join(" ")
  return `<${element}${values ? ` ${values}` : ""} />`
}

const lucideFiles = (await readdir(lucideDirectory))
  .filter((name) => name.endsWith(".mjs") && name !== "index.mjs")
  .sort()
const lucideIcons = []
const symbols = []

for (const file of lucideFiles) {
  const name = file.replace(/\.mjs$/u, "")
  const iconModule = await import(pathToFileURL(path.join(lucideDirectory, file)).href)
  if (!Array.isArray(iconModule.__iconNode)) continue
  lucideIcons.push({ name, label: labelFor(name), category: categoryFor(name) })
  symbols.push(`<symbol id="lucide-${name}" viewBox="0 0 24 24">${iconModule.__iconNode.map(serializeNode).join("")}</symbol>`)
}

const materialSource = await readFile(materialCodepoints, "utf8")
const materialIcons = [...new Set(materialSource
  .split(/\r?\n/u)
  .map((line) => line.trim().split(/\s+/u)[0])
  .filter(Boolean))]
  .sort()
  .map((name) => ({ name, label: labelFor(name), category: categoryFor(name) }))

const catalog = {
  version: "1.0.0",
  policy: {
    primary: "Use Lucide for everyday controls, navigation, and actions.",
    secondary: "Use Material Symbols Rounded when the required object or concept is not available in Lucide.",
    brands: "Keep company and product marks in a separate verified brand collection.",
    custom: "Draw a new icon only when neither approved family communicates the concept and the mark is not a brand asset.",
  },
  families: [
    {
      id: "lucide",
      name: "Lucide",
      purpose: "Clear interface actions and navigation with one consistent outline language.",
      license: "ISC",
      source: "lucide-react@1.26.0",
      count: lucideIcons.length,
      icons: lucideIcons,
    },
    {
      id: "material",
      name: "Material Symbols Rounded",
      purpose: "A broad vocabulary for objects, domains, devices, places, and specialist concepts.",
      license: "Apache-2.0",
      source: "google/material-design-icons@50f0603134ce7b70b2d71b686cc13e8b57ccb74c",
      count: materialIcons.length,
      icons: materialIcons,
    },
  ],
}

await mkdir(path.join(root, "public", "icons"), { recursive: true })
await writeFile(path.join(root, "public", "icons", "lucide-sprite.svg"), `<svg xmlns="http://www.w3.org/2000/svg"><defs>${symbols.join("")}</defs></svg>\n`)
await writeFile(path.join(root, "lib", "icon-catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`)

console.log(`Generated ${lucideIcons.length} Lucide icons and ${materialIcons.length} Material Symbols with one searchable catalog.`)
