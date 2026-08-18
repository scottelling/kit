import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const failures = []
const patterns = [
  ["alert-dialog", "registry/purple-rain/safety/alert-dialog.tsx"],
  ["visibility-publication-control", "registry/purple-rain/safety/visibility-publication-control.tsx"],
  ["evidence-source-block", "registry/purple-rain/safety/evidence-source-block.tsx"],
  ["share-qr-panel", "registry/purple-rain/safety/share-qr-panel.tsx"],
  ["destructive-action", "registry/purple-rain/safety/destructive-action.tsx"],
]
const registries = [
  ["purple-rain", "registry.json", "https://kit.scottelling.com/r/tokens.json", "public/r"],
  ["jade", "registry/jade/registry.json", "https://kit.scottelling.com/r/jade/tokens.json", "public/r/jade"],
  ["os", "registry/os/registry.json", "https://kit.scottelling.com/r/os/tokens.json", "public/r/os"],
  ["animation", "registry/animation/registry.json", "https://kit.scottelling.com/r/animation/tokens.json", "public/r/animation"],
  ["vanilla", "registry/vanilla-kit/registry.json", "https://kit.scottelling.com/r/vanilla-kit/tokens.json", "public/r/vanilla-kit"],
]

function requireTerms(label, source, terms) {
  for (const term of terms) if (!source.includes(term)) failures.push(`${label} is missing ${term}`)
}

const sources = new Map()
for (const [name, relative] of patterns) {
  try {
    sources.set(name, await readFile(path.join(root, relative), "utf8"))
  } catch (error) {
    failures.push(`${name} source is missing: ${error.message}`)
  }
}

const alertDialog = sources.get("alert-dialog") ?? ""
requireTerms("alert-dialog", alertDialog, ["AlertDialogPrimitive", "AlertDialogTitle", "AlertDialogDescription", "AlertDialogCancel", "autoFocus", "motion-reduce", "min-h-11"])
if (alertDialog.includes("<details") || alertDialog.includes('ComponentPropsWithoutRef<"details">')) failures.push("alert-dialog still uses a details disclosure instead of a modal primitive")

const visibility = sources.get("visibility-publication-control") ?? ""
requireTerms("visibility-publication-control", visibility, ["private", "draft", "unlisted", "public", "inherited", "locallyOverridden", "data-inheritance", "showModal", "aria-live", "sensitive", "Preview", "min-h-11"])

const evidence = sources.get("evidence-source-block") ?? ""
requireTerms("evidence-source-block", evidence, ["self-reported", "conflicting", "under-review", "<time", "<details", "Sources", "limitations", "min-h-11"])

const share = sources.get("share-qr-panel") ?? ""
requireTerms("share-qr-panel", share, ["navigator.clipboard", "navigator.share", "Share link", "qrCode", "qrState", "data-qr-state", "onCopyLink", "onRetryQr", "draft", "revoked", "offline", "aria-live", "min-h-11"])
if (share.includes("onCopy?:")) failures.push("share-qr-panel reintroduces the native onCopy callback collision")

const destructive = sources.get("destructive-action") ?? ""
requireTerms("destructive-action", destructive, ["AlertDialogPrimitive", "confirmationText", "autoFocus", "irreversible", "onUndo", "undo-error", "aria-live", "aria-live=\"assertive\"", "min-h-11", "h-dvh", "sm:h-auto"])
if (destructive.includes("<AlertDialogPrimitive.Trigger asChild")) failures.push("destructive-action uses a trigger shape that shadcn can rewrite into nested buttons")

for (const [name, source] of sources) {
  for (const productTerm of ["Glohhh", "GlowProfile", "peptide", "affiliate", "/profile"]) {
    if (source.includes(productTerm)) failures.push(`${name} leaks product-owned language: ${productTerm}`)
  }
}

const consumerContract = await readFile(path.join(root, "scripts", "fixtures", "safety-consumer-contract.tsx"), "utf8")
requireTerms("safety consumer type contract", consumerContract, ["locallyOverridden", "qrState=\"error\"", "onCopyLink", "onRetryQr"])

const showroom = await readFile(path.join(root, "app", "kit", "component-preview.tsx"), "utf8")
requireTerms("safety state explorer", showroom, ["Visibility state", "Evidence state", "Sharing state", "Destructive state", "Confirmation state", "QR failed", "Irreversible"])

const showroomShell = await readFile(path.join(root, "app", "kit", "kit-experience.tsx"), "utf8")
if (!showroomShell.includes("event.target === event.currentTarget) setSelected(null)")) failures.push("nested safety dialogs can close the showroom preview")

for (const [system, registryPath, tokenUrl, publicDir] of registries) {
  const registry = JSON.parse(await readFile(path.join(root, registryPath), "utf8"))
  for (const [name, sourcePath] of patterns) {
    const item = registry.items.find((entry) => entry.name === name)
    if (!item) {
      failures.push(`${system} is missing ${name}`)
      continue
    }
    if (item.files?.[0]?.path !== sourcePath) failures.push(`${system} ${name} does not use the shared safety source`)
    if (!item.registryDependencies?.includes(tokenUrl)) failures.push(`${system} ${name} does not carry its own system tokens`)
    if (["alert-dialog", "destructive-action"].includes(name) && !item.dependencies?.includes("radix-ui")) failures.push(`${system} ${name} is missing the modal dependency`)
    if (!["alert-dialog", "destructive-action"].includes(name) && item.dependencies?.includes("radix-ui")) failures.push(`${system} ${name} carries an unnecessary modal dependency`)
    try {
      const built = JSON.parse(await readFile(path.join(root, publicDir, `${name}.json`), "utf8"))
      if (!built.files?.some((file) => file.content?.includes(`data-slot=\\\"${name}\\\"`) || file.content?.includes(`data-slot="${name}"`))) {
        failures.push(`${system} ${name} public item does not carry its source`)
      }
    } catch {
      failures.push(`${system} ${name} has not been built publicly`)
    }
  }
}

if (failures.length) {
  console.error(`Safety-pattern verification failed (${failures.length}):`)
  console.error(failures.map((failure) => `  - ${failure}`).join("\n"))
  process.exit(1)
}

console.log(`Verified ${patterns.length} shared safety pieces across ${registries.length} complete systems: real modal confirmation, visibility, evidence, sharing, QR handoff, destructive progress, undo, and recovery.`)
