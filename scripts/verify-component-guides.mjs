import { readFile, stat } from "node:fs/promises"
import path from "node:path"

import { catalogMarkdown, guideMarkdown } from "./component-guide-format.mjs"

const root = process.cwd()
const failures = []
const universal = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))
const catalog = JSON.parse(await readFile(path.join(root, "lib", "component-guides.json"), "utf8"))
const systemCatalog = JSON.parse(await readFile(path.join(root, "lib", "system-catalog.json"), "utf8"))
const css = await readFile(path.join(root, "app", "studio", "guides", "guides.css"), "utf8")
const ui = await readFile(path.join(root, "app", "studio", "guides", "guide-library.tsx"), "utf8")
const skill = await readFile(path.join(root, "plugins", "purple-rain-studio", "skills", "apply-kit-component-guides", "SKILL.md"), "utf8")
const reference = await readFile(path.join(root, "plugins", "purple-rain-studio", "skills", "apply-kit-component-guides", "references", "component-guides.md"), "utf8")

if (catalog.format !== "kit-component-guides/1") failures.push("The component guide format has drifted.")
if (catalog.count !== universal.length || catalog.items.length !== universal.length) failures.push(`Expected ${universal.length} guides, found ${catalog.items.length}.`)
if (new Set(catalog.items.map((guide) => guide.name)).size !== catalog.items.length) failures.push("Component guide names are not unique.")

const universalNames = universal.map((item) => item.name).sort()
const guideNames = catalog.items.map((item) => item.name).sort()
if (JSON.stringify(universalNames) !== JSON.stringify(guideNames)) failures.push("The component guide catalog does not match the universal component catalog.")
if (systemCatalog.guideCatalog !== "https://kit.scottelling.com/r/guides/catalog.json") failures.push("The public system catalog cannot discover the guides.")
for (const item of systemCatalog.items) {
  if (item.guide !== `https://kit.scottelling.com/r/guides/${item.name}.json`) failures.push(`${item.name} is not connected to its guide in the system catalog.`)
}

const requiredFields = catalog.contract?.requiredFields ?? []
for (const guide of catalog.items) {
  for (const field of requiredFields) {
    const value = guide[field]
    if (value === undefined || value === null || (Array.isArray(value) && !value.length) || value === "") failures.push(`${guide.name} is missing ${field}.`)
  }
  if (guide.systems?.length !== catalog.systems.length) failures.push(`${guide.name} is not connected to every complete system.`)
  if (!guide.events?.every((event) => /^[A-Z][A-Z_]*$/u.test(event))) failures.push(`${guide.name} has an event that is not a named verb.`)
  if (!guide.prompt?.includes("44-pixel controls") || !guide.prompt.includes("visible focus") || !guide.prompt.includes("reduced-motion")) failures.push(`${guide.name} has an incomplete project request.`)
  if (!guide.proof?.some((item) => item.includes("320")) || !guide.proof.some((item) => item.includes("failure"))) failures.push(`${guide.name} has incomplete release proof.`)
  for (const system of guide.systems ?? []) {
    if (!system.component.endsWith(`/${guide.name}.json`)) failures.push(`${guide.name} has a broken ${system.label} component handoff.`)
  }

  const publicJsonPath = path.join(root, "public", "r", "guides", `${guide.name}.json`)
  const publicMarkdownPath = path.join(root, "public", "r", "guides", `${guide.name}.md`)
  try {
    const publicGuide = JSON.parse(await readFile(publicJsonPath, "utf8"))
    if (JSON.stringify(publicGuide) !== JSON.stringify(guide)) failures.push(`${guide.name} public JSON has drifted.`)
    const markdown = await readFile(publicMarkdownPath, "utf8")
    if (markdown !== guideMarkdown(guide)) failures.push(`${guide.name} public guide has drifted.`)
  } catch {
    failures.push(`${guide.name} public handoff is missing.`)
  }
}

const uploadGuide = catalog.items.find((guide) => guide.name === "file-upload")
for (const event of ["UPDATE_PROGRESS", "CANCEL", "CANCELLED", "RETRY"]) {
  if (!uploadGuide?.events.includes(event)) failures.push(`File Upload is missing ${event}.`)
}
for (const state of ["uploading", "cancelled", "failed", "success"]) {
  if (!uploadGuide?.states.includes(state)) failures.push(`File Upload is missing ${state}.`)
}
if (!uploadGuide?.proof.some((item) => item.includes("late completion"))) failures.push("File Upload does not prove the abort race.")
const progressGuide = catalog.items.find((guide) => guide.name === "progress")
if (!progressGuide?.events.includes("UPDATE_PROGRESS") || progressGuide?.useWhen[0]?.includes("select")) failures.push("Progress is still described as a form choice instead of read-only status.")

if (catalog.sourceStudy?.license !== "MIT" || catalog.sourceStudy?.url !== "https://github.com/OpenLabs-so/oa-design") failures.push("oa-design provenance is incomplete.")
for (const boundary of ["Glass header", "Sub-44-pixel controls", "Required Motion dependency", "Incomplete twelve-component scope"]) {
  if (!catalog.sourceStudy?.rejected?.includes(boundary)) failures.push(`The source boundary no longer rejects ${boundary}.`)
}

if (reference !== catalogMarkdown(catalog)) failures.push("The bundled agent reference is not generated from the public catalog.")
for (const phrase of ["correctly labelled native file input", "late completion from an aborted request", "retry cannot create an unintended duplicate", "privacy, storage, logging"]) {
  if (!reference.includes(phrase)) failures.push(`The agent reference is missing component-specific File Upload proof: ${phrase}.`)
}
for (const phrase of ["routes, content, data, permissions", "state machine", "No state-machine dependency", "Do not turn the entire app into one machine"]) {
  if (!skill.includes(phrase)) failures.push(`The agent skill is missing: ${phrase}.`)
}
for (const phrase of ["Use it when", "What can happen", "What people can see", "Kit takes care of", "The product still decides", "Use in a project", "Take this guide"]) {
  if (!ui.includes(phrase)) failures.push(`The visual guide room is missing: ${phrase}.`)
}
for (const phrase of ["min-height: 2.75rem", "grid-template-columns: repeat(2, minmax(0, 1fr))", "prefers-reduced-motion"]) {
  if (!css.includes(phrase)) failures.push(`The guide room lost its tactile or responsive rule: ${phrase}.`)
}
for (const forbidden of ["backdrop-filter", "linear-gradient", "radial-gradient", "animation-iteration-count: infinite"]) {
  if (css.includes(forbidden)) failures.push(`The guide room introduces forbidden presentation: ${forbidden}.`)
}

for (const file of [
  "public/r/guides/catalog.json",
  "public/r/guides/all.md",
  "public/r/guides/install/registry.json",
  "public/r/guides/install/kit-component-guides.json",
  "registry/guides/KIT-COMPONENT-GUIDES.md",
  "registry/guides/registry.json",
  "app/studio/guides/page.tsx",
]) {
  try { await stat(path.join(root, file)) } catch { failures.push(`${file} is missing.`) }
}

if (failures.length) {
  console.error(`Component guide verification failed (${failures.length}):`)
  console.error(failures.map((failure) => `  - ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified ${catalog.items.length} component guides: exact universal coverage, named events, visible states, ownership boundaries, complete-system handoffs, public JSON and plain-language files, installable guide, reusable agent skill, tactile Studio room, and oa-design source boundary.`)
