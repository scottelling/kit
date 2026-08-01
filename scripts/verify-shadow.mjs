import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const failures = []
const sourcePath = path.join(root, "registry", "shadow", "registry.json")
const outputPath = path.join(root, "public", "r", "shadow", "smooth-shadow.json")
const source = JSON.parse(await readFile(sourcePath, "utf8"))
const output = JSON.parse(await readFile(outputPath, "utf8"))
const item = source.items?.[0]

if (source.name !== "shadow") failures.push("Shadow registry name has drifted")
if (source.items?.length !== 1) failures.push(`Shadow registry has ${source.items?.length ?? 0} items instead of 1`)
if (item?.name !== "smooth-shadow") failures.push("Shadow installable item must be named smooth-shadow")
if (item?.type !== "registry:style") failures.push("Shadow installable item must be registry:style")

const expectedTheme = {
  "smooth-shadow-xs": "0 0 4px 0 rgba(0, 0, 0, 0.04)",
  "smooth-shadow-md": "0 17.54px 23.39px 0 rgba(0, 0, 0, 0.04), 0 9.4px 12.5px 0 rgba(0, 0, 0, 0.03), 0 5.25px 7px 0 rgba(0, 0, 0, 0.02), 0 2.79px 3.72px -2px rgba(0, 0, 0, 0.01), 0 1.16px 1.5px 0 rgba(0, 0, 0, 0.01)",
  "smooth-shadow-2xl": "0 60px 120px 0 rgba(0, 0, 0, 0.07), 0 30px 60px 0 rgba(0, 0, 0, 0.06), 0 15px 30px 0 rgba(0, 0, 0, 0.05), 0 7.5px 15px 0 rgba(0, 0, 0, 0.04), 0 3px 6px 0 rgba(0, 0, 0, 0.03)",
}

const theme = item?.cssVars?.theme ?? {}
if (Object.keys(theme).length !== 6) failures.push(`Shadow theme has ${Object.keys(theme).length} depths instead of 6`)
for (const [name, value] of Object.entries(expectedTheme)) {
  if (theme[name] !== value) failures.push(`${name} no longer matches the inspected source`)
}
if (item?.cssVars?.light?.["smooth-ring-color"] !== "rgba(0, 0, 0, 0.05)") failures.push("Light hairline value has drifted")
if (item?.cssVars?.dark?.["smooth-ring-color"] !== "rgba(255, 255, 255, 0.18)") failures.push("Dark hairline value has drifted")

const utilities = Object.keys(item?.css ?? {}).filter((key) => key.startsWith("@utility "))
if (utilities.length !== 16) failures.push(`Shadow registry has ${utilities.length} utilities instead of 16`)
for (const size of ["xs", "sm", "md", "lg", "xl", "2xl"]) {
  if (!utilities.includes(`@utility smooth-shadow-${size}`)) failures.push(`Missing smooth-shadow-${size}`)
  if (!utilities.includes(`@utility smooth-shadow-ring-${size}`)) failures.push(`Missing smooth-shadow-ring-${size}`)
}
if (!utilities.includes("@utility smooth-shadow")) failures.push("Missing default smooth-shadow alias")
if (!utilities.includes("@utility smooth-shadow-ring")) failures.push("Missing default smooth-shadow-ring alias")
if (!utilities.includes("@utility smooth-ring-*")) failures.push("Missing independent ring tint utility")

const licensePath = path.join(root, "registry", "shadow", "LICENSE")
const license = await readFile(licensePath, "utf8")
if (!license.includes("Copyright (c) 2026 Florian Kiem")) failures.push("Shadow MIT attribution is incomplete")
if (!item?.files?.some((file) => file.target === "LICENSE-smooth-shadow.txt")) failures.push("Shadow install does not carry its license")

if (!output.$schema) failures.push("Built Shadow item is missing its schema")
if (output.name !== "smooth-shadow" || output.type !== "registry:style") failures.push("Built Shadow item identity is incorrect")
if (!output.files?.some((file) => file.target === "LICENSE-smooth-shadow.txt" && file.content?.includes("Florian Kiem"))) failures.push("Built Shadow item does not include the MIT notice")

const showroom = await readFile(path.join(root, "app", "kit", "shadow", "shadow.css"), "utf8")
for (const value of Object.values(expectedTheme)) {
  const leadingLayer = value.split(", 0 ")[0]
  if (!showroom.includes(leadingLayer.replaceAll("rgba(0, 0, 0, 0.04)", "color-mix(in srgb, var(--shadow-ink) 4%, transparent)").replaceAll("rgba(0, 0, 0, 0.07)", "color-mix(in srgb, var(--shadow-ink) 7%, transparent)"))) {
    failures.push("Shadow showroom no longer reflects an inspected depth recipe")
  }
}

const banned = ["backdrop-filter", "backdrop-blur", "linear-gradient", "radial-gradient", "conic-gradient", "text-shadow", "transition-all"]
for (const term of banned) {
  if (showroom.includes(term)) failures.push(`Shadow showroom contains banned effect: ${term}`)
}

const skill = await readFile(path.join(root, "plugins", "purple-rain-studio", "skills", "apply-smooth-elevation", "SKILL.md"), "utf8")
if (skill.includes("TODO")) failures.push("Smooth Elevation skill contains a placeholder")
if (!skill.includes("smooth-shadow-ring-{size}")) failures.push("Smooth Elevation skill is missing the integrated-edge rule")

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log("Verified Shadow: exact six-depth source, 12 elevation recipes, independent tinting, light/dark hairlines, MIT delivery, showroom, and Studio skill.")
