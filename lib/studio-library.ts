export type StudioCategory =
  | "Fonts"
  | "Icons"
  | "Palettes"
  | "Motion"
  | "Text"
  | "Brand"
  | "Templates"
  | "Prompts"
  | "Skills"
  | "Agents"

export type StudioAsset = {
  id: string
  category: StudioCategory
  name: string
  summary: string
  bestFor: string
  detail: string
  sample?: string
  source?: string
  status?: "Included" | "Ready to add"
  colors?: string[]
  accentInk?: string
  motion?: "press" | "enter" | "swap" | "reveal" | "draw" | "count" | "open" | "close"
  prompt?: string
}

export const studioCategories: { name: StudioCategory; plain: string }[] = [
  { name: "Fonts", plain: "Type pairings" },
  { name: "Icons", plain: "Icon library" },
  { name: "Palettes", plain: "Color systems" },
  { name: "Motion", plain: "Movement recipes" },
  { name: "Text", plain: "Text treatments" },
  { name: "Brand", plain: "Brand building" },
  { name: "Templates", plain: "Project starting points" },
  { name: "Prompts", plain: "Plain-English directions" },
  { name: "Skills", plain: "Repeatable abilities" },
  { name: "Agents", plain: "Specialist teammates" },
]

const fonts: StudioAsset[] = [
  { id: "relay-geist", category: "Fonts", name: "Purple Rain Core", summary: "Relay Sans with Geist Mono", bestFor: "Products, studios, and systems", detail: "Direct display type, calm reading text, and a precise mono note for labels and the wordmark.", sample: "Clear at a glance.", source: "Bundled · OFL", status: "Included" },
  { id: "relay-newsreader", category: "Fonts", name: "Product Editorial", summary: "Relay Sans with Newsreader", bestFor: "Content-rich products", detail: "A sturdy interface voice paired with a reading face for essays, stories, and long-form product education.", sample: "Made to be read.", source: "Google Fonts · OFL", status: "Ready to add" },
  { id: "instrument-relay", category: "Fonts", name: "Quiet Campaign", summary: "Instrument Serif with Relay Sans", bestFor: "Campaigns and cultural work", detail: "A compact display serif carries the opening statement while Relay keeps every action plain and legible.", sample: "A studied entrance.", source: "Google Fonts · OFL", status: "Ready to add" },
  { id: "space-relay", category: "Fonts", name: "Technical Character", summary: "Space Grotesk with Relay Sans", bestFor: "Developer tools and AI products", detail: "A geometric headline voice adds character without compromising the interface underneath.", sample: "Signal, then act.", source: "Google Fonts · OFL", status: "Ready to add" },
  { id: "fraunces-relay", category: "Fonts", name: "Warm Authority", summary: "Fraunces with Relay Sans", bestFor: "Food, hospitality, and publishing", detail: "Expressive optical forms for the brand layer with a clean product voice for navigation and buying.", sample: "Worth slowing down for.", source: "Google Fonts · OFL", status: "Ready to add" },
  { id: "newsreader-ibm", category: "Fonts", name: "Modern Journal", summary: "Newsreader with IBM Plex Sans", bestFor: "Publications and research", detail: "Screen-tuned reading type paired with an engineering sans for metadata, filters, and reference tools.", sample: "The record, made useful.", source: "Google Fonts · OFL", status: "Ready to add" },
  { id: "bricolage-relay", category: "Fonts", name: "Friendly Impact", summary: "Bricolage Grotesque with Relay Sans", bestFor: "Learning and community products", detail: "A confident display face creates warmth while the body stays calm enough for repeated daily use.", sample: "Curious by design.", source: "Google Fonts · OFL", status: "Ready to add" },
  { id: "cabinet-switzer", category: "Fonts", name: "Independent Studio", summary: "Cabinet Grotesk with Switzer", bestFor: "Portfolios and agencies", detail: "A foundry-grade free pairing with a memorable headline silhouette and neutral supporting prose.", sample: "Work with a point of view.", source: "Fontshare · Free commercial use", status: "Ready to add" },
  { id: "sentient-general", category: "Fonts", name: "Soft Intelligence", summary: "Sentient with General Sans", bestFor: "Wellness and thoughtful software", detail: "A low-pressure serif voice paired with a crisp interface sans; expressive without becoming precious.", sample: "Soft, but exact.", source: "Fontshare · Free commercial use", status: "Ready to add" },
  { id: "source-relay", category: "Fonts", name: "Trusted Service", summary: "Source Serif 4 with Relay Sans", bestFor: "Civic, finance, and healthcare", detail: "A broad, dependable serif family for explanation with clear action labels and dense interface support.", sample: "Understand the next step.", source: "Google Fonts · OFL", status: "Ready to add" },
  { id: "relay-jetbrains", category: "Fonts", name: "Maker Console", summary: "Relay Sans with JetBrains Mono", bestFor: "Dashboards and developer workflows", detail: "Human interface copy sits beside data and commands that align cleanly and scan at speed.", sample: "23 tasks · 4 ready", source: "Google Fonts · OFL", status: "Ready to add" },
  { id: "satoshi-space", category: "Fonts", name: "Consumer Utility", summary: "Satoshi with Space Mono", bestFor: "Social and personal tools", detail: "A friendly geometric voice with one quirky mono accent for labels, streaks, and compact data moments.", sample: "Keep the good things close.", source: "Fontshare + Google Fonts", status: "Ready to add" },
  { id: "animation-outfit", category: "Fonts", name: "Animation Studio", summary: "Outfit with JetBrains Mono", bestFor: "Creative tools and compact workspaces", detail: "A calm geometric interface voice paired with exact timing, dimensions, code, and machine-readable facts.", sample: "Shape the current scene.", source: "Google Fonts · OFL", status: "Ready to add" },
]

const icons: StudioAsset[] = [
  { id: "lucide-icons", category: "Icons", name: "Lucide", summary: "Everyday controls, actions, and navigation", bestFor: "The primary interface icon language", detail: "Use Lucide first for familiar actions and navigation. Its consistent outline keeps controls clear without inventing a new symbol.", source: "Lucide · ISC", status: "Included" },
  { id: "material-symbols-rounded", category: "Icons", name: "Material Symbols Rounded", summary: "A broad vocabulary for objects and specialist concepts", bestFor: "Concepts Lucide does not cover", detail: "Use Material Symbols Rounded when a product needs a specific object, domain, device, or place that the primary family cannot express.", source: "Google · Apache 2.0", status: "Included" },
]

const palettes: StudioAsset[] = [
  { id: "purple-rain", category: "Palettes", name: "Purple Rain", summary: "Plum ink, orchid action, tinted paper", bestFor: "The complete Purple Rain system", detail: "The canonical palette. Accent is reserved for selection, focus, progress, and the primary decision.", colors: ["oklch(0.972 0.011 313)", "oklch(0.925 0.024 310)", "oklch(0.5 0.17 305)", "oklch(0.46 0.032 313)", "oklch(0.2 0.03 308)"] },
  { id: "mulberry-paper", category: "Palettes", name: "Mulberry Paper", summary: "Warm paper with wine-colored action", bestFor: "Editorial shops and hospitality", detail: "A warmer Purple Rain relative with a deeper red-plum decision color and brown-tinted neutrals.", colors: ["oklch(0.975 0.018 72)", "oklch(0.93 0.025 64)", "oklch(0.47 0.15 343)", "oklch(0.44 0.035 44)", "oklch(0.19 0.025 32)"] },
  { id: "ink-orchid", category: "Palettes", name: "Ink & Orchid", summary: "High-contrast paper with one clear signal", bestFor: "Technical products and portfolios", detail: "Near-neutral plum surfaces keep attention on content; orchid appears only when something can change.", colors: ["oklch(0.985 0.006 305)", "oklch(0.94 0.012 305)", "oklch(0.52 0.18 305)", "oklch(0.43 0.018 305)", "oklch(0.16 0.018 305)"] },
  { id: "field-green", category: "Palettes", name: "Field Green", summary: "Oat paper, moss action, forest ink", bestFor: "Food, climate, and outdoor work", detail: "A grounded system with tinted neutrals and a moss accent that stays practical rather than rustic.", colors: ["oklch(0.97 0.018 105)", "oklch(0.92 0.028 112)", "oklch(0.46 0.12 145)", "oklch(0.43 0.035 135)", "oklch(0.18 0.03 145)"] },
  { id: "signal-orange", category: "Palettes", name: "Signal Orange", summary: "Stone paper with decisive orange", bestFor: "Tools, logistics, and sport", detail: "Low-chroma stone does the heavy lifting while orange marks the exact place to act.", colors: ["oklch(0.97 0.012 68)", "oklch(0.91 0.018 62)", "oklch(0.58 0.19 42)", "oklch(0.42 0.028 55)", "oklch(0.17 0.022 48)"], accentInk: "oklch(0.17 0.022 48)" },
  { id: "civic-blue", category: "Palettes", name: "Civic Blue", summary: "Cool paper, public blue, navy ink", bestFor: "Public services and healthcare", detail: "A sober blue system built for instruction, trust, and high-stakes next actions without corporate gloss.", colors: ["oklch(0.975 0.012 245)", "oklch(0.925 0.022 245)", "oklch(0.47 0.15 252)", "oklch(0.43 0.03 245)", "oklch(0.18 0.035 248)"] },
  { id: "coral-note", category: "Palettes", name: "Coral Note", summary: "Soft shell paper with coral marks", bestFor: "Personal tools and communities", detail: "Friendly without becoming childish; coral stays small and the surrounding surfaces remain quiet.", colors: ["oklch(0.978 0.018 38)", "oklch(0.93 0.032 35)", "oklch(0.6 0.16 28)", "oklch(0.44 0.035 28)", "oklch(0.19 0.028 24)"], accentInk: "oklch(0.19 0.028 24)" },
  { id: "library-red", category: "Palettes", name: "Library Red", summary: "Book paper, oxblood action, charcoal ink", bestFor: "Archives, culture, and long-form", detail: "A print-aware palette that supports long reading and uses oxblood for references and decisions.", colors: ["oklch(0.965 0.02 78)", "oklch(0.9 0.026 72)", "oklch(0.43 0.14 24)", "oklch(0.4 0.03 46)", "oklch(0.17 0.022 36)"] },
  { id: "marine", category: "Palettes", name: "Marine", summary: "Salt paper, teal action, deep-water ink", bestFor: "Travel, finance, and data", detail: "Teal separates interactive state from dense information while a blue-green ink keeps the system coherent.", colors: ["oklch(0.975 0.014 195)", "oklch(0.92 0.026 195)", "oklch(0.48 0.11 192)", "oklch(0.42 0.03 200)", "oklch(0.17 0.028 205)"] },
  { id: "gold-standard", category: "Palettes", name: "Gold Standard", summary: "Ivory paper, bronze action, umber ink", bestFor: "Luxury and considered commerce", detail: "A low-chroma material palette; bronze works as a precise signal instead of a broad premium wash.", colors: ["oklch(0.975 0.022 88)", "oklch(0.925 0.032 86)", "oklch(0.53 0.105 72)", "oklch(0.42 0.032 70)", "oklch(0.18 0.025 62)"], accentInk: "oklch(0.18 0.025 62)" },
  { id: "night-plum", category: "Palettes", name: "Night Plum", summary: "Dark plum surfaces with lit orchid action", bestFor: "Dark-first products and media", detail: "Elevation comes from lighter surfaces, never glow. The accent remains clear without lighting the whole room.", colors: ["oklch(0.1513 0.0205 309.47)", "oklch(0.2136 0.0328 306.72)", "oklch(0.7756 0.1104 304.73)", "oklch(0.7149 0.0278 316.1)", "oklch(0.9583 0.0118 313.22)"] },
  { id: "carbon-lime", category: "Palettes", name: "Carbon & Lime", summary: "Dark carbon with a measured lime signal", bestFor: "Operations and live data", detail: "A dark technical system where lime marks active state and progress, not decorative energy.", colors: ["oklch(0.15 0.018 132)", "oklch(0.21 0.022 132)", "oklch(0.78 0.14 125)", "oklch(0.7 0.025 132)", "oklch(0.95 0.012 128)"] },
]

const motions: StudioAsset[] = [
  { id: "press", category: "Motion", name: "Press", summary: "A control settles by one pixel", bestFor: "Buttons and choices", detail: "Immediate physical feedback on press, then a quick return. Focus never moves or fades.", motion: "press" },
  { id: "quiet-enter", category: "Motion", name: "Quiet Enter", summary: "One contained object arrives", bestFor: "Menus and supporting panels", detail: "Opacity and a short eight-pixel movement explain where an object came from, once.", motion: "enter" },
  { id: "state-swap", category: "Motion", name: "State Swap", summary: "Old content leaves before new content arrives", bestFor: "Tabs and view changes", detail: "A brief crossfade keeps attention anchored without sliding the whole interface sideways.", motion: "swap" },
  { id: "row-reveal", category: "Motion", name: "Row Reveal", summary: "A result joins the list", bestFor: "Search, filters, and feeds", detail: "The new row fades and settles from four pixels so its position is immediately clear.", motion: "reveal" },
  { id: "rule-draw", category: "Motion", name: "Rule Draw", summary: "A dividing line confirms progress", bestFor: "Steppers and timelines", detail: "Scale transforms a rule from its origin; no width animation and no decorative loop.", motion: "draw" },
  { id: "number-tick", category: "Motion", name: "Number Tick", summary: "A changed value resolves once", bestFor: "Dashboards and totals", detail: "The visible value updates over 400 ms while assistive technology hears only the final number.", motion: "count" },
  { id: "dialog-open", category: "Motion", name: "Dialog Open", summary: "A focused task settles into place", bestFor: "Dialogs and command menus", detail: "A short scale and fade explain focus. Reduced motion keeps only the fade.", motion: "open" },
  { id: "dialog-close", category: "Motion", name: "Dialog Close", summary: "A focused task yields to its origin", bestFor: "Dialogs and sheets", detail: "The exit is shorter than the entrance and returns attention to the triggering control.", motion: "close" },
  { id: "field-ready", category: "Motion", name: "Field Ready", summary: "The field confirms focus immediately", bestFor: "Forms", detail: "The ring appears without animation; a subtle surface change can follow over 120 ms.", motion: "press" },
  { id: "validation-arrival", category: "Motion", name: "Validation Arrival", summary: "Guidance replaces helper text in place", bestFor: "Form correction", detail: "No shake. The message and icon appear where the helper already lived, preventing layout shift.", motion: "swap" },
  { id: "menu-open", category: "Motion", name: "Menu Open", summary: "A menu unfolds from its trigger", bestFor: "Dropdowns and action menus", detail: "A small origin-aware movement makes the relationship between trigger and choices obvious.", motion: "enter" },
  { id: "toast-arrival", category: "Motion", name: "Important Notice", summary: "A hidden result enters at the edge", bestFor: "Failures and async completion", detail: "Reserved for outcomes the user cannot otherwise see. Visible success stays silent.", motion: "reveal" },
  { id: "progress-change", category: "Motion", name: "Progress Change", summary: "A bar advances at a constant pace", bestFor: "Known-duration work", detail: "Linear functional motion makes progress readable; the surrounding interface stays still.", motion: "draw" },
  { id: "optimistic-change", category: "Motion", name: "Optimistic Change", summary: "The interface responds before the round trip", bestFor: "Toggles, saves, and reordering", detail: "The predicted result appears immediately. Only a failed rollback needs extra explanation.", motion: "swap" },
  { id: "copy-confirm", category: "Motion", name: "Copy Confirm", summary: "The label becomes the confirmation", bestFor: "Copy actions", detail: "The button swaps to “Copied” for 2.5 seconds. No toast competes with the visible result.", motion: "swap" },
  { id: "reduced-motion", category: "Motion", name: "Reduced Motion", summary: "Spatial movement becomes a quick fade", bestFor: "Every motion recipe", detail: "Functional state change remains while vestibular movement is removed at the user’s request.", motion: "swap" },
]

const textTreatments: StudioAsset[] = [
  { id: "solid-display", category: "Text", name: "Solid Display", summary: "Large roman type with tight tracking", bestFor: "Primary statements", detail: "Weight, scale, and measure create the effect. No gradient, glow, or italicized keyword.", sample: "Make the next move obvious." },
  { id: "drawn-underline", category: "Text", name: "Decision Underline", summary: "A firm rule marks one phrase", bestFor: "Links and selected language", detail: "A solid underline grows only on selection or hover and preserves the text’s full contrast.", sample: "Choose what matters." },
  { id: "boxed-word", category: "Text", name: "Boxed Word", summary: "A hairline frame names the operative word", bestFor: "Campaigns and labels", detail: "One short word receives a tactile frame; it is meaning, not decoration.", sample: "Ready to ship." },
  { id: "ink-reversal", category: "Text", name: "Ink Reversal", summary: "Paper text on a compact ink block", bestFor: "Short calls and status", detail: "The surface flips together with its text token. Keep it to a short phrase, never a whole paragraph.", sample: "MAKE IT CLEAR" },
  { id: "quiet-caps", category: "Text", name: "Quiet Caps", summary: "Tracked capitals for compact labels", bestFor: "Metadata and controls", detail: "Small caps identify a type of information; they never replace body copy or become section decoration.", sample: "PROJECT DIRECTION" },
  { id: "tabular-statement", category: "Text", name: "Tabular Statement", summary: "Aligned figures carry the message", bestFor: "Totals and product proof", detail: "Tabular numbers let values compare cleanly without inventing dramatic stat treatments.", sample: "179 pieces · 114 tools" },
  { id: "editorial-lead", category: "Text", name: "Editorial Lead", summary: "A measured opening line with generous leading", bestFor: "Stories and content pages", detail: "A serif-ready recipe uses measure and breathing room to invite reading, not ornamental styling.", sample: "A useful system starts with what must be understood." },
  { id: "mono-receipt", category: "Text", name: "Project Receipt", summary: "Mono type records a decision", bestFor: "Specs, versions, and handoffs", detail: "A restrained mono note makes system decisions feel recorded and repeatable.", sample: "landing · precise · purple-rain" },
  { id: "offset-shadow", category: "Text", name: "Print Offset", summary: "A hard one-pixel print echo", bestFor: "One campaign word", detail: "A solid, hard offset can give one word physical character. Never blur it into glow.", sample: "PUBLISHED" },
  { id: "rule-heading", category: "Text", name: "Rule Heading", summary: "A heading sits on a structural line", bestFor: "Indexes and section changes", detail: "The rule belongs to layout, helping the reader scan rather than decorating the words.", sample: "What the system includes" },
  { id: "reading-highlight", category: "Text", name: "Reading Mark", summary: "A flat paper tint marks selected text", bestFor: "Research and review", detail: "An opaque tint preserves contrast and behaves like a highlighter without translucent visual effects.", sample: "Keep this part." },
  { id: "action-link", category: "Text", name: "Action Link", summary: "A verb and arrow share one baseline", bestFor: "Secondary movement", detail: "Specific language and a small directional mark make the destination clear without button chrome.", sample: "Open the full project →" },
]

const brandTools: StudioAsset[] = [
  { id: "brand-brief", category: "Brand", name: "Brand Brief", summary: "Purpose, audience, promise, and proof", bestFor: "Starting any identity", detail: "Turns a loose description into four testable statements before any visual direction is chosen." },
  { id: "positioning", category: "Brand", name: "Positioning Frame", summary: "Who it serves and why it is different", bestFor: "Products entering a crowded category", detail: "Names the category, audience, alternative, difference, and evidence without inflated claims." },
  { id: "voice-system", category: "Brand", name: "Voice System", summary: "Vocabulary, cadence, and refusal list", bestFor: "Keeping every surface recognizably yours", detail: "Defines how the brand speaks in headlines, instructions, errors, success, and difficult moments." },
  { id: "naming", category: "Brand", name: "Naming Workshop", summary: "Territories, candidates, and pressure tests", bestFor: "New products and features", detail: "Builds names from the actual product and audience, then checks clarity, pronunciation, and stretch." },
  { id: "wordmark", category: "Brand", name: "Wordmark Direction", summary: "Typographic logo structure and spacing", bestFor: "Identity foundations", detail: "Defines case, weight, tracking, punctuation, clear space, and small-size behavior before drawing variants." },
  { id: "mark-system", category: "Brand", name: "Mark System", summary: "Primary mark, compact mark, and favicon", bestFor: "Brands that need recognition at many sizes", detail: "Sets a family relationship among the full signature, a compact symbol, and the smallest digital mark." },
  { id: "art-direction", category: "Brand", name: "Art Direction", summary: "Image rules, crops, subjects, and exclusions", bestFor: "Campaigns, commerce, and editorial", detail: "Creates a repeatable point of view for photography or illustration instead of a folder of unrelated references." },
  { id: "brand-palette", category: "Brand", name: "Brand Palette", summary: "Color roles before color values", bestFor: "Durable multi-surface brands", detail: "Assigns paper, ink, action, support, success, and danger roles so color remains functional as the brand grows." },
  { id: "brand-type", category: "Brand", name: "Brand Typography", summary: "Display, body, and outlier roles", bestFor: "A recognizable voice across product and campaign", detail: "Pairs faces by role, documents licenses, and defines scale, measure, fallback, and language coverage." },
  { id: "signature", category: "Brand", name: "Signature Detail", summary: "One repeatable behavior people remember", bestFor: "Moving beyond a generic visual system", detail: "Finds one structural or interactive motif that can recur without turning into decoration." },
  { id: "brand-governance", category: "Brand", name: "Brand Governance", summary: "Rules, owners, and exception paths", bestFor: "Teams and growing systems", detail: "Records what is fixed, what can vary, who approves changes, and how experiments become standards." },
  { id: "brand-audit", category: "Brand", name: "Brand Consistency Audit", summary: "A visible check across every public surface", bestFor: "Existing products with drift", detail: "Compares voice, type, color, imagery, components, and motion, then turns gaps into ordered repairs." },
]

const templates: StudioAsset[] = [
  { id: "landing-product", category: "Templates", name: "Product Landing", summary: "Promise, proof, product, decision", bestFor: "Launching a digital product", detail: "A focused marketing page with real proof, a visible product story, pricing when relevant, and one final decision." },
  { id: "landing-service", category: "Templates", name: "Service Landing", summary: "Problem, method, work, fit", bestFor: "Studios, consultants, and services", detail: "Shows how the work happens, what has been delivered, and who the engagement is right for." },
  { id: "campaign", category: "Templates", name: "Campaign Page", summary: "One idea carried with conviction", bestFor: "Launches, events, and announcements", detail: "A distinct art-directed page that supports one timely action without inheriting a generic SaaS structure." },
  { id: "app-dashboard", category: "Templates", name: "App Dashboard", summary: "Current state, next action, supporting detail", bestFor: "Operational products", detail: "Prioritizes the current object and the next action, then lets data recede in deliberate layers." },
  { id: "app-workspace", category: "Templates", name: "App Workspace", summary: "Navigation, canvas, inspector", bestFor: "Creation and editing tools", detail: "A flexible work surface with predictable selection, editing, saving, and keyboard behavior." },
  { id: "app-mobile", category: "Templates", name: "Mobile Product", summary: "One-thumb routes and clear recovery", bestFor: "Daily-use consumer tools", detail: "Built around touch, interruption, offline states, and a small number of repeatable actions." },
  { id: "shop-home", category: "Templates", name: "Shop Home", summary: "Point of view before product grid", bestFor: "Independent commerce", detail: "Establishes the world of the shop, then gives collections and products room to be judged visually." },
  { id: "shop-collection", category: "Templates", name: "Collection", summary: "Browse, compare, filter, remember", bestFor: "Catalogs with meaningful choice", detail: "Balances product imagery with filters, sorting, inventory, and persistent context without crowding the page." },
  { id: "shop-product", category: "Templates", name: "Product Detail", summary: "Understand, trust, choose, buy", bestFor: "Physical and digital goods", detail: "Makes variation, price, delivery, evidence, and the buying decision legible in the right order." },
  { id: "shop-checkout", category: "Templates", name: "Checkout", summary: "A calm path from cart to receipt", bestFor: "Any transaction", detail: "Reduces decisions, preserves totals, validates without surprise, and makes recovery easy." },
  { id: "publication-home", category: "Templates", name: "Publication Home", summary: "Latest, important, and worth keeping", bestFor: "Magazines and independent media", detail: "Uses editorial hierarchy rather than a uniform card wall to reveal what matters now." },
  { id: "article", category: "Templates", name: "Article", summary: "Reading, context, references, next piece", bestFor: "Long-form content", detail: "A measured reading surface with strong type, useful metadata, notes, and calm onward movement." },
  { id: "portfolio", category: "Templates", name: "Portfolio", summary: "Work first, point of view close behind", bestFor: "Designers and studios", detail: "Lets projects carry the argument while the maker’s role, constraints, and contribution remain explicit." },
  { id: "case-study", category: "Templates", name: "Case Study", summary: "Context, decisions, work, result", bestFor: "Explaining complex project work", detail: "Shows the thinking and tradeoffs behind the visible result without inventing metrics or hiding collaborators." },
  { id: "docs", category: "Templates", name: "Documentation", summary: "Find, understand, try, recover", bestFor: "Products with learning curves", detail: "Search-led information architecture with task-oriented pages, examples, and clear next paths." },
  { id: "marketplace", category: "Templates", name: "Marketplace", summary: "Discover, evaluate, trust, transact", bestFor: "Multi-provider platforms", detail: "Makes quality, fit, availability, and reputation comparable while protecting both sides of the transaction." },
]

const prompts: StudioAsset[] = [
  { id: "prompt-brief", category: "Prompts", name: "Turn my idea into a brief", summary: "Find the real product, audience, and job", bestFor: "An early or messy idea", detail: "Asks only the questions that materially change the design, then records the assumptions.", prompt: "Turn this idea into a clear project brief. Find the audience, the job they need done, the strongest proof, and the first useful release:" },
  { id: "prompt-direction", category: "Prompts", name: "Show me three directions", summary: "Create visibly different, defensible routes", bestFor: "Choosing how a project should feel", detail: "Produces three directions with different structure, type, color, motion, and a reason each fits.", prompt: "Show me three genuinely different visual directions for this project. Explain each in plain language and make them tactile enough to compare:" },
  { id: "prompt-brand", category: "Prompts", name: "Build the brand foundation", summary: "Position, voice, type, color, and signature", bestFor: "A new or inconsistent brand", detail: "Creates the minimum complete brand system before producing campaign surfaces.", prompt: "Build a complete brand foundation from this description. Include positioning, voice, typography, color roles, imagery rules, and one signature detail:" },
  { id: "prompt-audit", category: "Prompts", name: "Audit what I already have", summary: "Find drift, friction, and generic decisions", bestFor: "An existing product", detail: "Reviews the experience visually and behaviorally, then orders fixes by user impact.", prompt: "Audit this existing product. Find what feels unclear, generic, inconsistent, inaccessible, or unfinished. Show the highest-impact repairs first:" },
  { id: "prompt-landing", category: "Prompts", name: "Make the landing page", summary: "Turn a clear offer into a real page", bestFor: "A product or service launch", detail: "Chooses a fitting page structure, writes specific copy, builds the responsive experience, and checks it in the browser.", prompt: "Design and build a complete landing page for this offer. Use real structure, specific copy, responsive behavior, and a visible product story:" },
  { id: "prompt-app", category: "Prompts", name: "Design the app", summary: "Map the job into screens and states", bestFor: "A working software product", detail: "Starts with the core loop, then designs navigation, screens, empty states, errors, loading, and recovery.", prompt: "Design the product app from this description. Start with the core user loop, then build the screens, navigation, states, and interactions needed to make it work:" },
  { id: "prompt-shop", category: "Prompts", name: "Build the shop", summary: "Create a coherent path from discovery to receipt", bestFor: "Ecommerce", detail: "Shapes the merchandising, collection, product, cart, and checkout experience as one system.", prompt: "Design a complete ecommerce experience for this business. Include the shop home, collections, product details, cart, checkout, and post-purchase states:" },
  { id: "prompt-content", category: "Prompts", name: "Create the publication", summary: "Build hierarchy for reading and discovery", bestFor: "Editorial and content products", detail: "Defines content types, reading surfaces, archive behavior, search, and onward movement.", prompt: "Design a complete content publication for this subject. Create the information hierarchy, home, article, archive, search, and subscription experience:" },
  { id: "prompt-system", category: "Prompts", name: "Create the design system", summary: "Turn direction into tokens, components, and rules", bestFor: "Products that need consistency", detail: "Builds foundations and interaction standards before expanding components and patterns.", prompt: "Turn this visual direction into a production design system. Define type, color, spacing, shape, depth, motion, accessibility, components, and usage rules:" },
  { id: "prompt-components", category: "Prompts", name: "Expand the component kit", summary: "Fill real workflow gaps without component theater", bestFor: "A growing UI library", detail: "Inventories product needs, groups them by family, then builds complete states and patterns.", prompt: "Expand this component kit around the real product workflows. Include every state, responsive behavior, keyboard behavior, and a visual showroom:" },
  { id: "prompt-motion", category: "Prompts", name: "Give the product motion", summary: "Add only movement that explains change", bestFor: "A static or uneven interface", detail: "Creates named timing, easing, and interaction recipes with reduced-motion behavior.", prompt: "Create a motion system for this product. Keep only movement that clarifies state, origin, progress, or consequence, and include reduced-motion behavior:" },
  { id: "prompt-accessibility", category: "Prompts", name: "Make it work for everyone", summary: "Repair keyboard, contrast, touch, and screen-reader gaps", bestFor: "Any production release", detail: "Checks complete interaction states and turns accessibility findings into visible product improvements.", prompt: "Review this product for accessibility. Test keyboard use, focus, labels, contrast, touch targets, motion preferences, screen readers, and every error state. Fix the failures:" },
  { id: "prompt-copy", category: "Prompts", name: "Make the words clearer", summary: "Replace vague language with useful instructions", bestFor: "Products with placeholder or marketing-heavy copy", detail: "Rewrites headings, actions, forms, errors, empty states, and explanations in one consistent voice.", prompt: "Rewrite this product in clear, specific language. Fix the headlines, actions, form labels, helper text, errors, empty states, and success moments:" },
  { id: "prompt-responsive", category: "Prompts", name: "Finish every screen size", summary: "Make the layout behave from 320 to 1920", bestFor: "Desktop-first or fragile work", detail: "Tests the actual content at key widths and fixes overflow, wrapping, density, reach, and hierarchy.", prompt: "Finish the responsive design for this product. Test it at 320, 375, 414, 768, 1280, and 1920 pixels, then fix every overflow, wrap, hierarchy, and touch issue:" },
  { id: "prompt-ship", category: "Prompts", name: "Take it all the way live", summary: "Build, test, deploy, and prove the release", bestFor: "A project that should be finished", detail: "Completes the product, tests the real interactions, deploys it, and verifies the live version.", prompt: "Finish this project and take it live. Build the complete experience, test it in a real browser, deploy it, and prove every important path works:" },
  { id: "prompt-renovate", category: "Prompts", name: "Renovate without losing the good parts", summary: "Clean up a product while preserving its identity", bestFor: "Mature or messy codebases", detail: "Finds the design decisions worth keeping, removes drift and rot, and checks for regressions.", prompt: "Renovate this existing product. Preserve what is distinctive, remove design and code drift, simplify the system, and prove the important journeys still work:" },
]

const skills: StudioAsset[] = [
  { id: "skill-studio-director", category: "Skills", name: "Studio Director", summary: "Run the complete brief-to-live workflow", bestFor: "Autonomous project ownership", detail: "Keeps discovery, direction, templates, build, quality, deployment, and proof connected while the user stays in plain language." },
  { id: "skill-design-ship", category: "Skills", name: "Design & Ship", summary: "Take an English brief to a proven live product", bestFor: "End-to-end project delivery", detail: "Discovers constraints, chooses a direction, builds the system, completes the product, tests it visually, and deploys it." },
  { id: "skill-brand-system", category: "Skills", name: "Brand System", summary: "Create a complete identity foundation", bestFor: "New brands and brand renovations", detail: "Builds positioning, voice, typography, color, image direction, signature behavior, and governance." },
  { id: "skill-ui-system", category: "Skills", name: "Interface System", summary: "Create tokens, components, patterns, and states", bestFor: "Products that must scale", detail: "Turns product jobs into a coherent, accessible, registry-ready design engineering system." },
  { id: "skill-template-foundry", category: "Skills", name: "Template Foundry", summary: "Compose complete connected project systems", bestFor: "Reusable launch, app, shop, content, and service foundations", detail: "Creates the real pages, hierarchy, journeys, states, and responsive behavior that make a template useful before customization." },
  { id: "skill-creative-labs", category: "Skills", name: "Creative Labs", summary: "Tune brand, type, color, text, and motion together", bestFor: "Distinctive and coherent creative direction", detail: "Builds a joined-up visual language, applies it to real product surfaces, and tests it across states and screens." },
  { id: "skill-release-audit", category: "Skills", name: "Release Audit", summary: "Prove the experience before it ships", bestFor: "Every production handoff", detail: "Runs quality, accessibility, responsive, interaction, registry, build, and live-deployment checks." },
  { id: "skill-smooth-elevation", category: "Skills", name: "Smooth Elevation", summary: "Give every raised surface one continuous edge", bestFor: "Cards, menus, sheets, dialogs, and toasts", detail: "Chooses the smallest useful depth, replaces border-plus-shadow double edges with one integrated hairline, and proves the result in light and dark." },
  { id: "skill-component-guides", category: "Skills", name: "Component Guides", summary: "Build every component from one complete operating guide", bestFor: "Adding, reviewing, or repairing reusable interface pieces", detail: "Chooses the right piece, names its events and visible states, preserves product ownership, and proves accessibility, phone behavior, failure, and recovery." },
]

const agents: StudioAsset[] = [
  { id: "agent-director", category: "Agents", name: "Design Director", summary: "Keeps the whole project coherent", bestFor: "Direction and final calls", detail: "Holds the brief, compares routes, protects the visual thesis, and decides when the system is ready to move forward." },
  { id: "agent-brand", category: "Agents", name: "Brand Designer", summary: "Builds recognition beyond the interface", bestFor: "Identity, voice, and art direction", detail: "Owns positioning, naming, voice, type, palette, image behavior, and the brand’s repeatable signature." },
  { id: "agent-product", category: "Agents", name: "Product Designer", summary: "Makes the user’s next move obvious", bestFor: "Flows, screens, and interaction", detail: "Maps the core job, chooses the information hierarchy, designs states, and resolves friction before decoration." },
  { id: "agent-engineer", category: "Agents", name: "Design Engineer", summary: "Turns the system into a real product", bestFor: "Components, responsiveness, and performance", detail: "Builds production interfaces that preserve the visual direction across devices and complete interaction states." },
  { id: "agent-motion", category: "Agents", name: "Motion Designer", summary: "Explains change through restrained movement", bestFor: "Transitions, feedback, and reduced motion", detail: "Defines timing and behavior only where movement clarifies origin, state, progress, or consequence." },
  { id: "agent-qa", category: "Agents", name: "Quality Lead", summary: "Refuses to call broken work finished", bestFor: "Accessibility, visual QA, and release proof", detail: "Tests every important path, viewport, state, build, and live surface, then records exactly what passed." },
]

export const studioAssets: StudioAsset[] = [
  ...fonts,
  ...icons,
  ...palettes,
  ...motions,
  ...textTreatments,
  ...brandTools,
  ...templates,
  ...prompts,
  ...skills,
  ...agents,
]

export const studioCounts = Object.fromEntries(
  studioCategories.map(({ name }) => [name, studioAssets.filter((asset) => asset.category === name).length]),
) as Record<StudioCategory, number>
