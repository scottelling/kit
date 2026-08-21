import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const contract = JSON.parse(await readFile(path.join(root, "lib", "kit-capability-contract.json"), "utf8"))
const library = JSON.parse(await readFile(path.join(root, "lib", "purple-rain-library.json"), "utf8"))
const universalLibrary = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))
const systemCatalog = JSON.parse(await readFile(path.join(root, "lib", "system-catalog.json"), "utf8"))
const registries = await Promise.all([
  readFile(path.join(root, "registry.json"), "utf8").then(JSON.parse).then((registry) => ({ registry, expected: universalLibrary.length })),
  readFile(path.join(root, "registry", "jade", "registry.json"), "utf8").then(JSON.parse).then((registry) => ({ registry, expected: universalLibrary.length })),
  readFile(path.join(root, "registry", "os", "registry.json"), "utf8").then(JSON.parse).then((registry) => ({ registry, expected: universalLibrary.length })),
  readFile(path.join(root, "registry", "animation", "registry.json"), "utf8").then(JSON.parse).then((registry) => ({ registry, expected: universalLibrary.length })),
  readFile(path.join(root, "registry", "vanilla-kit", "registry.json"), "utf8").then(JSON.parse).then((registry) => ({ registry, expected: universalLibrary.length })),
  readFile(path.join(root, "registry", "voltage", "registry.json"), "utf8").then(JSON.parse).then((registry) => ({ registry, expected: universalLibrary.length })),
  readFile(path.join(root, "registry", "calm", "registry.json"), "utf8").then(JSON.parse).then((registry) => ({ registry, expected: universalLibrary.length })),
])
const failures = []
const universalNames = new Set(universalLibrary.map((item) => item.name))

if (contract.specialty_install_policy !== "opt-in") failures.push("specialist patterns are not explicitly opt-in")
if (systemCatalog.items.length !== universalLibrary.length) failures.push("system catalog and universal library have drifted")

for (const name of contract.application_patterns) {
  if (!library.some((item) => item.name === name)) failures.push(`${name} is missing from the visual inventory`)
  for (const { registry } of registries) {
    if (!registry.items.some((item) => item.name === name)) failures.push(`${name} is missing from ${registry.name}`)
  }
}

for (const name of contract.safety_patterns) {
  if (!library.some((item) => item.name === name)) failures.push(`${name} is missing from the shared safety inventory`)
  for (const { registry } of registries) {
    if (!registry.items.some((item) => item.name === name)) failures.push(`${name} is missing from ${registry.name}`)
  }
}

for (const { registry, expected } of registries) {
  const tokenItem = registry.items.find((item) => item.name === "tokens")
  const componentItems = registry.items.filter((item) => item.type === "registry:ui")
  if (componentItems.length !== expected) failures.push(`${registry.name} has ${componentItems.length} pieces; expected ${expected}`)
  if (new Set(componentItems.map((item) => item.name)).size !== universalNames.size) failures.push(`${registry.name} has duplicate or missing component names`)
  for (const name of universalNames) if (!componentItems.some((item) => item.name === name)) failures.push(`${name} is missing from ${registry.name}`)
  for (const item of componentItems) if ((item.registryDependencies ?? []).length !== 1 || !item.registryDependencies[0].endsWith("tokens.json")) failures.push(`${registry.name} ${item.name} does not remain individually installable with tokens only`)
  const declaredModes = contract.system_modes[registry.name] ?? []
  const registryModes = declaredModes.includes("light") ? ["light", "dark"] : ["dark"]
  for (const mode of registryModes) {
    if (!tokenItem?.cssVars?.[mode]?.background) failures.push(`${registry.name} is missing ${mode} foundations`)
    if (!tokenItem?.cssVars?.[mode]?.["shadow-inset"]) failures.push(`${registry.name} is missing ${mode} tactile depth`)
  }
  if (registry.name === "animation-studio" && JSON.stringify(tokenItem?.cssVars?.light) !== JSON.stringify(tokenItem?.cssVars?.dark)) {
    failures.push("animation-studio invents a light direction outside its declared source modes")
  }
  if (registry.name === "calm" && JSON.stringify(tokenItem?.cssVars?.light) !== JSON.stringify(tokenItem?.cssVars?.dark)) {
    failures.push("calm invents a light direction outside its declared source modes")
  }
  if (tokenItem?.cssVars?.theme?.["kit-control-height"] !== contract.requirements.minimum_control_height) {
    failures.push(`${registry.name} does not enforce the shared control height`)
  }
}

const osRegistry = registries.find(({ registry }) => registry.name === "os-kit")?.registry
for (const name of contract.os_patterns) {
  if (!osRegistry?.items.some((item) => item.name === name)) failures.push(`${name} is missing from OS Kit`)
}

const animationRegistry = registries.find(({ registry }) => registry.name === "animation-studio")?.registry
for (const name of contract.animation_patterns) {
  if (!animationRegistry?.items.some((item) => item.name === name)) failures.push(`${name} is missing from Animation Studio`)
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified ${registries.length} visual systems against one ${universalLibrary.length}-piece catalog, with specialist patterns opt-in, product layouts protected, and each system's declared color modes intact.`)
