import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const purple = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "calm-tokens.json"), "utf8"))
const tokenUrl = "https://kit.scottelling.com/r/calm/tokens.json"

function cssVariables(values) {
  return Object.fromEntries(Object.entries(values).map(([name, value]) => [`--${name}`, value]))
}

const tokenItem = {
  name: "tokens",
  type: "registry:theme",
  title: "Calm Desktop Tokens",
  description: "A dark graphite desktop foundation with dense structural planes, restrained periwinkle decisions, compact type, quiet boundaries, and transient-only shadow.",
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
    title: item.title.replace(/^Purple Rain /, "Calm Desktop "),
    description: item.description.replaceAll("Purple Rain", "Calm Desktop"),
    registryDependencies: [tokenUrl],
  }))

const registry = {
  $schema: purple.$schema,
  name: "calm",
  homepage: "https://kit.scottelling.com/kit/calm",
  items: [tokenItem, ...items],
}

const destination = path.join(root, "registry", "calm", "registry.json")
await mkdir(path.dirname(destination), { recursive: true })
await writeFile(destination, `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Generated Calm Desktop registry with ${items.length} shared production components.`)
