import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import { catalogMarkdown, guideMarkdown } from "./component-guide-format.mjs"

const root = process.cwd()
const catalog = JSON.parse(await readFile(path.join(root, "lib", "component-guides.json"), "utf8"))
const output = path.join(root, "public", "r", "guides")
await mkdir(output, { recursive: true })
await writeFile(path.join(output, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`)
await writeFile(path.join(output, "all.md"), catalogMarkdown(catalog))
for (const guide of catalog.items) {
  await writeFile(path.join(output, `${guide.name}.json`), `${JSON.stringify(guide, null, 2)}\n`)
  await writeFile(path.join(output, `${guide.name}.md`), guideMarkdown(guide))
}
console.log(`Published ${catalog.items.length} component guides in JSON and plain language.`)
