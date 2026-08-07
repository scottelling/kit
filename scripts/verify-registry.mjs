import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const tokenUrl = "https://kit.scottelling.com/r/tokens.json"
const jadeTokenUrl = "https://kit.scottelling.com/r/jade/tokens.json"
const failures = []
const library = JSON.parse(await readFile(path.join(root, "lib", "purple-rain-library.json"), "utf8"))
const universal = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))
const source = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"))
const jadeSource = JSON.parse(await readFile(path.join(root, "registry", "jade", "registry.json"), "utf8"))
const registryItems = source.items.filter((item) => item.type === "registry:ui")
const libraryNames = new Set(library.map((item) => item.name))
const universalNames = new Set(universal.map((item) => item.name))
const registryNames = new Set(registryItems.map((item) => item.name))

if (library.length !== 138) failures.push(`library contains ${library.length} components instead of 138`)
if (libraryNames.size !== 138) failures.push("library component names are not unique")
if (new Set(library.map((item) => item.category)).size !== 8) failures.push("library does not contain exactly 8 families")
if (universalNames.size !== universal.length) failures.push("universal component names are not unique")
if (registryItems.length !== universal.length) failures.push(`registry contains ${registryItems.length} UI items instead of ${universal.length}`)

for (const name of universalNames) {
  if (!registryNames.has(name)) failures.push(`${name} is missing from registry.json`)
}
for (const name of registryNames) {
  if (!universalNames.has(name)) failures.push(`${name} is not present in the universal library source of truth`)
}

const emittedNames = ["registry", "tokens", ...universal.map((item) => item.name)]
for (const name of emittedNames) {
  const file = path.join(root, "public", "r", `${name}.json`)
  try {
    const data = JSON.parse(await readFile(file, "utf8"))
    if (!data.$schema) failures.push(`${name}.json is missing $schema`)
  } catch (error) {
    failures.push(`${name}.json is missing or invalid: ${error.message}`)
  }
}

const jadeRegistryItems = jadeSource.items.filter((item) => item.type === "registry:ui")
if (jadeRegistryItems.length !== universal.length) failures.push(`JADE registry contains ${jadeRegistryItems.length} UI items instead of ${universal.length}`)
for (const item of jadeRegistryItems) {
  if (!universalNames.has(item.name)) failures.push(`${item.name} is not present in the universal library source of truth`)
  if (!item.registryDependencies?.includes(jadeTokenUrl)) failures.push(`JADE ${item.name} does not depend on the live JADE tokens item`)
}
for (const name of emittedNames) {
  const file = path.join(root, "public", "r", "jade", `${name}.json`)
  try {
    const data = JSON.parse(await readFile(file, "utf8"))
    if (!data.$schema) failures.push(`jade/${name}.json is missing $schema`)
  } catch (error) {
    failures.push(`jade/${name}.json is missing or invalid: ${error.message}`)
  }
}

const tokenItem = source.items.find((item) => item.name === "tokens")
if (!tokenItem) {
  failures.push("tokens item is missing")
} else {
  for (const mode of ["light", "dark"]) {
    const values = Object.values(tokenItem.cssVars?.[mode] ?? {})
    if (values.length === 0) failures.push(`tokens ${mode} variables are missing`)
    const colorValues = values.filter((value) => typeof value === "string" && value.startsWith("oklch("))
    if (colorValues.length < 10) failures.push(`tokens ${mode} does not contain the expected OKLCH palette`)
  }
  if (tokenItem.css?.[":root"]?.["--primary"] !== tokenItem.cssVars?.light?.primary) failures.push("tokens CSS fallback does not override the consumer light primary variable")
  if (tokenItem.css?.[".dark"]?.["--primary"] !== tokenItem.cssVars?.dark?.primary) failures.push("tokens CSS fallback does not override the consumer dark primary variable")
  const canonicalFoundations = {
    "pr-compact-size": "12px",
    "pr-body-size": "15px",
    "pr-control-size": "14px",
    "pr-heading-size": "38px",
    "pr-space-base": "12px",
    "pr-space-section": "32px",
    "pr-control-height": "44px",
    "pr-fast": "120ms",
    "pr-standard": "180ms",
  }
  for (const [name, value] of Object.entries(canonicalFoundations)) {
    if (tokenItem.cssVars?.theme?.[name] !== value) failures.push(`tokens canonical foundation ${name} is missing or incorrect`)
  }
}


const jadeTokenItem = jadeSource.items.find((item) => item.name === "tokens")
if (!jadeTokenItem) {
  failures.push("JADE tokens item is missing")
} else {
  for (const mode of ["light", "dark"]) {
    const values = Object.values(jadeTokenItem.cssVars?.[mode] ?? {})
    const colorValues = values.filter((value) => typeof value === "string" && value.startsWith("oklch("))
    if (colorValues.length < 10) failures.push(`JADE tokens ${mode} does not contain the expected OKLCH palette`)
  }
  if (jadeTokenItem.css?.[":root"]?.["--primary"] !== jadeTokenItem.cssVars?.light?.primary) failures.push("JADE tokens CSS fallback does not override the consumer light primary variable")
  if (jadeTokenItem.css?.[".dark"]?.["--primary"] !== jadeTokenItem.cssVars?.dark?.primary) failures.push("JADE tokens CSS fallback does not override the consumer dark primary variable")
}

const sourcePaths = new Set()
const handOwnedNames = new Set(["button", "card", "input", "badge", "dialog", "application-shell", "workspace-tree", "viewer-shell", "editor-toolbar", "task-board", "task-rail", "status-bar", "mobile-app-nav", "terminal-surface", "document-surface"])
for (const item of registryItems) {
  if (!item.registryDependencies?.includes(tokenUrl)) failures.push(`${item.name} does not depend on the live tokens item`)
  if (!item.files?.length) failures.push(`${item.name} has no source file`)
  for (const file of item.files ?? []) {
    if (sourcePaths.has(file.path)) failures.push(`${file.path} is shared by more than one registry item`)
    sourcePaths.add(file.path)
    try {
      await stat(path.join(root, file.path))
      if (libraryNames.has(item.name) && !handOwnedNames.has(item.name)) {
        const contents = await readFile(path.join(root, file.path), "utf8")
        if (!contents.includes("children !== undefined")) failures.push(`${item.name} is still a fixed specimen instead of a composable component`)
      }
    } catch {
      failures.push(`${item.name} source file is missing: ${file.path}`)
    }
  }
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await sourceFiles(absolute))
    else if (/\.(css|tsx)$/.test(entry.name)) files.push(absolute)
  }
  return files
}

const banned = ["backdrop-filter", "backdrop-blur", "transition-all", "bg-gradient", "text-transparent", "linear-gradient", "radial-gradient", "conic-gradient", "text-shadow"]
const effectFiles = [
  path.join(root, "tokens.css"),
  ...await sourceFiles(path.join(root, "registry", "purple-rain")),
  ...await sourceFiles(path.join(root, "app", "kit")),
  ...await sourceFiles(path.join(root, "app", "demo")),
]

for (const file of effectFiles) {
  const contents = await readFile(file, "utf8")
  const relative = path.relative(root, file)
  for (const term of banned) {
    if (contents.includes(term)) failures.push(`${relative} contains banned effect: ${term}`)
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified ${universal.length} components across Purple Rain and JADE: ${library.length} everyday pieces plus ${universal.length - library.length} opt-in specialist patterns, automatic tokens, public files, OKLCH themes, and effect constraints.`)
