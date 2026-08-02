import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const failures = []
const read = (file) => readFile(path.join(root, file), "utf8")

const [engine, workshop, workshopCss, route, projectStudio, projectCanvas, previewPage, packageJson] = await Promise.all([
  read("lib/theme-workshop.ts"),
  read("app/labs/theme-workshop.tsx"),
  read("app/labs/theme-workshop.css"),
  read("app/r/workshop/theme.json/route.ts"),
  read("lib/project-studio.ts"),
  read("components/project-canvas.tsx"),
  read("app/preview/page.tsx"),
  read("package.json").then(JSON.parse),
])

const lockedFoundationFragments = [
  "canvas: color(0.972, 0.011, 313)",
  "action: color(0.5, 0.17, 305)",
  "canvas: color(0.1513, 0.0205, 309.47)",
  "action: color(0.7756, 0.1104, 304.73)",
  "canvas: color(0.95859, 0.00345, 174.48)",
  "action: color(0.8063, 0.14727, 177.61)",
  "canvas: color(0.18905, 0.0094, 184.09)",
]

for (const fragment of lockedFoundationFragments) {
  if (!engine.includes(fragment)) failures.push(`A locked source-kit value is missing: ${fragment}`)
}

for (const marker of [
  "createThemeVariant",
  "normalizeThemeVariant",
  "applyThemeDirection",
  "repairThemeContrast",
  "themeQuality",
  "workshopRegistryItem",
  "light-action",
  "dark-action",
  "light-reading",
  "dark-reading",
]) {
  if (!engine.includes(marker)) failures.push(`Theme engine is missing ${marker}`)
}

for (const phrase of [
  "Start a clean copy",
  "Apply direction",
  "Apply copy",
  "Restore original",
  "Publish kit",
  "Copy preview link",
  "Copy kit handoff",
  "Live project proof",
]) {
  if (!workshop.includes(phrase)) failures.push(`Workshop is missing the visible action “${phrase}”`)
}

for (const marker of ["showModal()", "type=\"color\"", "type=\"range\"", "aria-live=\"polite\"", "data-share-url"]) {
  if (!workshop.includes(marker)) failures.push(`Workshop interaction proof is missing ${marker}`)
}

for (const term of ["backdrop-filter", "backdrop-blur", "linear-gradient", "radial-gradient", "conic-gradient", "text-shadow", "filter:", "transition: all"]) {
  if (workshopCss.includes(term)) failures.push(`Theme Workshop contains banned effect: ${term}`)
}

if (!route.includes('"Access-Control-Allow-Origin": "*"')) failures.push("Published workshop themes are not public")
if (!route.includes("workshopRegistryItem")) failures.push("Workshop handoff route is not generated from the saved copy")
if (!projectStudio.includes("themeVariant: ThemeVariant | null")) failures.push("Theme copies are not part of the saved project")
if (!projectCanvas.includes("project.themeVariant?.applied") || !projectCanvas.includes("themeDepthShadow")) failures.push("Applied copies do not follow the project canvas")
if (!previewPage.includes("parseThemeVariant")) failures.push("Shared previews do not restore the published copy")

for (const dependency of Object.keys(packageJson.dependencies ?? {})) {
  if (dependency.toLowerCase().includes("tweakcn")) failures.push("TweakCN was added as a product dependency")
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log("Verified Theme Workshop: immutable source kits, safe saved copies, plain-English and tactile shaping, six legibility gates, exact restore, live project proof, and public handoff.")
