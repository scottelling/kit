import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import { catalogMarkdown } from "./component-guide-format.mjs"

const root = process.cwd()
const library = JSON.parse(await readFile(path.join(root, "lib", "universal-library.json"), "utf8"))

const systems = [
  { id: "vanilla", label: "Vanilla", showroom: "https://kit.scottelling.com/kit/vanilla", itemBase: "https://kit.scottelling.com/r/vanilla-kit" },
  { id: "purple-rain", label: "Purple Rain", showroom: "https://kit.scottelling.com/kit", itemBase: "https://kit.scottelling.com/r" },
  { id: "jade", label: "JADE", showroom: "https://kit.scottelling.com/kit/jade", itemBase: "https://kit.scottelling.com/r/jade" },
  { id: "os", label: "OS", showroom: "https://kit.scottelling.com/kit/os", itemBase: "https://kit.scottelling.com/r/os" },
  { id: "animation", label: "Animation Studio", showroom: "https://kit.scottelling.com/kit/animation", itemBase: "https://kit.scottelling.com/r/animation" },
  { id: "voltage", label: "Voltage", showroom: "https://kit.scottelling.com/kit/voltage", itemBase: "https://kit.scottelling.com/r/voltage" },
]

const policies = {
  Foundations: {
    useWhen: "you need one shared rule to shape many screens consistently",
    avoidWhen: "the value is local content or a one-off product decision",
    states: ["documented", "applied", "reviewed"],
    interactionStates: ["default"],
    events: ["APPLY", "REVIEW", "RESET"],
    productOwns: "the product's content hierarchy and exceptional constraints",
  },
  Actions: {
    useWhen: "a person needs to trigger or choose a clear next action",
    avoidWhen: "the object only communicates information and performs no action",
    states: ["ready", "working", "success", "failed"],
    interactionStates: ["default", "hover", "focus", "pressed", "disabled"],
    events: ["ACTIVATE", "START", "SUCCEED", "FAIL", "RETRY", "RESET"],
    productOwns: "the action, permission, side effect, success result, and failure recovery",
  },
  Forms: {
    useWhen: "a person must enter, select, validate, or submit information",
    avoidWhen: "the value is read-only or a simple immediate action is enough",
    states: ["empty", "filled", "invalid", "working", "success", "failed"],
    interactionStates: ["default", "hover", "focus", "disabled", "read-only"],
    events: ["CHANGE", "VALIDATE", "SUBMIT", "SUCCEED", "FAIL", "RETRY", "RESET"],
    productOwns: "field meaning, validation rules, privacy, persistence, and submission side effects",
  },
  Navigation: {
    useWhen: "a person must move, filter, change view, or understand their current place",
    avoidWhen: "the choices perform unrelated actions rather than changing place or view",
    states: ["ready", "current", "collapsed", "expanded"],
    interactionStates: ["default", "hover", "focus", "disabled"],
    events: ["SELECT", "NEXT", "PREVIOUS", "EXPAND", "COLLAPSE"],
    productOwns: "routes, labels, permissions, destination order, and preserved navigation state",
  },
  Overlays: {
    useWhen: "a focused task needs to appear above the current context",
    avoidWhen: "the task needs a durable URL, long reading, or full-page workspace",
    states: ["closed", "opening", "open", "working", "failed", "closing"],
    interactionStates: ["default", "focus", "disabled"],
    events: ["OPEN", "CONFIRM", "CANCEL", "FAIL", "RETRY", "CLOSE"],
    productOwns: "the decision, consequences, permission, submitted data, and return destination",
  },
  Feedback: {
    useWhen: "the interface must make progress, status, success, failure, or recovery obvious",
    avoidWhen: "the same information is already clear from the changed object itself",
    states: ["idle", "working", "success", "warning", "failed", "dismissed"],
    interactionStates: ["default", "focus", "disabled"],
    events: ["START", "UPDATE", "SUCCEED", "WARN", "FAIL", "DISMISS", "RETRY"],
    productOwns: "the true status, source of truth, error cause, recovery action, and timing",
  },
  Data: {
    useWhen: "people need to scan, compare, select, or understand structured information",
    avoidWhen: "a short sentence communicates the information more clearly",
    states: ["loading", "empty", "populated", "selected", "filtered", "failed"],
    interactionStates: ["default", "hover", "focus", "disabled"],
    events: ["LOAD", "SELECT", "FILTER", "SORT", "FAIL", "RETRY", "CLEAR"],
    productOwns: "the records, calculations, sorting rules, filters, actions, and source freshness",
  },
  Patterns: {
    useWhen: "several related pieces must complete one recognizable product task",
    avoidWhen: "the product needs only one primitive or already owns a better task composition",
    states: ["ready", "editing", "working", "success", "failed", "recovery"],
    interactionStates: ["default", "hover", "focus", "disabled"],
    events: ["START", "CHANGE", "SUBMIT", "SUCCEED", "FAIL", "RETRY", "RESET"],
    productOwns: "the journey, content, data, permissions, business rules, and side effects",
  },
  "OS Patterns": {
    useWhen: "a desktop-like work surface genuinely helps people manage dense, concurrent work",
    avoidWhen: "the product is a simple page, form, or phone-first flow that does not need desktop structure",
    states: ["ready", "selected", "resized", "collapsed", "failed", "recovered"],
    interactionStates: ["default", "hover", "focus", "disabled"],
    events: ["FOCUS", "SELECT", "MOVE", "RESIZE", "COLLAPSE", "EXPAND", "RECOVER"],
    productOwns: "the windows, documents, commands, data, persistence, and workspace rules",
  },
  "Animation Patterns": {
    useWhen: "a creative workflow needs visible scenes, layers, timing, preview, inspection, or delivery",
    avoidWhen: "the product does not create or inspect time-based work",
    states: ["ready", "selected", "editing", "playing", "working", "complete", "failed"],
    interactionStates: ["default", "hover", "focus", "disabled"],
    events: ["SELECT", "CHANGE", "PLAY", "PAUSE", "SUBMIT", "COMPLETE", "FAIL", "RETRY"],
    productOwns: "the project model, media, timing data, rendering, persistence, and delivery policy",
  },
}

const specific = {
  "alert-dialog": { useWhen: "a consequential decision requires explicit confirmation and a safe way back", avoidWhen: "the action is harmless, immediately reversible, or needs a full-page explanation", events: ["OPEN", "CONFIRM", "CANCEL", "START", "SUCCEED", "FAIL", "RETRY", "CLOSE"] },
  "visibility-publication-control": { useWhen: "people must understand who can access an object before publishing it", avoidWhen: "visibility is fixed and cannot be changed here", events: ["OPEN", "SELECT_VISIBILITY", "SAVE", "SUCCEED", "FAIL", "RETRY", "CLOSE"] },
  "evidence-source-block": { useWhen: "a claim needs provenance, confidence, freshness, limitations, or conflicting evidence", avoidWhen: "the content is ordinary product copy with no source claim" },
  "share-qr-panel": { useWhen: "one surface must coordinate a usable link, copying, native sharing, QR, and recovery", avoidWhen: "there is no stable share destination yet", events: ["LOAD_LINK", "COPY_LINK", "SHARE", "LOAD_QR", "FAIL_QR", "RETRY_QR", "REVOKE"] },
  "destructive-action": { useWhen: "an action has serious consequences and needs confirmation, progress, failure, and recovery", avoidWhen: "the action is harmless or can be undone inline without confirmation", events: ["OPEN", "TYPE_CONFIRMATION", "CONFIRM", "START", "SUCCEED", "FAIL", "RETRY", "UNDO", "CLOSE"] },
  "skeleton": { useWhen: "real data is loading and its final geometry is known well enough to prevent layout shift", avoidWhen: "the wait is caused by an action that needs visible progress or the final layout is unknown", events: ["LOAD", "RESOLVE", "FAIL", "RETRY"] },
  "progress": { purpose: "Show determinate progress for work whose completion can be measured.", useWhen: "ongoing work has a trustworthy current value and known maximum", avoidWhen: "the value is chosen by the user, measures capacity rather than progress, or completion cannot be estimated", states: ["idle", "running", "complete", "failed"], interactionStates: ["default"], events: ["START", "UPDATE_PROGRESS", "COMPLETE", "FAIL", "RESET"], accessibility: ["Expose the current value, minimum, maximum, and an understandable progress label.", "Announce meaningful milestones without speaking every small percentage change."] },
  "meter": { purpose: "Show a measured value inside a known range, such as storage or score.", useWhen: "a current bounded measurement should be compared with its minimum, maximum, or optimum", avoidWhen: "the value represents task completion or can be changed directly here", states: ["empty", "measured", "low", "high", "critical"], interactionStates: ["default"], events: ["UPDATE_VALUE", "RESET"] },
  "file-upload": { purpose: "Select files and make upload progress, cancellation, failure, retry, and completion unmistakable.", useWhen: "a product must accept one or more files and own a real upload, cancel, retry, and storage flow", avoidWhen: "the product only needs local file selection or has not defined privacy, retention, and upload behavior", states: ["empty", "selected", "invalid", "uploading", "cancelled", "failed", "success"], events: ["SELECT_FILES", "VALIDATE", "START_UPLOAD", "UPDATE_PROGRESS", "CANCEL", "CANCELLED", "SUCCEED", "FAIL", "RETRY", "REMOVE_FILE", "RESET"], productOwns: ["Accepted file types and limits, authorization, upload and abort adapters, endpoint, encryption, storage, retention, deletion, logging, and retry idempotency.", "Whether cancellation confirms server cleanup or only stops the current request."], accessibility: ["Keep a correctly labelled native file input available to keyboard and assistive technology.", "Expose determinate upload progress with a useful label and restrained announcements.", "Move or restore focus deliberately after validation failure, cancellation, upload failure, and completion."], proof: ["Inspect and record the existing upload, abort, privacy, storage, logging, and retry behavior before implementation.", "Reject retry outside failure and ignore a late completion from an aborted request.", "Prove retry cannot create an unintended duplicate and cancellation never claims deletion the server did not confirm."] },
  "dropzone": { purpose: "Add drag-and-drop file selection without removing the native file picker.", useWhen: "drag-and-drop materially helps repeated desktop file selection and a normal picker remains available", avoidWhen: "a standard file chooser is enough or the product has no upload policy", states: ["empty", "dragging", "selected", "invalid", "disabled"], interactionStates: ["default", "hover", "focus", "disabled"], events: ["DRAG_ENTER", "DRAG_LEAVE", "DROP_FILES", "OPEN_PICKER", "VALIDATE", "CLEAR"] },
  "tabs": { useWhen: "closely related views share one place and switching should preserve context", avoidWhen: "each destination needs its own URL history or the content is sequential", events: ["SELECT", "NEXT", "PREVIOUS"] },
  "dialog": { useWhen: "a short focused task must temporarily take priority without becoming a new page", avoidWhen: "the task is long, linkable, or should survive refresh", events: ["OPEN", "SUBMIT", "SUCCEED", "FAIL", "CANCEL", "CLOSE"] },
  "toast": { useWhen: "a short-lived outcome needs acknowledgement without interrupting the current task", avoidWhen: "the condition persists, requires action, or is the only record of failure", events: ["SHOW", "DISMISS", "EXPIRE"] },
  "inline-edit": { useWhen: "one small value can be changed safely without opening a separate form", avoidWhen: "validation is complex, the change is consequential, or several fields belong together", events: ["EDIT", "CHANGE", "SAVE", "SUCCEED", "FAIL", "CANCEL"] },
  "multi-step-dialog": { useWhen: "a short modal task has ordered steps with legal next and back moves", avoidWhen: "the journey is long enough to need a durable route" },
  "workspace-error-boundary": { useWhen: "one complex workspace must fail safely without taking down the rest of the product", avoidWhen: "the error can be handled at the individual request or field", events: ["FAIL", "REPORT", "RELOAD", "RECOVER"] },
}

function sentence(value) {
  return value[0].toUpperCase() + value.slice(1).replace(/[.]$/u, "") + "."
}

function flowMode(category, states) {
  if (category === "Foundations") return "stateless"
  if (["Patterns", "OS Patterns", "Animation Patterns", "Overlays"].includes(category) || states.length > 6) return "machine-ready"
  return "event-driven"
}

function guideFor(item) {
  const policy = policies[item.category]
  if (!policy) throw new Error(`Missing component guide policy for ${item.category}.`)
  const override = specific[item.name] ?? {}
  const useWhen = override.useWhen ?? policy.useWhen
  const avoidWhen = override.avoidWhen ?? policy.avoidWhen
  const states = override.states ?? policy.states
  const interactionStates = override.interactionStates ?? policy.interactionStates
  const events = override.events ?? policy.events
  const scope = item.category === "OS Patterns" || item.category === "Animation Patterns" ? "specialist" : "shared"
  const mode = flowMode(item.category, states)
  const purpose = override.purpose ?? item.description
  const prompt = `Use Kit's ${item.title} for this product. ${sentence(useWhen)} Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model ${events.join(", ")} as named events; render ${states.join(", ")} as workflow states and ${interactionStates.join(", ")} as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.`

  return {
    name: item.name,
    title: item.title,
    category: item.category,
    scope,
    purpose,
    useWhen: [sentence(useWhen)],
    avoidWhen: [sentence(avoidWhen)],
    states,
    interactionStates,
    events,
    flow: {
      mode,
      rule: mode === "stateless" ? "Render directly from the active system tokens." : "Send named events into one flow owner; render the interface from its current state and durable data.",
      machineThreshold: "Use a reducer for a tiny local interaction. Use a state machine when four or more states, delayed transitions, invalid moves, or retry paths overlap.",
    },
    kitOwns: [
      "Semantic visual roles, component anatomy, interaction expression, and complete visible states.",
      "At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.",
      "Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.",
    ],
    productOwns: override.productOwns ?? [sentence(policy.productOwns), "Which states and events are actually legal for this product and user."],
    accessibility: [
      "Use native semantics first and expose the current state without relying on color alone.",
      "Keep every action reachable by keyboard with a visible focus indicator and an understandable name.",
      "Announce asynchronous success or failure when the changed object does not make the outcome obvious.",
      ...(override.accessibility ?? []),
    ],
    responsive: [
      "Contain the complete task at 320 pixels without hiding the primary action behind sideways scrolling.",
      "Recompose dense layouts for touch instead of shrinking controls or text.",
    ],
    proof: [
      "Exercise every declared state and every legal event, including failure and recovery.",
      "Verify keyboard order, focus return where focus moves, touch targets, and reduced motion.",
      "Check 320, 375, 414, 768, and desktop widths with no page overflow or unreachable action.",
      ...(override.proof ?? []),
    ],
    systems: systems.map((system) => ({ ...system, component: `${system.itemBase}/${item.name}.json` })),
    prompt,
  }
}

const items = library.map(guideFor)
const categories = [...new Set(items.map((item) => item.category))].map((name) => ({ name, count: items.filter((item) => item.category === name).length }))
const catalog = {
  format: "kit-component-guides/1",
  version: "1.0.0",
  purpose: "One plain-language operating guide for every reusable Kit component, shared by people, agents, installers, and release checks.",
  sourceStudy: {
    name: "oa-design",
    url: "https://github.com/OpenLabs-so/oa-design",
    license: "MIT",
    adopted: ["Agent-readable recipes", "One generated source feeding multiple handoffs", "Named motion and state guidance", "Copy as part of component quality"],
    rejected: ["Open Analytics visual identity", "Glass header", "Sub-44-pixel controls", "Required Motion dependency", "Incomplete twelve-component scope"],
  },
  contract: {
    invariant: "The guide may change component expression, never product routes, content, data, permissions, or business behavior.",
    requiredFields: ["purpose", "useWhen", "avoidWhen", "states", "interactionStates", "events", "flow", "kitOwns", "productOwns", "accessibility", "responsive", "proof", "systems", "prompt"],
  },
  count: items.length,
  categories,
  systems,
  items,
}

const markdown = catalogMarkdown(catalog)
const systemCatalogPath = path.join(root, "lib", "system-catalog.json")
const systemCatalog = JSON.parse(await readFile(systemCatalogPath, "utf8"))
systemCatalog.guideCatalog = "https://kit.scottelling.com/r/guides/catalog.json"
systemCatalog.items = systemCatalog.items.map((item) => ({
  ...item,
  guide: `https://kit.scottelling.com/r/guides/${item.name}.json`,
}))
await writeFile(systemCatalogPath, `${JSON.stringify(systemCatalog, null, 2)}\n`)
await mkdir(path.join(root, "registry", "guides"), { recursive: true })
await mkdir(path.join(root, "plugins", "purple-rain-studio", "skills", "apply-kit-component-guides", "references"), { recursive: true })
await writeFile(path.join(root, "lib", "component-guides.json"), `${JSON.stringify(catalog, null, 2)}\n`)
await writeFile(path.join(root, "registry", "guides", "KIT-COMPONENT-GUIDES.md"), markdown)
await writeFile(path.join(root, "plugins", "purple-rain-studio", "skills", "apply-kit-component-guides", "references", "component-guides.md"), markdown)

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "kit-guides",
  homepage: "https://kit.scottelling.com/studio/guides",
  items: [{
    name: "kit-component-guides",
    type: "registry:file",
    title: "Kit Component Guides",
    description: `One agent-readable operating guide for all ${items.length} reusable Kit components.`,
    author: "Scott E. Telling",
    categories: ["Agent Guides", "Design Engineering"],
    files: [{ path: "registry/guides/KIT-COMPONENT-GUIDES.md", type: "registry:file", target: "KIT-COMPONENT-GUIDES.md" }],
    docs: "Use the guide for the component being built. Preserve product ownership, model named events and visible states, and verify the listed accessibility and responsive behavior.",
  }],
}
await writeFile(path.join(root, "registry", "guides", "registry.json"), `${JSON.stringify(registry, null, 2)}\n`)

console.log(`Generated ${items.length} component guides from the universal Kit catalog.`)
