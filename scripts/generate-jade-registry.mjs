import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const purple = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "jade-tokens.json"), "utf8"))
const tokenUrl = "https://kit.scottelling.com/r/jade/tokens.json"

function cssVariables(values) {
  return Object.fromEntries(Object.entries(values).map(([name, value]) => [`--${name}`, value]))
}

const tokenItem = {
  name: "tokens",
  type: "registry:theme",
  title: "JADE Tokens",
  description: "JADE semantic foundations in OKLCH, with tactile raised and sunken planes in light and dark.",
  cssVars: tokens,
  css: {
    ":root": cssVariables(tokens.light),
    ".dark": cssVariables(tokens.dark),
  },
}

const items = purple.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => ({
    ...item,
    title: item.title.replace(/^Purple Rain /, "JADE "),
    description: item.description.replaceAll("Purple Rain", "JADE"),
    registryDependencies: [tokenUrl],
  }))

const jade = {
  $schema: purple.$schema,
  name: "jade",
  homepage: "https://kit.scottelling.com/kit/jade",
  items: [tokenItem, ...items],
}

const destination = path.join(root, "registry", "jade", "registry.json")
await mkdir(path.dirname(destination), { recursive: true })
await writeFile(destination, `${JSON.stringify(jade, null, 2)}\n`)
console.log(`Generated JADE registry with ${items.length} shared production components.`)
