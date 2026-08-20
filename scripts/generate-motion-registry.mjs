import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const library = JSON.parse(await readFile(path.join(root, "lib/motion-library.json"), "utf8"))

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "kit-motion",
  homepage: "https://kit.scottelling.com/studio/motion",
  items: library.map((item) => ({
    name: item.id,
    type: "registry:ui",
    title: item.title,
    description: item.plain,
    author: "Scott E. Telling; source study credited to Transitions.dev by Jakub Antalik",
    categories: ["Motion", item.category, "Kit shared"],
    files: [
      {
        path: `registry/motion/${item.id}.tsx`,
        type: "registry:ui",
        target: `components/ui/${item.id}.tsx`,
      },
      {
        path: `registry/motion/${item.id}.css`,
        type: "registry:file",
        target: `components/ui/${item.id}.css`,
      },
    ],
    docs: `This Kit-owned implementation inherits the active visual system through semantic variables. It adds no visual kit and no package dependency. Keep visible focus, 44-pixel controls, asymmetric timing, and the reduced-motion behavior. Source study: ${item.source} at https://transitions.dev/.`,
  })),
}

await writeFile(path.join(root, "registry/motion/registry.json"), `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Generated Motion registry: ${library.length} shared, kit-neutral patterns.`)
