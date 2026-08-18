import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const purple = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "vanilla-kit-tokens.json"), "utf8"))
const tokenUrl = "https://kit.scottelling.com/r/vanilla-kit/tokens.json"

function cssVariables(values) {
  return Object.fromEntries(Object.entries(values).map(([name, value]) => [`--${name}`, value]))
}

const tokenItem = {
  name: "tokens",
  type: "registry:theme",
  title: "Vanilla Tokens",
  description: "A deliberately neutral light and dark foundation for new products that need to remain ready for any future Kit swap.",
  cssVars: tokens,
  css: {
    ":root": cssVariables(tokens.light),
    ".dark": cssVariables(tokens.dark),
  },
}

const sharedItems = purple.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => ({
    ...item,
    title: item.title.replace(/^Purple Rain /, "Vanilla "),
    description: item.description.replaceAll("Purple Rain", "Vanilla"),
    registryDependencies: [tokenUrl],
  }))

const registry = {
  $schema: purple.$schema,
  name: "vanilla-kit",
  homepage: "https://kit.scottelling.com/kit/vanilla",
  items: [tokenItem, ...sharedItems],
}

await mkdir(path.join(root, "registry", "vanilla-kit"), { recursive: true })
await writeFile(path.join(root, "registry", "vanilla-kit", "registry.json"), `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Generated Vanilla registry with ${sharedItems.length} shared production components.`)
