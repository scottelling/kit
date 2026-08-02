import type { StudioAsset } from "@/lib/studio-library"
import { normalizeThemeVariant, type ThemeVariant } from "@/lib/theme-workshop"

export type ProjectType = "Landing page" | "Product app" | "Online store" | "Publication" | "Portfolio" | "Documentation" | "Marketplace" | "Campaign"
export type ProjectTone = "Precise" | "Warm" | "Bold" | "Quiet" | "Playful" | "Editorial" | "Technical" | "Luxurious"
export type ProjectStatus = "draft" | "built" | "approved" | "archived"

export type StudioProject = {
  id: string
  name: string
  brief: string
  type: ProjectType
  tone: ProjectTone
  direction: string
  paletteId: string
  fontId: string
  motionId: string
  textId: string
  templateId: string
  brandTraits: string[]
  brandToolIds: string[]
  promptIds: string[]
  skillIds: string[]
  agentIds: string[]
  voiceLevel: number
  signature: string
  themeVariant: ThemeVariant | null
  status: ProjectStatus
  previewPublished: boolean
  createdAt: string
  updatedAt: string
}

export type TemplateFamily = {
  id: string
  name: string
  type: ProjectType
  promise: string
  description: string
  pages: string[]
  includes: string[]
  accent: string
}

export const projectTypes: ProjectType[] = ["Landing page", "Product app", "Online store", "Publication", "Portfolio", "Documentation", "Marketplace", "Campaign"]
export const projectTones: ProjectTone[] = ["Precise", "Warm", "Bold", "Quiet", "Playful", "Editorial", "Technical", "Luxurious"]

export const templateFamilies: TemplateFamily[] = [
  {
    id: "landing-system",
    name: "Launch System",
    type: "Landing page",
    promise: "Turn one clear offer into a complete decision path.",
    description: "A full launch surface with positioning, proof, product story, pricing when it belongs, questions, and a focused final action.",
    pages: ["Opening", "Product", "Proof", "Plans", "Questions"],
    includes: ["Responsive story", "Proof without invention", "Clear conversion path", "Complete form states"],
    accent: "purple-rain",
  },
  {
    id: "app-system",
    name: "Product System",
    type: "Product app",
    promise: "Keep the current object and next action obvious.",
    description: "A complete product shell with workspace, navigation, activity, settings, command surfaces, recovery, and empty states.",
    pages: ["Overview", "Workspace", "Activity", "Settings", "Recovery"],
    includes: ["App shell", "Dense and calm states", "Keyboard model", "Offline recovery"],
    accent: "purple-rain",
  },
  {
    id: "commerce-system",
    name: "Commerce System",
    type: "Online store",
    promise: "Move from discovery to receipt without losing trust.",
    description: "A complete buying system with brand-led home, collection, product, cart, checkout, and post-purchase continuity.",
    pages: ["Shop", "Collection", "Product", "Checkout", "Receipt"],
    includes: ["Merchandising", "Product decisions", "Calm checkout", "Delivery clarity"],
    accent: "gold-standard",
  },
  {
    id: "publication-system",
    name: "Publication System",
    type: "Publication",
    promise: "Make what matters now easy to read and keep.",
    description: "An editorial system with a strong home hierarchy, article, archive, search, author, and subscription moments.",
    pages: ["Edition", "Article", "Archive", "Search", "Subscribe"],
    includes: ["Reading rhythm", "Editorial hierarchy", "Archive tools", "Subscription states"],
    accent: "library-red",
  },
  {
    id: "portfolio-system",
    name: "Portfolio System",
    type: "Portfolio",
    promise: "Let the work lead and the contribution stay clear.",
    description: "A complete studio or maker presence with work index, case study, profile, services, and a specific way to begin.",
    pages: ["Selected work", "Project", "Approach", "About", "Contact"],
    includes: ["Work filters", "Case-study structure", "Role clarity", "Inquiry states"],
    accent: "ink-orchid",
  },
  {
    id: "docs-system",
    name: "Documentation System",
    type: "Documentation",
    promise: "Find the answer, understand it, and keep your place.",
    description: "A task-led knowledge system with search, guides, reference, examples, changelog, and useful recovery paths.",
    pages: ["Start", "Guide", "Reference", "Examples", "Changes"],
    includes: ["Global search", "Task navigation", "Readable examples", "Version context"],
    accent: "civic-blue",
  },
  {
    id: "marketplace-system",
    name: "Marketplace System",
    type: "Marketplace",
    promise: "Make quality, fit, and availability comparable.",
    description: "A two-sided marketplace with discovery, results, provider detail, booking or purchase, trust, and account continuity.",
    pages: ["Discover", "Results", "Provider", "Book", "Account"],
    includes: ["Useful filters", "Trust signals", "Availability", "Two-sided states"],
    accent: "marine",
  },
  {
    id: "campaign-system",
    name: "Campaign System",
    type: "Campaign",
    promise: "Carry one timely idea with enough proof to act.",
    description: "A focused campaign with declaration, story, participation, updates, and a clear completion moment.",
    pages: ["Statement", "Story", "Take part", "Updates", "Complete"],
    includes: ["Distinct opening", "Narrative proof", "Participation flow", "Shareable result"],
    accent: "signal-orange",
  },
]

export const defaultBriefs: Record<ProjectType, string> = {
  "Landing page": "A focused launch for a useful product. Explain the offer clearly, show the product in use, establish trust, and make the next decision easy.",
  "Product app": "A calm working product for a small team. Keep today’s priorities obvious, collect decisions in context, and make every state easy to recover from.",
  "Online store": "An independent shop for well-made objects. Let material, dimensions, availability, delivery, and the reason each piece exists support the buying decision.",
  Publication: "An independent publication for considered reporting and useful analysis. Make the important edition clear, long reading comfortable, and the archive genuinely useful.",
  Portfolio: "A portfolio for a design-led practice. Let selected work lead while role, collaborators, constraints, decisions, and outcomes remain explicit.",
  Documentation: "Documentation for a product with real depth. Help people find a task, understand the model, try a useful example, and recover when something differs.",
  Marketplace: "A marketplace where people need to compare fit, quality, availability, terms, and trust before committing on either side.",
  Campaign: "A focused campaign around one timely idea. Give it a distinct point of view, enough context to trust, and one clear way to participate.",
}

const typeDefaults: Record<ProjectType, Pick<StudioProject, "templateId" | "paletteId">> = Object.fromEntries(
  templateFamilies.map((family) => [family.type, { templateId: family.id, paletteId: family.accent }]),
) as Record<ProjectType, Pick<StudioProject, "templateId" | "paletteId">>

function projectId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function createStudioProject(overrides: Partial<StudioProject> = {}): StudioProject {
  const type = overrides.type ?? "Product app"
  const now = new Date().toISOString()
  return {
    id: overrides.id ?? projectId(),
    name: overrides.name ?? "Untitled project",
    brief: overrides.brief ?? defaultBriefs[type],
    type,
    tone: overrides.tone ?? "Precise",
    direction: overrides.direction ?? "Instant clarity",
    paletteId: overrides.paletteId ?? typeDefaults[type].paletteId,
    fontId: overrides.fontId ?? "relay-geist",
    motionId: overrides.motionId ?? "press",
    textId: overrides.textId ?? "solid-display",
    templateId: overrides.templateId ?? typeDefaults[type].templateId,
    brandTraits: overrides.brandTraits ?? ["Clear", "Tactile", "Exact"],
    brandToolIds: overrides.brandToolIds ?? ["brand-brief", "voice-system", "signature"],
    promptIds: overrides.promptIds ?? [],
    skillIds: overrides.skillIds ?? ["skill-design-ship", "skill-release-audit"],
    agentIds: overrides.agentIds ?? ["agent-director", "agent-product", "agent-engineer", "agent-qa"],
    voiceLevel: overrides.voiceLevel ?? 35,
    signature: overrides.signature ?? "Project receipt",
    themeVariant: normalizeThemeVariant(overrides.themeVariant),
    status: overrides.status ?? "draft",
    previewPublished: overrides.previewPublished ?? false,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
  }
}

export function getTemplateFamily(id: string) {
  return templateFamilies.find((family) => family.id === id) ?? templateFamilies[1]
}

export function getPalette(assets: StudioAsset[], id: string) {
  return assets.find((asset) => asset.category === "Palettes" && asset.id === id) ?? assets.find((asset) => asset.id === "purple-rain")
}

export function getAsset(assets: StudioAsset[], id: string) {
  return assets.find((asset) => asset.id === id)
}

export function projectPreviewCopy(project: StudioProject, page: string) {
  const names: Record<ProjectType, Record<string, { label: string; title: string; body: string; action: string }>> = {
    "Landing page": {
      Opening: { label: "The offer", title: "A useful product, understood quickly.", body: "The opening connects the problem, the product, and the next decision without filling the page with claims.", action: "See the product" },
      Product: { label: "In use", title: "The work becomes the proof.", body: "A real task shows how the product behaves, what changes, and why that matters.", action: "Open the walkthrough" },
      Proof: { label: "What is known", title: "Evidence stays specific.", body: "Real examples, named constraints, and visible outcomes replace decorative numbers and borrowed logos.", action: "Review the evidence" },
      Plans: { label: "Choose a fit", title: "The price and difference are visible.", body: "Each choice names what it includes, who it serves, and what happens next.", action: "Choose a plan" },
      Questions: { label: "Before you decide", title: "The useful questions, answered plainly.", body: "Short answers remove uncertainty without turning the close into another sales pitch.", action: "Start the project" },
    },
    "Product app": {
      Overview: { label: "Today’s workspace", title: "Three decisions need you.", body: "Everything else can wait. Current work, supporting context, and the next action stay together.", action: "Review decisions" },
      Workspace: { label: "Active project", title: "The important work stays close.", body: "Selection, editing, saving, and recovery use one consistent model across the product.", action: "Open the workspace" },
      Activity: { label: "Recent changes", title: "Every change has a clear owner.", body: "The history remains readable without turning the product into a wall of notifications.", action: "Review activity" },
      Settings: { label: "Project rules", title: "Preferences explain their consequence.", body: "Safe defaults, immediate focus, and clear save behavior make settings feel governed.", action: "Review settings" },
      Recovery: { label: "Nothing is lost", title: "Return to a known good state.", body: "Offline, error, timeout, and undo paths are part of the product—not an afterthought.", action: "Restore the project" },
    },
    "Online store": {
      Shop: { label: "New collection", title: "Objects worth keeping.", body: "The point of view arrives before the grid, then gives every object room to be judged.", action: "Explore the collection" },
      Collection: { label: "Made for daily use", title: "Compare without losing your place.", body: "Filters, inventory, materials, and price remain readable while the objects lead.", action: "View the collection" },
      Product: { label: "Stoneware No. 4", title: "Understand it before you buy it.", body: "Material, dimensions, care, delivery, and variation sit beside the buying decision.", action: "Add to basket" },
      Checkout: { label: "Secure checkout", title: "One calm path to completion.", body: "Totals stay visible, fields validate without surprise, and recovery never loses the basket.", action: "Continue to payment" },
      Receipt: { label: "Order confirmed", title: "The next expectation is clear.", body: "A useful receipt records the order, delivery window, support path, and what happens next.", action: "View the order" },
    },
    Publication: {
      Edition: { label: "Saturday edition", title: "What changed while you were working.", body: "A strong hierarchy separates the important story, the useful analysis, and the pieces worth keeping.", action: "Read this edition" },
      Article: { label: "Field report", title: "A reading surface that gets out of the way.", body: "Measure, rhythm, notes, and references support the work without crowding it.", action: "Begin reading" },
      Archive: { label: "The complete record", title: "Past work remains findable.", body: "Date, subject, series, and author turn the archive into a tool instead of a graveyard.", action: "Browse the archive" },
      Search: { label: "Search the publication", title: "Results show why they match.", body: "Useful excerpts, filters, and result counts make search a reading path of its own.", action: "Search the record" },
      Subscribe: { label: "Keep the edition close", title: "A clear promise, not a popup trap.", body: "Frequency, subject, privacy, and the first delivery are named before signup.", action: "Subscribe" },
    },
    Portfolio: {
      "Selected work": { label: "Selected work", title: "The work makes the argument.", body: "Projects lead while discipline, year, role, and contribution stay close enough to scan.", action: "Open a project" },
      Project: { label: "Project record", title: "Decisions, not just polished surfaces.", body: "Context, role, collaborators, constraints, and tradeoffs explain how the result came to be.", action: "Read the case study" },
      Approach: { label: "How the work happens", title: "A method with room for judgment.", body: "The process names the useful stages without pretending every project follows one script.", action: "See the approach" },
      About: { label: "The practice", title: "A point of view with a real address.", body: "Who does the work, where, for whom, and with what principles remains concrete.", action: "Meet the practice" },
      Contact: { label: "Begin with the work", title: "Tell us what needs to change.", body: "A short inquiry captures the project, the situation, and the decision ahead without an interrogation.", action: "Start a conversation" },
    },
    Documentation: {
      Start: { label: "Start here", title: "Find the answer. Keep your place.", body: "Task-led entry points and strong search give newcomers and returning users different ways in.", action: "Choose a task" },
      Guide: { label: "Working guide", title: "One task from start to finish.", body: "Prerequisites, steps, examples, checkpoints, and recovery stay together in reading order.", action: "Follow the guide" },
      Reference: { label: "Reference", title: "Every option, without the scavenger hunt.", body: "Dense information stays navigable through strong labels, anchors, examples, and defaults.", action: "Open the reference" },
      Examples: { label: "Working examples", title: "Begin with something that runs.", body: "Examples are organized by task and complexity, with the important difference called out.", action: "Try an example" },
      Changes: { label: "What changed", title: "Version history with consequences.", body: "Each change names who is affected, what to do, and where to read more.", action: "Review changes" },
    },
    Marketplace: {
      Discover: { label: "Available now", title: "Start with the kind of help you need.", body: "Useful categories and current availability bring real options forward without a wall of profiles.", action: "Explore matches" },
      Results: { label: "12 considered matches", title: "Compare fit without guessing.", body: "Experience, terms, availability, location, and reputation align across every result.", action: "Refine matches" },
      Provider: { label: "Provider profile", title: "Know who you are choosing.", body: "Work, approach, terms, availability, and verified history support the decision.", action: "Check availability" },
      Book: { label: "Confirm the work", title: "Terms stay visible before commitment.", body: "Scope, schedule, price, cancellation, and the next contact are recorded in one place.", action: "Confirm booking" },
      Account: { label: "Your work", title: "Every active agreement stays legible.", body: "Messages, milestones, payments, files, and support share one clear project record.", action: "Open the project" },
    },
    Campaign: {
      Statement: { label: "The campaign", title: "Make the moment count.", body: "One clear position, one timely reason, and one visible action carry the opening.", action: "Take part" },
      Story: { label: "Why now", title: "The context earns the request.", body: "A focused narrative connects the situation, the people affected, and what participation changes.", action: "Read the story" },
      "Take part": { label: "Choose your part", title: "Participation is concrete.", body: "Time, money, attention, or attendance each has a clear path and an honest consequence.", action: "Choose an action" },
      Updates: { label: "Campaign record", title: "Progress without performance.", body: "Verified updates, open questions, and next decisions keep the work accountable.", action: "Read the updates" },
      Complete: { label: "Action recorded", title: "You know what happens next.", body: "The confirmation names the result, the next message, and a useful way to stay involved.", action: "View your action" },
    },
  }

  const family = getTemplateFamily(project.templateId)
  const pageSet = names[project.type]
  return pageSet[page] ?? pageSet[family.pages[0]]
}

export function projectShareQuery(project: StudioProject) {
  const params = new URLSearchParams({
    id: project.id,
    name: project.name,
    brief: project.brief,
    type: project.type,
    tone: project.tone,
    direction: project.direction,
    palette: project.paletteId,
    font: project.fontId,
    motion: project.motionId,
    text: project.textId,
    template: project.templateId,
    signature: project.signature,
  })
  if (project.themeVariant?.publishedAt) params.set("theme", JSON.stringify(project.themeVariant))
  return params.toString()
}
