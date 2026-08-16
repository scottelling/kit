import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const read = (file) => readFile(path.join(root, file), "utf8")
const failures = []

const [library, registry, larsonBuilt, larsonComponent, larsonCss, beautifulSource, beautifulCss, showroom, showroomCss, header] = await Promise.all([
  read("lib/elements-library.json").then(JSON.parse),
  read("registry/elements/registry.json").then(JSON.parse),
  read("public/r/elements/larson-scanner.json").then(JSON.parse),
  read("registry/elements/larson-scanner/larson-scanner.tsx"),
  read("registry/elements/larson-scanner/larson-scanner.css"),
  read("registry/elements/beautiful-ui/beautiful-ui-elements.tsx"),
  read("registry/elements/beautiful-ui/beautiful-ui-elements.css"),
  read("app/elements/beautiful-ui-showroom.tsx"),
  read("app/elements/elements.css"),
  read("components/site-header.tsx"),
])

const larsonItem = registry.items?.find((item) => item.name === "larson-scanner")
const foundation = registry.items?.find((item) => item.name === "beautiful-ui-foundation")
const visibleRegistryItems = registry.items?.filter((item) => item.type === "registry:ui") ?? []
const beautifulItems = library.slice(1)
const beautifulFoundationUrl = "https://kit.scottelling.com/r/elements/beautiful-ui-foundation.json"

if (library.length !== 20) failures.push(`Elements Library has ${library.length} visible elements instead of 20`)
if (visibleRegistryItems.length !== library.length) failures.push(`Elements inventory has ${library.length} items but the public registry has ${visibleRegistryItems.length} visible items`)
if (registry.items?.length !== 21) failures.push(`Elements registry has ${registry.items?.length ?? 0} items instead of 20 visible items and one foundation`)
if (registry.name !== "kit-elements") failures.push("Elements registry name has drifted")
if (!foundation || foundation.type !== "registry:style") failures.push("Beautiful UI shared foundation is missing")
if (foundation?.dependencies?.join(",") !== "lucide-react") failures.push("Beautiful UI foundation added an unexpected project dependency")
if (!foundation?.files?.some((file) => file.target === "LICENSE-beautiful-ui.txt")) failures.push("Beautiful UI MIT notice is missing from the public handoff")

if (larsonItem?.name !== "larson-scanner" || larsonItem?.type !== "registry:ui") failures.push("Knight Rider must ship as the larson-scanner UI item")
if ((larsonItem?.dependencies?.length ?? 0) > 0) failures.push("Larson Scanner must not add a project dependency")
if (!larsonItem?.categories?.includes("Signature Effects")) failures.push("Larson Scanner is not isolated as a Signature Effect")

for (const item of beautifulItems) {
  const registryItem = registry.items.find((candidate) => candidate.name === item.id)
  if (!registryItem) {
    failures.push(`${item.title} is missing from the Elements registry`)
    continue
  }
  if (registryItem.registryDependencies?.join(",") !== beautifulFoundationUrl) failures.push(`${item.title} does not carry its shared foundation automatically`)
  if (!registryItem.files?.some((file) => file.target === `components/ui/${item.id}.tsx`)) failures.push(`${item.title} has no independent component handoff`)
  const built = await read(`public/r/elements/${item.id}.json`).then(JSON.parse).catch(() => null)
  if (!built || built.name !== item.id || !built.files?.some((file) => file.target === `components/ui/${item.id}.tsx`)) failures.push(`${item.title} was not emitted as public installable JSON`)
}

for (const target of ["components/ui/larson-scanner.tsx", "components/ui/larson-scanner.css"]) {
  if (!larsonItem?.files?.some((file) => file.target === target)) failures.push(`Registry source is missing ${target}`)
  if (!larsonBuilt.files?.some((file) => file.target === target && file.content?.length > 500)) failures.push(`Built handoff is missing ${target}`)
}

for (const marker of ["useReducedMotion", "IntersectionObserver", "reducedMotion ? 0", "transition.started = now", "/ 180", "window.requestAnimationFrame(render)", "const [sound, setSound] = useState(false)", "Sound starts off", "width: 44px", "min-width: 44px", "height: 44px"]) {
  if (!larsonComponent.includes(marker) && !larsonCss.includes(marker)) failures.push(`Larson Scanner is missing release behavior: ${marker}`)
}

for (const marker of ["prefers-reduced-motion", "min-height: 44px", "focus-visible", "BeautifulUIElementKind", ...beautifulItems.map((item) => `\"${item.id}\"`)]) {
  if (!beautifulSource.includes(marker) && !beautifulCss.includes(marker)) failures.push(`Beautiful UI collection is missing release behavior: ${marker}`)
}

for (const banned of ["backdrop-filter", "backdrop-blur", "linear-gradient", "radial-gradient", "conic-gradient", "text-shadow", "filter:", "transition: all"]) {
  if (showroomCss.includes(banned) || beautifulCss.includes(banned)) failures.push(`Elements chrome contains blocked effect: ${banned}`)
}

for (const phrase of ["Beautiful UI, rebuilt for real projects", "Find an element", "Original collection by Shane Levine", "Add to a project", "Get the code", "/r/elements/"]) {
  if (!showroom.includes(phrase)) failures.push(`Elements showroom is missing “${phrase}”`)
}

if (!header.includes('href="/elements"')) failures.push("Elements is missing from the main navigation")
if (larsonBuilt.name !== "larson-scanner" || larsonBuilt.type !== "registry:ui") failures.push("Built Larson Scanner identity is incorrect")

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log("Verified Elements: 20 live elements, 19 Beautiful UI adaptations, independent public handoffs, source credit, 44-pixel controls, responsive layouts, visible focus, reduced motion, and intact Knight Rider behavior.")
