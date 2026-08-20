import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const purple = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "voltage-tokens.json"), "utf8"))
const tokenUrl = "https://kit.scottelling.com/r/voltage/tokens.json"

function cssVariables(values) {
  return Object.fromEntries(Object.entries(values).map(([name, value]) => [`--${name}`, value]))
}

const tokenItem = {
  name: "tokens",
  type: "registry:theme",
  title: "Voltage Tokens",
  description: "A vivid violet desktop foundation with solid color blocks, rounded object geometry, tactile depth, bright status signals, and maintained light and dark appearances.",
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
    title: item.title.replace(/^Purple Rain /, "Voltage "),
    description: item.description.replaceAll("Purple Rain", "Voltage"),
    registryDependencies: [tokenUrl],
  }))

const registry = {
  $schema: purple.$schema,
  name: "voltage",
  homepage: "https://kit.scottelling.com/kit/voltage",
  items: [tokenItem, ...items],
}

const destination = path.join(root, "registry", "voltage", "registry.json")
await mkdir(path.dirname(destination), { recursive: true })
await writeFile(destination, `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Generated Voltage registry with ${items.length} shared production components.`)
