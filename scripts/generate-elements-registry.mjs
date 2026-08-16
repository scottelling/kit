import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const library = JSON.parse(await readFile(path.join(root, "lib/elements-library.json"), "utf8"))
const beautifulItems = library.slice(1)

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "kit-elements",
  homepage: "https://kit.scottelling.com/elements",
  items: [
    {
      name: "larson-scanner",
      type: "registry:ui",
      title: "Knight Rider — Larson Scanner",
      description: library[0].description,
      author: "Scott E. Telling",
      categories: ["Signature Effects", "Motion", "Interactive"],
      files: [
        { path: "registry/elements/larson-scanner/larson-scanner.tsx", type: "registry:ui", target: "components/ui/larson-scanner.tsx" },
        { path: "registry/elements/larson-scanner/larson-scanner.css", type: "registry:file", target: "components/ui/larson-scanner.css" },
      ],
      docs: "Import LarsonScanner from your components/ui folder. Sound starts muted. The canvas freezes every time-based effect for reduced motion and pauses when the element is offscreen. The purpose-built light belongs inside the scanner frame; do not spread its glow into surrounding product chrome.",
    },
    {
      name: "beautiful-ui-foundation",
      type: "registry:style",
      title: "Beautiful UI Elements Foundation",
      description: "The shared responsive, accessible foundation for Kit's adapted Beautiful UI elements.",
      author: "Shane Levine; adapted by Scott E. Telling",
      dependencies: ["lucide-react"],
      categories: ["Elements Foundation"],
      files: [
        { path: "registry/elements/beautiful-ui/beautiful-ui-elements.tsx", type: "registry:ui", target: "components/ui/beautiful-ui-elements.tsx" },
        { path: "registry/elements/beautiful-ui/beautiful-ui-elements.css", type: "registry:file", target: "components/ui/beautiful-ui-elements.css" },
        { path: "registry/elements/beautiful-ui/LICENSE.txt", type: "registry:file", target: "LICENSE-beautiful-ui.txt" },
      ],
      docs: "Adapted from Beautiful UI by Shane Levine under the MIT License. Keep the included license notice. The foundation uses solid surfaces, 44-pixel controls, responsive layouts, visible focus, and reduced-motion behavior.",
    },
    ...beautifulItems.map((item) => ({
      name: item.id,
      type: "registry:ui",
      title: item.title,
      description: item.description,
      author: "Shane Levine; adapted by Scott E. Telling",
      categories: [item.category, "Interactive", "Beautiful UI"],
      registryDependencies: ["https://kit.scottelling.com/r/elements/beautiful-ui-foundation.json"],
      files: [{ path: `registry/elements/beautiful-ui/${item.id}.tsx`, type: "registry:ui", target: `components/ui/${item.id}.tsx` }],
      docs: `Import ${item.technicalName.replace(/[^a-zA-Z0-9 ]/g, "")} from the generated ${item.id} file. Adapt visual values to the target system, but preserve the working interaction, visible focus, responsive behavior, and reduced-motion support.`,
    })),
  ],
}

await writeFile(path.join(root, "registry/elements/registry.json"), `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Generated Elements registry: ${beautifulItems.length + 1} visible elements plus one shared foundation.`)
