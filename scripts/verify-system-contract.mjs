import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const contract = JSON.parse(await readFile(path.join(root, "lib", "kit-capability-contract.json"), "utf8"))
const library = JSON.parse(await readFile(path.join(root, "lib", "purple-rain-library.json"), "utf8"))
const registries = await Promise.all([
  readFile(path.join(root, "registry.json"), "utf8").then(JSON.parse),
  readFile(path.join(root, "registry", "jade", "registry.json"), "utf8").then(JSON.parse),
])
const failures = []

for (const name of contract.application_patterns) {
  if (!library.some((item) => item.name === name)) failures.push(`${name} is missing from the visual inventory`)
  for (const registry of registries) {
    if (!registry.items.some((item) => item.name === name)) failures.push(`${name} is missing from ${registry.name}`)
  }
}

for (const registry of registries) {
  const tokenItem = registry.items.find((item) => item.name === "tokens")
  const componentItems = registry.items.filter((item) => item.type === "registry:ui")
  if (componentItems.length !== library.length) failures.push(`${registry.name} has ${componentItems.length} pieces; expected ${library.length}`)
  for (const mode of ["light", "dark"]) {
    if (!tokenItem?.cssVars?.[mode]?.background) failures.push(`${registry.name} is missing ${mode} foundations`)
    if (!tokenItem?.cssVars?.[mode]?.["shadow-inset"]) failures.push(`${registry.name} is missing ${mode} tactile depth`)
  }
  if (tokenItem?.cssVars?.theme?.["kit-control-height"] !== contract.requirements.minimum_control_height) {
    failures.push(`${registry.name} does not enforce the shared control height`)
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified ${registries.length} visual systems against ${contract.application_patterns.length} application patterns and the shared release contract.`)
