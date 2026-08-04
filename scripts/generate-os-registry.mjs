import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const purple = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"))
const sharedLibrary = JSON.parse(await readFile(path.join(root, "lib", "purple-rain-library.json"), "utf8"))
const tokenSource = JSON.parse(await readFile(path.join(root, "lib", "os-tokens.json"), "utf8"))
const tokenUrl = "https://kit.scottelling.com/r/os/tokens.json"

const nativeItems = [
  ["desktop-shell", "Desktop Shell", "A complete desktop work surface with regions for the menu bar, working windows, widgets, and dock."],
  ["window-shell", "Window Shell", "A solid, resizable-window frame with clear title, actions, content, and status regions."],
  ["menu-bar", "Menu Bar", "A calm global bar that keeps the current place and useful system status visible."],
  ["dock", "Dock", "A reachable app launcher with an unmistakable current destination and 44-pixel targets."],
  ["widget-shell", "Widget Shell", "A measured small surface that shows the most useful state without clipping or decorative motion."],
  ["master-detail", "Master Detail", "A shared-state list and detail pattern that becomes a real back-driven phone flow."],
  ["split-view", "Split View", "A sturdy multi-panel workspace that collapses by priority instead of squeezing content."],
  ["command-bar", "Command Bar", "A plain-language action entry with honest results, keyboard control, and recovery."],
  ["settings-sheet", "Settings Sheet", "A focused settings surface with tabs, stable fields, visible state, and a full-screen phone form."],
].map(([name, title, description]) => ({
  name,
  type: "registry:ui",
  title: `OS ${title}`,
  description,
  registryDependencies: [tokenUrl],
  files: [{ path: `registry/os/patterns/${name}.tsx`, type: "registry:ui" }],
}))

function cssVariables(values) {
  return Object.fromEntries(Object.entries(values).map(([name, value]) => [`--${name}`, value]))
}

const tokenItem = {
  name: "tokens",
  type: "registry:theme",
  title: "OS Tokens",
  description: "The OS visual language rebuilt in OKLCH with solid surfaces, five theme moods, 44-pixel controls, complete states, and portable semantic roles.",
  cssVars: {
    theme: tokenSource.theme,
    light: tokenSource.light,
    dark: tokenSource.dark,
  },
  css: {
    ":root": cssVariables(tokenSource.light),
    ".dark": cssVariables(tokenSource.dark),
    ".os-theme-daylight": cssVariables(tokenSource.light),
    ".os-theme-default": cssVariables(tokenSource.dark),
    ".os-theme-hacker": cssVariables(tokenSource.presets.hacker),
    ".os-theme-ethereal": cssVariables(tokenSource.presets.ethereal),
    ".os-theme-paper": cssVariables(tokenSource.presets.paper),
  },
}

const sharedItems = purple.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => ({
    ...item,
    title: item.title.replace(/^Purple Rain /, "OS "),
    description: item.description.replaceAll("Purple Rain", "OS"),
    registryDependencies: [tokenUrl],
  }))

if (sharedItems.length !== sharedLibrary.length) {
  throw new Error(`OS shared library mismatch: ${sharedItems.length} registry items and ${sharedLibrary.length} counted pieces.`)
}

const osLibrary = [
  ...sharedLibrary,
  ...nativeItems.map((item) => ({
    name: item.name,
    title: item.title.replace(/^OS /, ""),
    category: "OS Patterns",
    description: item.description,
    preview: item.name,
  })),
]

const registry = {
  $schema: purple.$schema,
  name: "os-kit",
  homepage: "https://kit.scottelling.com/kit/os",
  items: [tokenItem, ...sharedItems, ...nativeItems],
}

await mkdir(path.join(root, "registry", "os"), { recursive: true })
await writeFile(path.join(root, "registry", "os", "registry.json"), `${JSON.stringify(registry, null, 2)}\n`)
await writeFile(path.join(root, "lib", "os-library.json"), `${JSON.stringify(osLibrary, null, 2)}\n`)

console.log(`Generated OS registry with ${sharedItems.length} shared pieces and ${nativeItems.length} OS-native patterns.`)
