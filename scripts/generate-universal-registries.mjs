import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const schema = "https://ui.shadcn.com/schema/registry.json"
const systems = [
  {
    id: "purple-rain",
    label: "Purple Rain",
    manifest: "registry.json",
    homepage: "https://kit.scottelling.com/kit",
    tokenUrl: "https://kit.scottelling.com/r/tokens.json",
  },
  {
    id: "jade",
    label: "JADE",
    manifest: "registry/jade/registry.json",
    homepage: "https://kit.scottelling.com/kit/jade",
    tokenUrl: "https://kit.scottelling.com/r/jade/tokens.json",
  },
  {
    id: "os-kit",
    label: "OS",
    manifest: "registry/os/registry.json",
    homepage: "https://kit.scottelling.com/kit/os",
    tokenUrl: "https://kit.scottelling.com/r/os/tokens.json",
  },
  {
    id: "animation-studio",
    label: "Animation Studio",
    manifest: "registry/animation/registry.json",
    homepage: "https://kit.scottelling.com/kit/animation",
    tokenUrl: "https://kit.scottelling.com/r/animation/tokens.json",
  },
]

const manifests = new Map()
for (const system of systems) {
  const manifest = JSON.parse(await readFile(path.join(root, system.manifest), "utf8"))
  manifests.set(system.id, manifest)
}

const sharedLibrary = JSON.parse(await readFile(path.join(root, "lib", "purple-rain-library.json"), "utf8"))
const osLibrary = JSON.parse(await readFile(path.join(root, "lib", "os-library.json"), "utf8"))
const animationLibrary = JSON.parse(await readFile(path.join(root, "lib", "animation-library.json"), "utf8"))
const osPatterns = osLibrary.filter((item) => item.category === "OS Patterns")
const animationPatterns = animationLibrary.filter((item) => item.category === "Animation Patterns")
const universalLibrary = [...sharedLibrary, ...osPatterns, ...animationPatterns]

const names = universalLibrary.map((item) => item.name)
if (new Set(names).size !== names.length) throw new Error("Universal component names must be unique.")

const ownerItems = new Map()
for (const [systemId, manifest] of manifests) {
  for (const item of manifest.items.filter((entry) => entry.type === "registry:ui")) {
    const isOwnedOsPattern = systemId === "os-kit" && osPatterns.some((pattern) => pattern.name === item.name)
    const isOwnedAnimationPattern = systemId === "animation-studio" && animationPatterns.some((pattern) => pattern.name === item.name)
    if (!ownerItems.has(item.name) || isOwnedOsPattern || isOwnedAnimationPattern) {
      ownerItems.set(item.name, item)
    }
  }
}

for (const item of universalLibrary) {
  if (!ownerItems.has(item.name)) throw new Error(`No registry source exists for ${item.name}.`)
}

function plainDescription(description) {
  return description
    .replaceAll("Purple Rain", "the active visual system")
    .replaceAll("JADE", "the active visual system")
    .replaceAll("Animation Studio", "the active visual system")
    .replaceAll("OS Kit", "the active visual system")
}

for (const system of systems) {
  const current = manifests.get(system.id)
  const tokenItem = current.items.find((item) => item.name === "tokens")
  if (!tokenItem) throw new Error(`${system.label} is missing its token item.`)
  const currentItems = new Map(current.items.filter((item) => item.type === "registry:ui").map((item) => [item.name, item]))

  const items = universalLibrary.map((libraryItem) => {
    const source = currentItems.get(libraryItem.name) ?? ownerItems.get(libraryItem.name)
    return {
      ...source,
      name: libraryItem.name,
      title: `${system.label} ${libraryItem.title}`,
      description: plainDescription(libraryItem.description),
      registryDependencies: [system.tokenUrl],
    }
  })

  const registry = {
    $schema: current.$schema ?? schema,
    name: system.id,
    homepage: system.homepage,
    items: [tokenItem, ...items],
  }
  await writeFile(path.join(root, system.manifest), `${JSON.stringify(registry, null, 2)}\n`)
}

const systemCatalog = {
  version: "1.0.0",
  purpose: "One complete interface catalog that every visual kit can style without forcing unused layouts into a project.",
  installPolicy: {
    shared: "Available in every kit and used whenever the target product already needs the component.",
    specialty: "Available in every kit but installed only when the target product needs the pattern.",
    productLayout: "Owned by the product and never replaced automatically during a kit swap.",
  },
  systems: systems.map(({ id, label, homepage, tokenUrl }) => ({ id, label, homepage, tokenUrl, componentCount: universalLibrary.length })),
  layers: [
    {
      id: "shared",
      label: "Everyday interface pieces",
      count: sharedLibrary.length,
      categories: [...new Set(sharedLibrary.map((item) => item.category))],
      items: sharedLibrary.map((item) => item.name),
    },
    {
      id: "specialty",
      label: "Optional specialist patterns",
      count: osPatterns.length + animationPatterns.length,
      collections: [
        { owner: "os-kit", label: "OS workspaces", items: osPatterns.map((item) => item.name) },
        { owner: "animation-studio", label: "Creative workspaces", items: animationPatterns.map((item) => item.name) },
      ],
    },
    {
      id: "product-layout",
      label: "Product-owned screens and journeys",
      count: 0,
      items: [],
      note: "These remain in the target product. A visual kit may style them but never silently replaces them.",
    },
  ],
  promotionRule: [
    "Promote a new piece to the everyday catalog when its purpose is useful beyond one product.",
    "Keep product data, routes, and business behavior outside the component.",
    "Use semantic visual roles so every kit can style the same behavior.",
    "Complete keyboard, touch, responsive, loading, empty, error, success, disabled, and reduced-motion states before release.",
    "Reject any unclassified component so nothing becomes an accidental one-off.",
  ],
  items: universalLibrary.map((item) => ({
    ...item,
    scope: item.category === "OS Patterns" || item.category === "Animation Patterns" ? "specialty" : "shared",
    availableIn: systems.map((system) => system.id),
  })),
}

await writeFile(path.join(root, "lib", "universal-library.json"), `${JSON.stringify(universalLibrary, null, 2)}\n`)
await writeFile(path.join(root, "lib", "system-catalog.json"), `${JSON.stringify(systemCatalog, null, 2)}\n`)

console.log(`Generated one ${universalLibrary.length}-piece catalog across ${systems.length} visual systems; ${osPatterns.length + animationPatterns.length} specialist patterns remain opt-in.`)
