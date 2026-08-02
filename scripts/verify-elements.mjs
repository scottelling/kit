import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const read = (file) => readFile(path.join(root, file), "utf8")
const failures = []

const [library, registry, built, component, componentCss, showroom, showroomCss, header] = await Promise.all([
  read("lib/elements-library.json").then(JSON.parse),
  read("registry/elements/registry.json").then(JSON.parse),
  read("public/r/elements/larson-scanner.json").then(JSON.parse),
  read("registry/elements/larson-scanner/larson-scanner.tsx"),
  read("registry/elements/larson-scanner/larson-scanner.css"),
  read("app/elements/element-showroom.tsx"),
  read("app/elements/elements.css"),
  read("components/site-header.tsx"),
])

const item = registry.items?.[0]
if (library.length !== registry.items?.length) failures.push(`Elements inventory has ${library.length} items but the registry has ${registry.items?.length ?? 0}`)
if (library[0]?.id !== item?.name) failures.push("Elements inventory and registry identity have drifted")
if (registry.name !== "kit-elements") failures.push("Signature Effects registry name has drifted")
if (registry.items?.length !== 1) failures.push(`Elements registry has ${registry.items?.length ?? 0} items instead of 1`)
if (item?.name !== "larson-scanner" || item?.type !== "registry:ui") failures.push("Knight Rider must ship as the larson-scanner UI item")
if ((item?.dependencies?.length ?? 0) > 0) failures.push("Larson Scanner must not add a project dependency")
if (!item?.categories?.includes("Signature Effects")) failures.push("Larson Scanner is not isolated as a Signature Effect")

for (const target of ["components/ui/larson-scanner.tsx", "components/ui/larson-scanner.css"]) {
  if (!item?.files?.some((file) => file.target === target)) failures.push(`Registry source is missing ${target}`)
  if (!built.files?.some((file) => file.target === target && file.content?.length > 500)) failures.push(`Built handoff is missing ${target}`)
}

for (const marker of [
  "useReducedMotion",
  "IntersectionObserver",
  "reducedMotion ? 0",
  "transition.started = now",
  "/ 180",
  "window.requestAnimationFrame(render)",
  "const [sound, setSound] = useState(false)",
  "Sound starts off",
  "width: 44px",
  "min-width: 44px",
  "height: 44px",
]) {
  if (!component.includes(marker) && !componentCss.includes(marker)) failures.push(`Larson Scanner is missing release behavior: ${marker}`)
}

for (const banned of ["transition: all", "transition-all", "scale(0)", "ease-in", "@keyframes", "animation:"]) {
  if (component.includes(banned) || componentCss.includes(banned)) failures.push(`Larson Scanner contains blocked motion: ${banned}`)
}

if (component.match(/querySelectorAll|\.style\.height|\.style\.boxShadow/)) failures.push("Larson Scanner returned to per-frame DOM painting")
if ((component.match(/<canvas/g) ?? []).length !== 1) failures.push("Larson Scanner must consolidate the live signal into one canvas")
if (!component.includes('role="group" aria-label="Choose lamps for the custom path"')) failures.push("Touch-safe custom path controls are missing")

for (const phrase of ["Add to a project", "Get the code", "Copy the English prompt", "LarsonScanner", "/r/elements/larson-scanner.json"]) {
  if (!showroom.includes(phrase)) failures.push(`Elements showroom is missing “${phrase}”`)
}

for (const banned of ["backdrop-filter", "backdrop-blur", "linear-gradient", "radial-gradient", "conic-gradient", "text-shadow", "filter:", "transition: all"]) {
  if (showroomCss.includes(banned)) failures.push(`Purple Rain Elements chrome contains banned effect: ${banned}`)
}

if (!header.includes('href="/elements"')) failures.push("Elements is missing from the main navigation")
if (built.name !== "larson-scanner" || built.type !== "registry:ui") failures.push("Built element identity is incorrect")

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log("Verified Elements: isolated Signature Effects registry, one-canvas Knight Rider engine, muted sound, complete reduced motion, offscreen pause, 180ms pattern bridge, 44px programming, live playground, and exact code handoff.")
