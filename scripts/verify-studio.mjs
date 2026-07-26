import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const root = new URL("../plugins/purple-rain-studio/", import.meta.url)
const plugin = JSON.parse(readFileSync(new URL(".codex-plugin/plugin.json", root), "utf8"))
const requiredPluginFields = ["name", "version", "description", "author", "interface", "skills"]

for (const field of requiredPluginFields) {
  if (!plugin[field]) throw new Error(`Studio plugin is missing ${field}.`)
}

if (plugin.name !== "purple-rain-studio") throw new Error("Studio plugin name has drifted.")
if (!/^\d+\.\d+\.\d+$/.test(plugin.version)) throw new Error("Studio plugin version must be semantic.")

const skillsDirectory = new URL("skills/", root)
const skillDirectories = readdirSync(skillsDirectory, { withFileTypes: true }).filter((entry) => entry.isDirectory())
if (skillDirectories.length !== 7) throw new Error(`Expected 7 Studio skills, found ${skillDirectories.length}.`)

for (const entry of skillDirectories) {
  const directory = join(skillsDirectory.pathname, entry.name)
  const skillPath = join(directory, "SKILL.md")
  const agentPath = join(directory, "agents/openai.yaml")
  if (!statSync(skillPath).isFile() || !statSync(agentPath).isFile()) throw new Error(`${entry.name} is incomplete.`)
  const skill = readFileSync(skillPath, "utf8")
  const agent = readFileSync(agentPath, "utf8")
  if (skill.includes("TODO") || agent.includes("TODO")) throw new Error(`${entry.name} contains a placeholder.`)
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/u)?.[1] ?? ""
  const keys = frontmatter.split("\n").filter((line) => /^[a-z_]+:/u.test(line)).map((line) => line.split(":")[0])
  if (keys.join(",") !== "name,description") throw new Error(`${entry.name} frontmatter must contain only name and description.`)
  if (!agent.includes(`$${entry.name}`)) throw new Error(`${entry.name} agent prompt must name the skill.`)
}

console.log(`Studio verified: ${skillDirectories.length} skills and one valid plugin manifest.`)
