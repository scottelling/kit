import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const outputs = [
  ["lib/system-catalog.json", "public/r/system-catalog.json"],
  ["lib/icon-catalog.json", "public/r/icon-catalog.json"],
  ["lib/adoption-contract.json", "public/r/adoption-contract.json"],
  ["lib/doctrine.json", "public/r/doctrine.json"],
]

await mkdir(path.join(root, "public", "r"), { recursive: true })
for (const [source, destination] of outputs) {
  const contents = await readFile(path.join(root, source), "utf8")
  await writeFile(path.join(root, destination), contents)
}

console.log(`Published ${outputs.length} plain-language system catalogs.`)
