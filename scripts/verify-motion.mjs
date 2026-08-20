import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const read = (file) => readFile(path.join(root, file), "utf8")
const failures = []
const library = JSON.parse(await read("lib/motion-library.json"))
const registry = JSON.parse(await read("registry/motion/registry.json"))
const page = await read("app/studio/motion/motion-studio.tsx")
const route = await read("app/studio/motion/page.tsx")
const styles = await read("app/studio/motion/motion.css")
const librarySource = await read("lib/motion-library.json")

if (library.length !== 5) failures.push(`Motion pilot has ${library.length} patterns instead of 5`)
if (registry.name !== "kit-motion") failures.push("Motion registry identity has drifted")
if (registry.items?.length !== library.length) failures.push("Motion library and registry counts disagree")

for (const item of library) {
  const registryItem = registry.items?.find((candidate) => candidate.name === item.id)
  if (!registryItem) {
    failures.push(`${item.title} is missing from the registry`)
    continue
  }
  if (registryItem.dependencies?.length) failures.push(`${item.title} adds an unexpected package dependency`)
  for (const extension of ["tsx", "css"]) {
    const sourcePath = `registry/motion/${item.id}.${extension}`
    const source = await read(sourcePath)
    const built = JSON.parse(await read(`public/r/motion/${item.id}.json`))
    if (!built.files?.some((file) => file.target === `components/ui/${item.id}.${extension}`)) failures.push(`${item.title} is missing its public ${extension} handoff`)
    if (extension === "css") {
      for (const blocked of ["transition: all", "scale(0)", "backdrop-filter", "linear-gradient", "radial-gradient", "text-shadow", "animation: infinite"]) {
        if (source.includes(blocked)) failures.push(`${item.title} contains blocked motion or decoration: ${blocked}`)
      }
      for (const required of ["prefers-reduced-motion", "focus-visible"]) {
        if (!source.includes(required)) failures.push(`${item.title} is missing ${required}`)
      }
      if (!/min-(?:height|width):\s*(?:44|5[2-9]|[6-9][0-9])px/u.test(source)) failures.push(`${item.title} has no touch target at or above 44 pixels`)
      for (const layoutProperty of ["transition: width", "transition: height", "transition: margin", "transition: padding", "transition: top", "transition: left"]) {
        if (source.includes(layoutProperty)) failures.push(`${item.title} animates layout through ${layoutProperty}`)
      }
    }
  }
}

for (const phrase of ["Motion Studio", "Refine the feel", "Less movement", "Undo", "Transitions.dev", ...library.map((item) => item.title)]) {
  if (!page.includes(phrase) && !styles.includes(phrase) && !librarySource.includes(phrase)) failures.push(`Motion Studio is missing “${phrase}”`)
}

for (const kit of ["Vanilla", "Purple Rain", "JADE", "OS", "Animation"]) {
  if (!page.includes(kit) && !route.includes(kit)) failures.push(`Motion Studio is missing the ${kit} kit choice`)
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log("Verified Motion Studio: five shared patterns, kit switching, tactile refinement, public handoffs, source credit, 44-pixel controls, GPU-only movement, visible focus, and reduced motion.")
