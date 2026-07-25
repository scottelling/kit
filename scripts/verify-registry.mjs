import { readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const items = ["tokens", "button", "card", "input", "badge", "dialog"]
const tokenUrl = "https://kit.scottelling.com/r/tokens.json"
const failures = []

for (const item of ["registry", ...items]) {
  const file = path.join(root, "public", "r", `${item}.json`)
  try {
    const data = JSON.parse(await readFile(file, "utf8"))
    if (!data.$schema) failures.push(`${item}.json is missing $schema`)
  } catch (error) {
    failures.push(`${item}.json is missing or invalid: ${error.message}`)
  }
}

const source = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"))
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
  if (tokenItem.css?.[":root"]?.["--primary"] !== tokenItem.cssVars?.light?.primary) {
    failures.push("tokens CSS fallback does not override the consumer light primary variable")
  }
  if (tokenItem.css?.[".dark"]?.["--primary"] !== tokenItem.cssVars?.dark?.primary) {
    failures.push("tokens CSS fallback does not override the consumer dark primary variable")
  }
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
    if (tokenItem.cssVars?.theme?.[name] !== value) {
      failures.push(`tokens canonical foundation ${name} is missing or incorrect`)
    }
  }
}

for (const item of source.items.filter((item) => item.type === "registry:ui")) {
  if (!item.registryDependencies?.includes(tokenUrl)) {
    failures.push(`${item.name} does not depend on the live tokens item`)
  }
}

const banned = ["backdrop-filter", "backdrop-blur", "transition-all", "bg-gradient", "text-transparent"]
for (const relative of ["tokens.css", ...items.filter((item) => item !== "tokens").map((item) => `registry/purple-rain/${item}.tsx`)]) {
  const file = path.join(root, relative)
  await stat(file)
  const contents = await readFile(file, "utf8")
  for (const term of banned) {
    if (contents.includes(term)) failures.push(`${relative} contains banned effect: ${term}`)
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified ${items.length} Purple Rain items, dependency chaining, OKLCH themes, and effect constraints.`)
