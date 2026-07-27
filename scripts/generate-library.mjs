import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const tokenUrl = "https://kit.scottelling.com/r/tokens.json"
const applicationItems = new Map([
  ["application-shell", "registry/purple-rain/application/application-shell.tsx"],
  ["workspace-tree", "registry/purple-rain/application/workspace-tree.tsx"],
  ["viewer-shell", "registry/purple-rain/application/viewer-shell.tsx"],
  ["editor-toolbar", "registry/purple-rain/application/editor-toolbar.tsx"],
  ["task-board", "registry/purple-rain/application/task-board.tsx"],
  ["task-rail", "registry/purple-rain/application/task-rail.tsx"],
  ["status-bar", "registry/purple-rain/application/status-bar.tsx"],
  ["mobile-app-nav", "registry/purple-rain/application/mobile-app-nav.tsx"],
  ["terminal-surface", "registry/purple-rain/application/terminal-surface.tsx"],
  ["document-surface", "registry/purple-rain/application/document-surface.tsx"],
])
const coreNames = new Set(["button", "card", "input", "badge", "dialog", ...applicationItems.keys()])

const families = [
  {
    name: "Foundations",
    purpose: "See how {title} shapes every screen.",
    items: [
      ["color-swatch", "color"], ["type-specimen", "type"], ["spacing-guide", "spacing"],
      ["radius-guide", "radius"], ["shadow-guide", "shadow"], ["focus-ring", "focus"],
      ["separator", "separator"], ["surface", "surface"], ["container", "layout"], ["stack", "layout"],
    ],
  },
  {
    name: "Actions",
    purpose: "{title} keeps the next move clear and touchable.",
    items: [
      ["button", "button"], ["button-group", "button-group"], ["icon-button", "icon-button"],
      ["split-button", "split-button"], ["menu-button", "menu"], ["toggle-button", "toggle"],
      ["toggle-group", "toggle-group"], ["segmented-control", "segments"],
      ["floating-action-button", "floating"], ["link-button", "link"], ["copy-button", "copy"],
      ["favorite-button", "favorite"], ["toolbar", "toolbar"], ["bulk-action-bar", "bulk"],
    ],
  },
  {
    name: "Forms",
    purpose: "{title} collects a choice without hiding its state.",
    items: [
      ["input", "input"], ["textarea", "textarea"], ["select", "select"], ["checkbox", "checkbox"],
      ["checkbox-group", "checkbox-group"], ["radio-group", "radio"], ["switch", "switch"],
      ["slider", "slider"], ["range-slider", "range"], ["progress", "progress"], ["meter", "meter"],
      ["file-upload", "file"], ["dropzone", "dropzone"], ["otp-input", "otp"],
      ["search-field", "search"], ["combobox", "combobox"], ["date-picker", "date"],
      ["time-input", "time"], ["number-input", "number"], ["password-input", "password"],
      ["color-input", "color-input"], ["rating", "rating"], ["field", "field"], ["inline-edit", "edit"],
    ],
  },
  {
    name: "Navigation",
    purpose: "{title} keeps place and direction easy to scan.",
    items: [
      ["tabs", "tabs"], ["breadcrumb", "breadcrumb"], ["pagination", "pagination"], ["stepper", "stepper"],
      ["sidebar", "sidebar"], ["topbar", "topbar"], ["bottom-nav", "bottom-nav"],
      ["navigation-menu", "nav-menu"], ["command-menu", "command"], ["filter-tabs", "filter-tabs"],
      ["view-switcher", "view"], ["page-header", "page-header"], ["back-link", "back"],
      ["anchor-nav", "anchor"], ["table-of-contents", "toc"], ["app-switcher", "app-switcher"],
    ],
  },
  {
    name: "Overlays",
    purpose: "{title} brings a focused task forward without losing context.",
    items: [
      ["dialog", "dialog"], ["alert-dialog", "alert-dialog"], ["sheet", "sheet"], ["drawer", "drawer"],
      ["popover", "popover"], ["tooltip", "tooltip"], ["dropdown-menu", "dropdown"],
      ["context-menu", "context"], ["hover-card", "hover"], ["command-palette", "palette"],
      ["lightbox", "lightbox"], ["action-menu", "action-menu"],
    ],
  },
  {
    name: "Feedback",
    purpose: "{title} makes the current state visible at a glance.",
    items: [
      ["badge", "badge"], ["alert", "alert"], ["banner", "banner"], ["toast", "toast"],
      ["snackbar", "snackbar"], ["empty-state", "empty"], ["skeleton", "skeleton"],
      ["loading-dots", "dots"], ["spinner", "spinner"], ["status-dot", "status"],
      ["progress-card", "progress-card"], ["error-state", "error"], ["success-state", "success"],
      ["offline-state", "offline"],
    ],
  },
  {
    name: "Data",
    purpose: "{title} turns information into a readable, useful object.",
    items: [
      ["card", "card"], ["avatar", "avatar"], ["avatar-group", "avatar-group"], ["table", "table"],
      ["data-table", "data-table"], ["description-list", "description"], ["list", "list"],
      ["list-item", "list-item"], ["stat", "stat"], ["stat-group", "stat-group"],
      ["timeline", "timeline"], ["activity-feed", "activity"], ["calendar", "calendar"],
      ["agenda", "agenda"], ["accordion", "accordion"], ["collapsible", "collapsible"],
      ["carousel", "carousel"], ["bar-chart", "bar-chart"], ["donut-chart", "donut"], ["tree-view", "tree"],
    ],
  },
  {
    name: "Patterns",
    purpose: "{title} assembles related pieces into a complete task.",
    items: [
      ["app-shell", "app-shell"], ["auth-card", "auth"], ["sign-in-form", "sign-in"],
      ["sign-up-form", "sign-up"], ["forgot-password-form", "forgot"], ["profile-form", "profile"],
      ["settings-panel", "settings"], ["invite-form", "invite"], ["contact-form", "contact"],
      ["feedback-form", "feedback-form"], ["checkout-form", "checkout"], ["cart-summary", "cart"],
      ["order-summary", "order"], ["pricing-card", "pricing-card"], ["pricing-table", "pricing-table"],
      ["filter-bar", "filter-bar"], ["search-results", "results"], ["notification-center", "notifications"],
      ["application-shell", "application-shell"], ["workspace-tree", "workspace-tree"],
      ["viewer-shell", "viewer-shell"], ["editor-toolbar", "editor-toolbar"],
      ["task-board", "task-board"], ["task-rail", "task-rail"],
      ["status-bar", "status-bar"], ["mobile-app-nav", "mobile-app-nav"],
      ["terminal-surface", "terminal-surface"], ["document-surface", "document-surface"],
    ],
  },
]

const initialisms = new Map([["otp", "OTP"], ["ui", "UI"]])

function titleize(name) {
  return name.split("-").map((word) => initialisms.get(word) ?? `${word[0].toUpperCase()}${word.slice(1)}`).join(" ")
}

function componentName(name) {
  return titleize(name).replaceAll(" ", "")
}

function descriptionFor(family, title) {
  return family.purpose.replace("{title}", title)
}

const library = families.flatMap((family) => family.items.map(([name, preview]) => {
  const title = titleize(name)
  return { name, title, category: family.name, description: descriptionFor(family, title), preview }
}))

if (library.length !== 138) throw new Error(`Expected 138 components, found ${library.length}.`)
if (new Set(library.map((item) => item.name)).size !== library.length) throw new Error("Component names must be unique.")

const base = "rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)]"
const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
const control = `${base} min-h-11 px-4 text-sm font-semibold ${focus}`

function sourceBody(item) {
  const { category, name, preview, title } = item
  const slot = name

  if (category === "Foundations") {
    if (preview === "color") return `<div data-slot="${slot}" className={cn("grid grid-cols-5 gap-2", className)} {...props}>{["bg-background", "bg-card", "bg-primary", "bg-positive", "bg-destructive"].map((tone) => <span key={tone} className={cn("min-h-20 rounded-[var(--radius-control)]", tone)} />)}</div>`
    if (preview === "type") return `<div data-slot="${slot}" className={cn("grid gap-2", className)} {...props}><strong className="text-6xl font-bold tracking-[-0.06em]">Aa</strong><span className="text-sm text-muted-foreground">Clear first. Beautiful second.</span></div>`
    if (preview === "spacing") return `<div data-slot="${slot}" className={cn("grid gap-2", className)} {...props}>{["w-1/4", "w-1/2", "w-3/4", "w-full"].map((width) => <span key={width} className={cn("h-3 rounded-full bg-primary", width)} />)}</div>`
    if (preview === "radius") return `<div data-slot="${slot}" className={cn("flex flex-wrap gap-4", className)} {...props}><span className="size-16 rounded-[var(--radius-control)] bg-muted" /><span className="size-16 rounded-[var(--radius-card)] bg-muted" /><span className="size-16 rounded-[var(--radius-sheet)] bg-muted" /></div>`
    if (preview === "shadow") return `<div data-slot="${slot}" className={cn("flex flex-wrap gap-5", className)} {...props}><span className="size-24 rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-control)]" /><span className="size-24 rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-panel)]" /></div>`
    if (preview === "focus") return `<div data-slot="${slot}" className={cn("grid place-items-center", className)} {...props}><button type="button" className="${control}">Press Tab to find me</button></div>`
    if (preview === "separator") return `<div data-slot="${slot}" className={cn("grid gap-4 text-sm text-muted-foreground", className)} {...props}><span>Before</span><hr className="border-border" /><span>After</span></div>`
    if (preview === "surface") return `<div data-slot="${slot}" className={cn("flex items-end gap-3", className)} {...props}><span className="grid size-20 place-items-center rounded-[var(--radius-control)] bg-plane-1">1</span><span className="grid size-20 -translate-y-2 place-items-center rounded-[var(--radius-control)] bg-plane-2">2</span><span className="grid size-20 -translate-y-4 place-items-center rounded-[var(--radius-control)] bg-plane-3">3</span></div>`
    if (name === "stack") return `<div data-slot="${slot}" className={cn("grid gap-3", className)} {...props}>{[1,2,3].map((row) => <span key={row} className="h-10 rounded-[var(--radius-control)] bg-muted" />)}</div>`
    return `<div data-slot="${slot}" className={cn("border border-dashed border-border p-4", className)} {...props}><div className="min-h-20 rounded-[var(--radius-control)] bg-muted" /></div>`
  }

  if (category === "Actions") {
    if (["menu", "split-button"].includes(preview)) return `<details data-slot="${slot}" className={cn("relative inline-block", className)} {...props}><summary className="${control} flex cursor-pointer list-none items-center gap-2">${title}<span aria-hidden="true">⌄</span></summary><div className="absolute left-0 top-full z-10 mt-2 grid min-w-40 gap-1 rounded-[var(--radius-card)] border border-border bg-popover p-2 text-popover-foreground shadow-[var(--shadow-panel)]"><button className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm hover:bg-muted">Open</button><button className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm hover:bg-muted">Duplicate</button></div></details>`
    if (["toggle", "favorite"].includes(preview)) return `<button data-slot="${slot}" type="button" aria-pressed={pressed} onClick={() => setPressed((value) => !value)} className={cn("${control}", pressed && "bg-primary text-primary-foreground", className)} {...props}>{pressed ? "Selected" : "${title}"}</button>`
    if (["button-group", "toggle-group", "segments", "toolbar", "bulk"].includes(preview)) return `<div data-slot="${slot}" role="group" aria-label="${title}" className={cn("inline-flex flex-wrap gap-1 rounded-[var(--radius-card)] bg-muted p-1", className)} {...props}>{["One", "Two", "Three"].map((label) => <button key={label} type="button" onClick={() => setActive(label)} aria-pressed={active === label} className="min-h-11 rounded-[var(--radius-control)] px-3 text-sm font-semibold aria-pressed:bg-primary aria-pressed:text-primary-foreground">{label}</button>)}</div>`
    return `<button data-slot="${slot}" type="button" onClick={() => setPressed((value) => !value)} className={cn("${control} active:translate-y-px", className)} {...props}>{pressed ? "${preview === "copy" ? "Copied" : "Pressed"}" : "${title}"}</button>`
  }

  if (category === "Forms") {
    if (preview === "textarea") return `<label data-slot="${slot}" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>Message<textarea className="${base} ${focus} min-h-28 resize-y px-3 py-3 font-normal" defaultValue="A clear next step." /></label>`
    if (preview === "select") return `<label data-slot="${slot}" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>Status<select className="${base} ${focus} h-11 px-3 font-normal"><option>Ready</option><option>Waiting</option><option>Blocked</option></select></label>`
    if (["checkbox", "checkbox-group", "radio", "switch"].includes(preview)) return `<fieldset data-slot="${slot}" className={cn("grid gap-3 text-sm", className)} {...props}><legend className="mb-2 font-semibold">${title}</legend>{["Keep me posted", "Send a copy"].map((label, index) => <label key={label} className="flex min-h-11 items-center gap-3"><input type="${preview === "radio" ? "radio" : "checkbox"}" name="${slot}" defaultChecked={index === 0} className="size-5 accent-primary" />{label}</label>)}</fieldset>`
    if (["slider", "range", "progress", "meter"].includes(preview)) return `<label data-slot="${slot}" className={cn("grid gap-3 text-sm font-semibold", className)} {...props}>${title}<input type="range" min="0" max="100" defaultValue="64" className="h-11 w-full accent-primary" /><span className="font-normal text-muted-foreground">64 of 100</span></label>`
    if (["file", "dropzone"].includes(preview)) return `<label data-slot="${slot}" className={cn("${base} grid min-h-28 cursor-pointer place-items-center border-dashed p-5 text-center text-sm font-semibold", className)} {...props}><span>Choose a file</span><input type="file" className="sr-only" /></label>`
    if (preview === "rating") return `<fieldset data-slot="${slot}" className={cn("flex gap-1", className)} {...props}><legend className="sr-only">Rating</legend>{[1,2,3,4,5].map((number) => <button key={number} type="button" onClick={() => setValue(String(number))} aria-label={number + " stars"} className="size-11 text-xl text-primary">{number <= Number(value || 3) ? "★" : "☆"}</button>)}</fieldset>`
    const type = preview === "date" ? "date" : preview === "time" ? "time" : preview === "number" ? "number" : preview === "password" ? "password" : preview === "color-input" ? "color" : "text"
    return `<label data-slot="${slot}" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>${title}<input type="${type}" defaultValue={${type === "text" ? '"Purple Rain"' : type === "number" ? '"12"' : "undefined"}} placeholder="Type here" className="${base} ${focus} h-11 px-3 font-normal" /></label>`
  }

  if (category === "Navigation") {
    if (["tabs", "filter-tabs", "view", "stepper", "pagination"].includes(preview)) return `<nav data-slot="${slot}" aria-label="${title}" className={cn("flex flex-wrap gap-1", className)} {...props}>{["Overview", "Details", "Notes"].map((label) => <button key={label} type="button" onClick={() => setActive(label)} aria-current={active === label ? "page" : undefined} className="min-h-11 rounded-[var(--radius-control)] px-3 text-sm font-semibold aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground">{label}</button>)}</nav>`
    return `<nav data-slot="${slot}" aria-label="${title}" className={cn("flex flex-wrap items-center gap-2 text-sm", className)} {...props}><a className="min-h-11 rounded-[var(--radius-control)] px-3 py-3 font-semibold hover:bg-muted" href="#">Home</a><span aria-hidden="true">/</span><a className="min-h-11 rounded-[var(--radius-control)] px-3 py-3 font-semibold hover:bg-muted" href="#">Library</a><span aria-current="page" className="px-3 text-muted-foreground">${title}</span></nav>`
  }

  if (category === "Overlays") return `<details data-slot="${slot}" className={cn("relative inline-block", className)} {...props}><summary className="${control} cursor-pointer list-none">Open ${title}</summary><div className="absolute left-0 top-full z-10 mt-2 min-w-56 rounded-[var(--radius-card)] border border-border bg-popover p-4 text-sm text-popover-foreground shadow-[var(--shadow-panel)]"><strong>${title}</strong><p className="mt-2 text-muted-foreground">A focused surface that keeps the current task clear.</p></div></details>`

  if (category === "Feedback") {
    if (["skeleton", "dots", "spinner"].includes(preview)) return `<div data-slot="${slot}" role="status" aria-label="Loading" className={cn("flex min-h-20 items-center gap-3", className)} {...props}><span className="size-5 animate-pulse rounded-full bg-primary" /><span className="h-3 w-28 animate-pulse rounded-full bg-muted" /></div>`
    if (preview === "empty") return `<section data-slot="${slot}" className={cn("grid justify-items-start gap-2", className)} {...props}><span className="size-10 rounded-[var(--radius-control)] bg-muted" /><strong>No notes yet</strong><p className="text-sm text-muted-foreground">Notes keep decisions nearby.</p><button type="button" className="${control} bg-primary text-primary-foreground">Add a note</button></section>`
    if (["error", "success", "offline"].includes(preview)) return `<section data-slot="${slot}" role="status" className={cn("grid justify-items-start gap-2", className)} {...props}><strong>${preview === "error" ? "Couldn’t save" : preview === "offline" ? "You’re offline" : "Changes saved"}</strong><p className="text-sm text-muted-foreground">${preview === "error" ? "Try again when you’re ready." : preview === "offline" ? "Work will sync when you reconnect." : "Everything is up to date."}</p></section>`
    return `<div data-slot="${slot}" role="status" className={cn("${base} flex min-h-16 items-center gap-3 p-4 text-sm", className)} {...props}><span className="size-3 shrink-0 rounded-full bg-primary" aria-hidden="true" /><div><strong>${title}</strong><p className="mt-1 text-muted-foreground">The current state is visible and ready to act on.</p></div></div>`
  }

  if (category === "Data") {
    if (["table", "data-table"].includes(preview)) return `<div data-slot="${slot}" className={cn("overflow-x-auto", className)} {...props}><table className="w-full min-w-80 text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3">Item</th><th className="p-3">Owner</th><th className="p-3">State</th></tr></thead><tbody><tr><td className="p-3">Release notes</td><td className="p-3">Mara</td><td className="p-3">Ready</td></tr></tbody></table></div>`
    if (["accordion", "collapsible", "tree"].includes(preview)) return `<details data-slot="${slot}" className={cn("border-b border-border py-2", className)} open {...props}><summary className="min-h-11 cursor-pointer py-3 font-semibold">${title}</summary><p className="pb-3 text-sm text-muted-foreground">The useful detail appears exactly where it is needed.</p></details>`
    if (["avatar", "avatar-group"].includes(preview)) return `<div data-slot="${slot}" className={cn("flex -space-x-3", className)} {...props}>{["MR", "ST", "EO"].slice(0, ${preview === "avatar" ? 1 : 3}).map((person) => <span key={person} className="grid size-12 place-items-center rounded-full border-2 border-background bg-primary text-sm font-bold text-primary-foreground">{person}</span>)}</div>`
    if (["list", "list-item"].includes(preview)) return `<ul data-slot="${slot}" className={cn("divide-y divide-border", className)} {...props}>{["Approve the release", "Check the notes", "Invite reviewers"].slice(0, ${preview === "list-item" ? 1 : 3}).map((label) => <li key={label} className="flex min-h-11 items-center justify-between gap-3 text-sm"><span>{label}</span><span aria-hidden="true">→</span></li>)}</ul>`
    if (["stat", "stat-group"].includes(preview)) return `<div data-slot="${slot}" className={cn("flex flex-wrap gap-3", className)} {...props}>{[["24", "Ready"], ["8", "Review"], ["3", "Blocked"]].slice(0, ${preview === "stat" ? 1 : 3}).map(([value, label]) => <div key={label} className="${base} grid min-w-28 gap-1 p-4"><strong className="text-3xl tabular-nums">{value}</strong><span className="text-sm text-muted-foreground">{label}</span></div>)}</div>`
    if (["timeline", "activity", "agenda"].includes(preview)) return `<ol data-slot="${slot}" className={cn("grid gap-3", className)} {...props}>{["09:00 Review copy", "11:30 Approve page", "14:00 Share notes"].map((label) => <li key={label} className="flex min-h-11 items-center gap-3 text-sm"><span className="size-3 rounded-full bg-primary" /><span>{label}</span></li>)}</ol>`
    if (preview === "calendar") return `<section data-slot="${slot}" className={cn("grid gap-3", className)} {...props}><header className="flex items-center justify-between"><button className="size-11" type="button">‹</button><strong>July</strong><button className="size-11" type="button">›</button></header><div className="grid grid-cols-4">{[20,21,22,23,24,25,26,27].map((day) => <button key={day} type="button" className="size-11 rounded-[var(--radius-control)] hover:bg-muted">{day}</button>)}</div></section>`
    if (preview === "carousel") return `<section data-slot="${slot}" className={cn("grid grid-cols-[auto_1fr_auto] items-stretch gap-2", className)} {...props}><button className="w-11 rounded-[var(--radius-control)] bg-muted" type="button">‹</button><div className="${base} grid min-h-28 place-items-center p-4"><strong>First idea</strong></div><button className="w-11 rounded-[var(--radius-control)] bg-muted" type="button">›</button></section>`
    if (["bar-chart", "donut"].includes(preview)) return `<figure data-slot="${slot}" className={cn("flex h-40 items-end justify-center gap-3", className)} {...props}>{["h-1/3", "h-3/4", "h-1/2", "h-full"].map((height) => <span key={height} className={cn("w-10 rounded-t-[var(--radius-control)] bg-primary", height)} />)}<figcaption className="sr-only">${title}</figcaption></figure>`
    if (preview === "description") return `<dl data-slot="${slot}" className={cn("divide-y divide-border text-sm", className)} {...props}>{[["Owner", "Mara Rivera"], ["State", "Ready"], ["Due", "Friday"]].map(([term, detail]) => <div key={term} className="grid grid-cols-2 gap-3 py-3"><dt className="text-muted-foreground">{term}</dt><dd className="font-semibold">{detail}</dd></div>)}</dl>`
    return `<section data-slot="${slot}" className={cn("${base} grid gap-2 p-4", className)} {...props}><span className="text-sm text-muted-foreground">Weekly notes</span><strong className="text-lg">4 decisions ready</strong><p className="text-sm text-muted-foreground">Everything needed for Friday’s review.</p></section>`
  }

  if (category === "Patterns") {
    if (preview === "app-shell") return `<section data-slot="${slot}" className={cn("grid min-h-56 grid-cols-[4rem_1fr] grid-rows-[3rem_1fr] overflow-hidden rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-panel)]", className)} {...props}><aside className="row-span-2 grid place-items-start justify-center bg-primary pt-4 font-bold text-primary-foreground">PR</aside><header className="flex items-center border-b border-border px-4 text-sm font-bold">Release</header><main className="grid content-center gap-2 p-5"><strong>Today</strong><span className="text-sm text-muted-foreground">Three things need you.</span></main></section>`
    if (["cart", "order"].includes(preview)) return `<section data-slot="${slot}" className={cn("${base} grid gap-3 p-5", className)} {...props}><strong className="text-lg">${title}</strong>{[["Workshop seat", "$48"], ["Delivery", "$0"], ["Total", "$48"]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-border py-2 text-sm"><span>{label}</span><b>{value}</b></div>)}<button type="button" className="${control} bg-primary text-primary-foreground">Review order</button></section>`
    if (["pricing-card", "pricing-table"].includes(preview)) return `<section data-slot="${slot}" className={cn("${base} grid gap-3 p-5", className)} {...props}><span className="text-sm text-muted-foreground">Studio</span><strong className="text-4xl tabular-nums">$24</strong><p className="text-sm text-muted-foreground">For one working team.</p><button type="button" className="${control} bg-primary text-primary-foreground">Choose Studio</button></section>`
    if (["filter-bar", "results"].includes(preview)) return `<section data-slot="${slot}" className={cn("${base} grid gap-3 p-5", className)} {...props}><label className="grid gap-2 text-sm font-semibold">Find items<input type="search" placeholder="Search" className="${base} ${focus} h-11 px-3 font-normal" /></label>{["Button", "Card", "Dialog"].map((label) => <button key={label} type="button" className="flex min-h-11 items-center justify-between border-t border-border text-left text-sm"><span>{label}</span><b>Open</b></button>)}</section>`
    if (preview === "notifications") return `<section data-slot="${slot}" className={cn("${base} grid gap-2 p-5", className)} {...props}><header className="flex justify-between gap-4"><strong>Notifications</strong><span className="text-xs text-primary">3 new</span></header>{["Mara approved the page", "Sam left a note", "Elena shared a file"].map((label) => <button key={label} type="button" className="min-h-11 border-t border-border text-left text-sm">{label}</button>)}</section>`
    return `<section data-slot="${slot}" className={cn("${base} grid gap-4 p-5", className)} {...props}><header><strong className="text-lg">${title}</strong><p className="mt-1 text-sm text-muted-foreground">A complete Purple Rain task, assembled and ready.</p></header><label className="grid gap-2 text-sm font-semibold">Email address<input type="email" placeholder="you@example.com" className="${base} ${focus} h-11 px-3 font-normal" /></label><button type="button" className="${control} bg-primary text-primary-foreground">Save changes</button></section>`
  }

  return `<div data-slot="${slot}" className={cn("${base} grid min-h-24 place-items-center p-4 text-sm font-semibold", className)} {...props}>${title}</div>`
}

function sourceFor(item) {
  const usesPressed = item.category === "Actions" && !["menu", "split-button", "button-group", "toggle-group", "segments", "toolbar", "bulk"].includes(item.preview)
  const usesActive = (item.category === "Actions" && ["button-group", "toggle-group", "segments", "toolbar", "bulk"].includes(item.preview)) ||
    (item.category === "Navigation" && ["tabs", "filter-tabs", "view", "stepper", "pagination"].includes(item.preview))
  const usesValue = item.category === "Forms" && item.preview === "rating"
  const interactive = usesPressed || usesActive || usesValue
  const component = componentName(item.name)
  let element = "div"
  if (item.category === "Actions") element = ["menu", "split-button"].includes(item.preview) ? "details" : ["button-group", "toggle-group", "segments", "toolbar", "bulk"].includes(item.preview) ? "div" : "button"
  if (item.category === "Forms") element = ["checkbox", "checkbox-group", "radio", "switch", "rating"].includes(item.preview) ? "fieldset" : "label"
  if (item.category === "Navigation") element = "nav"
  if (item.category === "Overlays") element = "details"
  if (item.category === "Feedback") element = ["empty", "error", "success", "offline"].includes(item.preview) ? "section" : "div"
  if (item.category === "Data") {
    if (["accordion", "collapsible", "tree"].includes(item.preview)) element = "details"
    else if (["table", "data-table", "avatar", "avatar-group", "stat", "stat-group"].includes(item.preview)) element = "div"
    else if (["list", "list-item"].includes(item.preview)) element = "ul"
    else if (["timeline", "activity", "agenda"].includes(item.preview)) element = "ol"
    else if (item.preview === "description") element = "dl"
    else if (["bar-chart", "donut"].includes(item.preview)) element = "figure"
    else element = "section"
  }
  if (item.category === "Patterns") element = "section"
  const composableClass = item.category === "Actions"
    ? "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
    : item.category === "Forms"
      ? "grid min-w-0 gap-2"
      : item.category === "Navigation"
        ? "flex min-w-0 flex-wrap items-center gap-2"
        : item.category === "Overlays"
          ? "rounded-[var(--radius-card)] bg-popover text-popover-foreground shadow-[var(--shadow-panel)]"
          : item.category === "Feedback"
            ? "min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground"
            : item.category === "Data"
              ? "min-w-0"
              : item.category === "Patterns"
                ? "min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground"
                : "min-w-0"
  const childElement = `<${element}${element === "button" ? ' type="button"' : ""} data-slot="${item.name}" className={cn("${composableClass}", className)} {...props}>{children}</${element}>`
  const hooks = [
    usesPressed ? '  const [pressed, setPressed] = React.useState(false)' : "",
    usesActive ? '  const [active, setActive] = React.useState("Overview")' : "",
    usesValue ? '  const [value, setValue] = React.useState("3")' : "",
  ].filter(Boolean).join("\n")
  return `${interactive ? '"use client"\n\n' : ""}import * as React from "react"\n\nimport { cn } from "@/lib/utils"\n\nexport type ${component}Props = React.ComponentPropsWithoutRef<"${element}">\n\nexport function ${component}({ children, className, ...props }: ${component}Props) {${hooks ? `\n${hooks}` : ""}\n  if (children !== undefined) {\n    return (${childElement})\n  }\n\n  return (\n    ${sourceBody(item)}\n  )\n}\n`
}

await mkdir(path.join(root, "lib"), { recursive: true })
await mkdir(path.join(root, "registry", "purple-rain", "library"), { recursive: true })
await writeFile(path.join(root, "lib", "purple-rain-library.json"), `${JSON.stringify(library, null, 2)}\n`)

for (const item of library) {
  if (coreNames.has(item.name)) continue
  await writeFile(path.join(root, "registry", "purple-rain", "library", `${item.name}.tsx`), sourceFor(item))
}

const registryPath = path.join(root, "registry.json")
const registry = JSON.parse(await readFile(registryPath, "utf8"))
const tokenItem = registry.items.find((item) => item.name === "tokens")
const coreItems = new Map(registry.items.filter((item) => coreNames.has(item.name)).map((item) => [item.name, item]))

registry.items = [tokenItem, ...library.map((item) => {
  const existing = coreItems.get(item.name)
  if (existing) return { ...existing, title: `Purple Rain ${item.title}` }
  const applicationPath = applicationItems.get(item.name)
  if (applicationPath) {
    return {
      name: item.name,
      type: "registry:ui",
      title: `Purple Rain ${item.title}`,
      description: item.description,
      registryDependencies: [tokenUrl],
      files: [{ path: applicationPath, type: "registry:ui" }],
    }
  }
  return {
    name: item.name,
    type: "registry:ui",
    title: `Purple Rain ${item.title}`,
    description: item.description,
    registryDependencies: [tokenUrl],
    files: [{ path: `registry/purple-rain/library/${item.name}.tsx`, type: "registry:ui" }],
  }
})]

await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Generated ${library.length} shared Kit components across ${families.length} families.`)
