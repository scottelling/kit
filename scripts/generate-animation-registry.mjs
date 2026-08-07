import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const purple = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"))
const sharedLibrary = JSON.parse(await readFile(path.join(root, "lib", "purple-rain-library.json"), "utf8"))
const tokens = JSON.parse(await readFile(path.join(root, "lib", "animation-tokens.json"), "utf8"))
const registryBaseUrl = process.env.ANIMATION_REGISTRY_BASE_URL?.replace(/\/$/, "") ?? "https://kit.scottelling.com/r/animation"
const tokenUrl = `${registryBaseUrl}/tokens.json`

const nativeItems = [
  ["studio-shell", "Studio Shell", "A complete creative workspace with one clear canvas, supporting rails, and an anchored timeline."],
  ["studio-header", "Studio Header", "A compact global bar for project identity, mode, device, and high-value actions."],
  ["workspace-switcher", "Workspace Switcher", "A touch-safe Story, Preview, Code, and Inspect switcher for narrow workspaces."],
  ["project-switcher", "Project Switcher", "A focused project chooser with honest saved and local states."],
  ["storyboard-rail", "Storyboard Rail", "A scroll-owned scene sequence that keeps order, timing, and selection obvious."],
  ["scene-list-item", "Scene List Item", "A scene row with thumbnail, name, timing, purpose, and unmistakable selection."],
  ["stage-viewport", "Stage Viewport", "A quiet work surface that gives the current composition visual priority."],
  ["device-frame", "Device Frame", "A solid phone, desktop, browser, or canvas frame that does not compete with authored work."],
  ["preview-toolbar", "Preview Toolbar", "A close-at-hand view, scale, and fit control for the stage."],
  ["ai-director", "AI Director", "A plain-language motion command that applies changes with visible, recoverable feedback."],
  ["command-suggestion-list", "Command Suggestions", "Keyboard-ready example directions and recent commands without hidden magic."],
  ["inspector-panel", "Inspector Panel", "A single scroll-owned place for scene, layer, and motion properties."],
  ["layer-list", "Layer List", "A readable layer stack with visibility, type, and current selection."],
  ["style-inspector", "Style Inspector", "Direct position, size, scale, radius, and content controls for one layer."],
  ["motion-inspector", "Motion Inspector", "Purpose, easing, duration, and transition controls with safe defaults."],
  ["motion-preset-picker", "Motion Preset Picker", "Purposeful Rise, Pop, Fade, directional, and Exit choices with exact timing."],
  ["transport", "Transport", "Reachable start, previous, play, next, and end controls with visible time."],
  ["motion-timeline", "Motion Timeline", "A horizontally scrollable time ruler with separate scene, motion, and layer lanes."],
  ["timeline-segment", "Timeline Segment", "A selectable time block that exposes name, duration, and current state."],
  ["playhead", "Playhead", "A keyboard-operable current-time control that stays visible across timeline lanes."],
  ["delivery-workspace", "Delivery Workspace", "A final work surface for output choice, checks, rendering, and handoff."],
  ["delivery-action", "Delivery Action", "An output action with idle, working, complete, and failed states."],
  ["render-status", "Render Status", "Honest queued, rendering, complete, and failed progress with useful next actions."],
  ["motion-check", "Motion Check", "A review list for purpose, easing, duration, travel, scale, and reduced motion."],
  ["code-panel", "Code Panel", "A readable, selectable source surface with copy and export actions."],
  ["template-gallery", "Template Gallery", "A responsive set of starting compositions with clear device and duration context."],
  ["guided-tour", "Guided Tour", "A solid, focusable callout that explains one useful region at a time."],
  ["workspace-error-boundary", "Workspace Error Boundary", "A real recovery boundary that protects the rest of the creative workspace."],
].map(([name, title, description]) => ({ name, title, description, category: "Animation Patterns", preview: name }))

function titleize(name) {
  return name.split("-").map((word) => `${word[0].toUpperCase()}${word.slice(1)}`).join("")
}

function cssVariables(values) {
  return Object.fromEntries(Object.entries(values).map(([name, value]) => [`--${name}`, value]))
}

const commonImport = `import * as React from "react"\n\nimport { cn } from "@/lib/utils"\n\n`
const clientImport = `"use client"\n\n${commonImport}`

function simpleSource(name, tag, className, body) {
  const component = titleize(name)
  return `${commonImport}export type ${component}Props = React.ComponentPropsWithoutRef<"${tag}">\n\nexport function ${component}({ children, className, ...props }: ${component}Props) {\n  return (\n    <${tag} data-slot="${name}" className={cn("${className}", className)} {...props}>\n      {children ?? (${body})}\n    </${tag}>\n  )\n}\n`
}

function sourceFor(name) {
  switch (name) {
    case "studio-shell":
      return simpleSource(name, "section", "grid min-h-[32rem] grid-cols-[14rem_minmax(20rem,1fr)_18rem] grid-rows-[3.625rem_1fr_9rem] overflow-hidden rounded-[var(--radius-sheet)] bg-background text-foreground max-[920px]:grid-cols-1 max-[920px]:grid-rows-[auto_minmax(24rem,1fr)_8rem]", `<><header className="col-span-3 border-b border-border bg-sidebar p-3 max-[920px]:col-span-1">Studio header</header><aside className="border-r border-border bg-sidebar p-3 max-[920px]:hidden">Storyboard</aside><main className="min-w-0 bg-background p-3">Canvas</main><aside className="border-l border-border bg-sidebar p-3 max-[920px]:hidden">Inspector</aside><footer className="col-span-3 border-t border-border bg-sidebar p-3 max-[920px]:col-span-1">Timeline</footer></>`)
    case "studio-header":
      return simpleSource(name, "header", "flex min-h-14 flex-wrap items-center justify-between gap-2 border-b border-border bg-sidebar px-3 text-sm", `<><div className="flex min-w-0 items-center gap-2"><span className="grid size-11 place-items-center rounded-[var(--radius-control)] bg-primary font-extrabold text-primary-foreground">A</span><div className="min-w-0"><strong className="block">Animation</strong><span className="block truncate font-mono text-[10px] text-muted-foreground">Launch sequence</span></div></div><nav className="flex gap-1" aria-label="Studio modes"><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-primary px-3 font-bold text-primary-foreground">Design</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-muted-foreground">Motion</button></nav><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground">New</button></>`)
    case "workspace-switcher":
      return `${clientImport}const views = ["Story", "Preview", "Code", "Inspect"] as const\n\nexport type WorkspaceSwitcherProps = Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> & { value?: typeof views[number]; onChange?: (value: typeof views[number]) => void }\n\nexport function WorkspaceSwitcher({ value, onChange, className, ...props }: WorkspaceSwitcherProps) {\n  const [local, setLocal] = React.useState<typeof views[number]>(value ?? "Preview")\n  const active = value ?? local\n  return <nav data-slot="workspace-switcher" aria-label="Workspace view" className={cn("grid grid-cols-4 gap-1 border-b border-border bg-sidebar p-1", className)} {...props}>{views.map((view) => <button key={view} type="button" aria-current={active === view ? "page" : undefined} onClick={() => { setLocal(view); onChange?.(view) }} className="min-h-11 rounded-[var(--radius-control)] px-2 text-xs font-bold text-muted-foreground aria-[current=page]:bg-secondary aria-[current=page]:text-foreground">{view}</button>)}</nav>\n}\n`
    case "project-switcher":
      return simpleSource(name, "details", "relative w-full max-w-sm", `<><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-[var(--radius-control)] border border-border bg-card px-3 text-sm font-bold">Launch sequence <span className="font-mono text-[10px] text-muted-foreground">Saved</span></summary><div className="absolute left-0 top-full z-20 mt-2 grid w-full gap-1 rounded-[var(--radius-card)] border border-border bg-popover p-2 shadow-[var(--shadow-panel)]"><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-secondary px-3 text-left text-sm font-bold">Launch sequence</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm text-muted-foreground">Product tour</button></div></>`)
    case "storyboard-rail":
      return simpleSource(name, "aside", "flex min-h-72 w-full max-w-xs flex-col bg-sidebar", `<><header className="flex min-h-11 items-center justify-between border-b border-border px-3"><strong className="text-xs uppercase tracking-[0.08em]">Storyboard</strong><span className="font-mono text-[10px] text-muted-foreground">3 scenes</span></header><div className="grid flex-1 content-start gap-1 overflow-y-auto p-2">{["Set", "Reveal", "Emphasize"].map((scene, index) => <button key={scene} type="button" aria-current={index === 1 ? "true" : undefined} className="grid min-h-16 grid-cols-[3rem_1fr_auto] items-center gap-2 rounded-[var(--radius-control)] px-2 text-left aria-[current=true]:bg-secondary"><span className="h-9 rounded-md bg-plane-pressed" /><strong className="text-sm">{scene}</strong><small className="font-mono text-[10px] text-muted-foreground">0{index + 1}</small></button>)}</div><button type="button" className="m-2 min-h-11 rounded-[var(--radius-control)] border border-border text-sm font-bold">Add scene</button></>`)
    case "scene-list-item":
      return `${commonImport}export type SceneListItemProps = Omit<React.ComponentPropsWithoutRef<"button">, "name"> & { name?: string; summary?: string; duration?: string; index?: number; active?: boolean }\n\nexport function SceneListItem({ name = "Reveal", summary = "Bring the next idea into focus.", duration = "1.2s", index = 2, active = false, className, ...props }: SceneListItemProps) {\n  return <button data-slot="scene-list-item" type="button" aria-current={active ? "true" : undefined} className={cn("grid min-h-20 w-full grid-cols-[3.5rem_1fr_auto] items-center gap-3 rounded-[var(--radius-control)] border border-transparent px-2 text-left aria-[current=true]:border-primary aria-[current=true]:bg-secondary", className)} {...props}><span className="h-10 rounded-md bg-plane-pressed" aria-hidden="true" /><span className="min-w-0"><strong className="block truncate text-sm">{name}</strong><span className="mt-1 block truncate text-xs text-muted-foreground">{summary}</span></span><span className="grid gap-1 text-right font-mono text-[10px] text-muted-foreground"><b className="font-normal">{duration}</b><b className="font-normal">{String(index).padStart(2, "0")}</b></span></button>\n}\n`
    case "stage-viewport":
      return simpleSource(name, "section", "grid min-h-72 place-items-center overflow-hidden rounded-[var(--radius-card)] border border-border bg-background p-4", `<div className="grid aspect-video w-full max-w-xl place-items-center rounded-[var(--radius-card)] border border-border bg-plane-pressed"><div className="grid max-w-md grid-cols-2 gap-8 px-8"><strong className="text-2xl leading-tight">Make the next idea visible.</strong><p className="m-0 text-sm text-muted-foreground">The canvas stays in front while every supporting control remains quiet.</p></div></div>`)
    case "device-frame":
      return `${commonImport}export type DeviceFrameProps = React.ComponentPropsWithoutRef<"div"> & { device?: "phone" | "desktop" | "browser" | "canvas" }\n\nexport function DeviceFrame({ device = "desktop", children, className, ...props }: DeviceFrameProps) {\n  return <div data-slot="device-frame" data-device={device} className={cn("mx-auto grid aspect-video w-full max-w-2xl place-items-center overflow-hidden rounded-[var(--radius-card)] border-[8px] border-card bg-plane-pressed data-[device=phone]:aspect-[9/16] data-[device=phone]:max-w-48 data-[device=canvas]:rounded-none data-[device=canvas]:border-0", className)} {...props}>{children ?? <span className="font-mono text-xs text-muted-foreground">{device}</span>}</div>\n}\n`
    case "preview-toolbar":
      return simpleSource(name, "div", "flex min-h-11 flex-wrap items-center justify-between gap-2 border-b border-border bg-sidebar px-2", `<><div className="flex gap-1" role="group" aria-label="Preview mode"><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-secondary px-3 text-xs font-bold">Preview</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-xs text-muted-foreground">Code</button></div><div className="flex gap-1"><button type="button" className="size-11 rounded-[var(--radius-control)]" aria-label="Fit canvas">Fit</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 font-mono text-[10px]">100%</button></div></>`)
    case "ai-director":
      return `${clientImport}export type AiDirectorProps = Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit"> & { onApply?: (command: string) => void }\n\nexport function AiDirector({ onApply, className, ...props }: AiDirectorProps) {\n  const [command, setCommand] = React.useState("")\n  const [notice, setNotice] = React.useState("Describe the motion you want.")\n  return <form data-slot="ai-director" className={cn("grid gap-2", className)} onSubmit={(event) => { event.preventDefault(); if (!command.trim()) return; onApply?.(command); setNotice("Direction applied. Undo remains available.") }} {...props}><label className="grid min-h-11 grid-cols-[1fr_auto] items-center rounded-[var(--radius-control)] border border-border bg-card pl-3"><span className="sr-only">AI Director command</span><input value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Describe the motion or change you want" className="min-w-0 bg-transparent text-sm outline-none" /><button type="submit" disabled={!command.trim()} className="m-1 min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground">Apply</button></label><p aria-live="polite" className="m-0 text-xs text-muted-foreground">{notice}</p></form>\n}\n`
    case "command-suggestion-list":
      return simpleSource(name, "div", "grid gap-1 rounded-[var(--radius-card)] border border-border bg-popover p-2 shadow-[var(--shadow-panel)]", `["Make the entrance calmer", "Hold the title longer", "Use feedback motion for the tap"].map((suggestion) => <button key={suggestion} type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{suggestion}</button>)`)
    case "inspector-panel":
      return simpleSource(name, "aside", "flex min-h-80 w-full max-w-sm flex-col bg-sidebar", `<><header className="flex min-h-11 items-center justify-between border-b border-border px-3"><strong className="text-xs uppercase tracking-[0.08em]">Inspector</strong><span className="font-mono text-[10px] text-muted-foreground">Design</span></header><nav className="grid grid-cols-3 gap-1 border-b border-border p-1" aria-label="Inspector sections">{["Scene", "Layer", "Motion"].map((label, index) => <button key={label} type="button" aria-current={index === 0 ? "page" : undefined} className="min-h-11 rounded-[var(--radius-control)] text-xs font-bold text-muted-foreground aria-[current=page]:bg-secondary aria-[current=page]:text-foreground">{label}</button>)}</nav><div className="grid gap-3 overflow-y-auto p-3"><label className="grid gap-1 text-xs font-bold">Scene name<input defaultValue="Reveal" className="min-h-11 rounded-[var(--radius-control)] border border-border bg-input px-3 text-sm font-normal" /></label><label className="grid gap-1 text-xs font-bold">On-screen message<textarea className="min-h-24 rounded-[var(--radius-control)] border border-border bg-input p-3 text-sm font-normal" /></label></div></>`)
    case "layer-list":
      return `${clientImport}const sampleLayers = ["Headline", "Supporting copy", "Background"]\n\nexport function LayerList({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {\n  const [active, setActive] = React.useState(0)\n  const [hidden, setHidden] = React.useState<number[]>([])\n  return <div data-slot="layer-list" className={cn("grid gap-1", className)} {...props}>{sampleLayers.map((layer, index) => <div key={layer} className="grid grid-cols-[2.75rem_1fr] gap-1"><button type="button" aria-label={(hidden.includes(index) ? "Show " : "Hide ") + layer} onClick={() => setHidden((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])} className="size-11 rounded-[var(--radius-control)] border border-border text-xs">{hidden.includes(index) ? "Off" : "On"}</button><button type="button" aria-current={active === index ? "true" : undefined} onClick={() => setActive(index)} className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm aria-[current=true]:bg-secondary aria-[current=true]:font-bold">{layer}</button></div>)}</div>\n}\n`
    case "style-inspector":
      return simpleSource(name, "fieldset", "grid grid-cols-2 gap-3 border-0 p-0", `<><legend className="col-span-2 mb-2 text-xs font-bold uppercase tracking-[0.08em]">Style</legend>{[["X", "120"], ["Y", "88"], ["Width", "420"], ["Scale", "100"]].map(([label, value]) => <label key={label} className="grid gap-1 text-xs font-bold text-muted-foreground">{label}<input type="number" defaultValue={value} className="min-h-11 min-w-0 rounded-[var(--radius-control)] border border-border bg-input px-3 font-mono text-xs text-foreground" /></label>)}</>`)
    case "motion-inspector":
      return simpleSource(name, "fieldset", "grid gap-3 border-0 p-0", `<><legend className="mb-2 text-xs font-bold uppercase tracking-[0.08em]">Motion</legend><label className="grid gap-1 text-xs font-bold text-muted-foreground">Purpose<select defaultValue="explanation" className="min-h-11 rounded-[var(--radius-control)] border border-border bg-input px-3 text-sm text-foreground"><option value="explanation">Explanation</option><option value="focus">Focus</option><option value="continuity">Continuity</option><option value="feedback">Feedback</option><option value="delight">Delight</option></select></label><label className="grid gap-1 text-xs font-bold text-muted-foreground">Easing<select defaultValue="easeOut" className="min-h-11 rounded-[var(--radius-control)] border border-border bg-input px-3 text-sm text-foreground"><option>easeOut</option><option>easeInOut</option><option>linear</option><option>spring</option></select></label><label className="grid gap-1 text-xs font-bold text-muted-foreground">Transition · 420ms<input type="range" min="120" max="1800" defaultValue="420" className="min-h-11 accent-primary" /></label></>`)
    case "motion-preset-picker":
      return `${clientImport}const presets = ["Rise", "Top", "Left", "Right", "Pop", "Fade", "Exit"]\n\nexport function MotionPresetPicker({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {\n  const [active, setActive] = React.useState("Rise")\n  return <div data-slot="motion-preset-picker" role="group" aria-label="Motion preset" className={cn("grid grid-cols-2 gap-1 sm:grid-cols-4", className)} {...props}>{presets.map((preset) => <button key={preset} type="button" aria-pressed={active === preset} onClick={() => setActive(preset)} className="min-h-11 rounded-[var(--radius-control)] border border-border px-3 text-xs font-bold aria-pressed:border-primary aria-pressed:bg-secondary">{preset}</button>)}</div>\n}\n`
    case "transport":
      return `${clientImport}export type TransportProps = React.ComponentPropsWithoutRef<"div"> & { time?: string; onPrevious?: () => void; onNext?: () => void }\n\nexport function Transport({ time = "00:00:86 / 00:02:72", onPrevious, onNext, className, ...props }: TransportProps) {\n  const [playing, setPlaying] = React.useState(false)\n  return <div data-slot="transport" className={cn("grid min-h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 border-y border-border bg-sidebar px-3", className)} {...props}><span className="font-mono text-[10px] text-muted-foreground">{time}</span><div className="flex items-center gap-1"><button type="button" onClick={onPrevious} className="size-11 rounded-[var(--radius-control)]" aria-label="Previous scene">‹</button><button type="button" aria-pressed={playing} onClick={() => setPlaying((value) => !value)} className="size-11 rounded-full bg-primary font-bold text-primary-foreground" aria-label={playing ? "Pause" : "Play"}>{playing ? "Ⅱ" : "▶"}</button><button type="button" onClick={onNext} className="size-11 rounded-[var(--radius-control)]" aria-label="Next scene">›</button></div><span className="justify-self-end font-mono text-[10px] text-muted-foreground">{playing ? "playing" : "ready"}</span></div>\n}\n`
    case "motion-timeline":
      return simpleSource(name, "section", "min-w-0 overflow-x-auto border-t border-border bg-sidebar", `<div className="grid min-w-[42rem] grid-cols-[5rem_1fr] text-[10px]"><div className="grid border-r border-border font-mono text-muted-foreground"><span className="min-h-8 border-b border-border p-2">Time</span><span className="min-h-11 border-b border-border p-2">Scenes</span><span className="min-h-11 border-b border-border p-2">Motion</span><span className="min-h-11 p-2">Layers</span></div><div><div className="grid min-h-8 grid-cols-4 border-b border-border font-mono text-muted-foreground">{["0s", "1s", "2s", "3s"].map((time) => <span key={time} className="border-r border-border p-2">{time}</span>)}</div><div className="flex min-h-11 border-b border-border"><button type="button" className="min-h-11 w-1/4 border-r border-border text-left">Set</button><button type="button" className="min-h-11 w-2/4 border border-primary bg-secondary text-left">Reveal</button><button type="button" className="min-h-11 w-1/4 text-left">Emphasize</button></div><div className="min-h-11 border-b border-border bg-chart-3" /><div className="min-h-11 bg-chart-2" /></div></div>`)
    case "timeline-segment":
      return `${commonImport}export type TimelineSegmentProps = React.ComponentPropsWithoutRef<"button"> & { label?: string; duration?: string; active?: boolean }\n\nexport function TimelineSegment({ label = "Reveal", duration = "1.2s", active = false, className, ...props }: TimelineSegmentProps) {\n  return <button data-slot="timeline-segment" type="button" aria-pressed={active} className={cn("flex min-h-11 min-w-32 items-center justify-between gap-3 border border-border bg-card px-3 text-left text-xs aria-pressed:border-primary aria-pressed:bg-secondary", className)} {...props}><strong>{label}</strong><span className="font-mono text-[10px] text-muted-foreground">{duration}</span></button>\n}\n`
    case "playhead":
      return simpleSource(name, "label", "grid gap-2 text-xs font-bold", `<>Current time · <output>0.86s</output><input aria-label="Current time" type="range" min="0" max="272" defaultValue="86" className="min-h-11 w-full accent-primary" /></>`)
    case "delivery-workspace":
      return simpleSource(name, "section", "grid grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))] gap-4 rounded-[var(--radius-sheet)] border border-border bg-card p-4", `<><div><span className="font-mono text-[10px] uppercase text-muted-foreground">Delivery</span><h3 className="mt-2 text-2xl font-extrabold">Ready to make the final file.</h3><p className="max-w-xl text-sm text-muted-foreground">Choose an honest output, run the motion check, then render from the same scene contract used in preview.</p><div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] gap-2">{["MP4", "GIF", "Source"].map((format, index) => <button key={format} type="button" aria-pressed={index === 0} className="min-h-11 min-w-11 rounded-[var(--radius-control)] border border-border px-3 text-sm font-bold aria-pressed:border-primary aria-pressed:bg-secondary">{format}</button>)}</div></div><aside className="grid content-start gap-2 rounded-[var(--radius-card)] bg-sidebar p-3"><strong>Motion check</strong><span className="text-sm text-muted-foreground">7 checks passed</span><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground">Render MP4</button></aside></>`)
    case "delivery-action":
      return `${commonImport}export type DeliveryActionProps = React.ComponentPropsWithoutRef<"button"> & { state?: "idle" | "working" | "complete" | "failed" }\n\nexport function DeliveryAction({ state = "idle", className, ...props }: DeliveryActionProps) {\n  const labels = { idle: "Render MP4", working: "Rendering 48%", complete: "Download MP4", failed: "Try render again" }\n  return <button data-slot="delivery-action" type="button" data-state={state} className={cn("min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground data-[state=failed]:bg-destructive data-[state=complete]:bg-positive", className)} {...props}>{labels[state]}</button>\n}\n`
    case "render-status":
      return `${commonImport}export type RenderStatusProps = React.ComponentPropsWithoutRef<"div"> & { value?: number; state?: "queued" | "rendering" | "complete" | "failed" }\n\nexport function RenderStatus({ value = 48, state = "rendering", className, ...props }: RenderStatusProps) {\n  return <div data-slot="render-status" role="status" className={cn("grid gap-2 rounded-[var(--radius-card)] border border-border bg-card p-4", className)} {...props}><div className="flex justify-between gap-3 text-sm"><strong className="capitalize">{state}</strong><span className="font-mono text-xs text-muted-foreground">{value}%</span></div><progress max="100" value={value} className="h-2 w-full accent-primary" /><p className="m-0 text-xs text-muted-foreground">Preview and final output use the same scene timing.</p></div>\n}\n`
    case "motion-check":
      return simpleSource(name, "ul", "grid gap-1", `[["Purpose", "Pass"], ["Easing", "Pass"], ["Duration", "Pass"], ["Reduced motion", "Pass"]].map(([check, result]) => <li key={check} className="flex min-h-11 items-center justify-between gap-3 border-b border-border text-sm"><span>{check}</span><strong className="text-positive">{result}</strong></li>)`)
    case "code-panel":
      return simpleSource(name, "section", "overflow-hidden rounded-[var(--radius-card)] border border-border bg-plane-pressed", `<><header className="flex min-h-11 items-center justify-between border-b border-border px-3"><span className="font-mono text-[10px] text-muted-foreground">scene.motion.ts</span><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-xs font-bold">Copy</button></header><pre className="m-0 overflow-x-auto p-4 font-mono text-xs leading-6 text-foreground"><code>{'purpose: "explanation"\\neasing: "easeOut"\\nduration: 420\\nreducedMotion: "fade"'}</code></pre></>`)
    case "template-gallery":
      return simpleSource(name, "div", "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", `[["Product reveal", "Desktop · 8s"], ["Feature tour", "Phone · 12s"], ["Launch statement", "Canvas · 6s"]].map(([title, meta], index) => <button key={title} type="button" aria-pressed={index === 0} className="grid min-h-36 content-end gap-1 rounded-[var(--radius-card)] border border-border bg-card p-3 text-left aria-pressed:border-primary"><span className="mb-auto h-14 rounded-md bg-plane-pressed" /><strong>{title}</strong><small className="font-mono text-[10px] text-muted-foreground">{meta}</small></button>)`)
    case "guided-tour":
      return simpleSource(name, "section", "grid max-w-sm gap-3 rounded-[var(--radius-card)] border-2 border-primary bg-popover p-4 shadow-[var(--shadow-panel)]", `<><span className="font-mono text-[10px] text-primary">2 of 5</span><strong>Shape the current scene here.</strong><p className="m-0 text-sm text-muted-foreground">The inspector follows the selected scene or layer, so the object you are changing stays obvious.</p><div className="flex gap-2"><button type="button" className="min-h-11 rounded-[var(--radius-control)] border border-border px-3 text-sm font-bold">Dismiss</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-primary px-3 text-sm font-bold text-primary-foreground">Next</button></div></>`)
    case "workspace-error-boundary":
      return `import * as React from "react"\n\nexport type WorkspaceErrorBoundaryProps = { children: React.ReactNode; fallback?: React.ReactNode }\ntype WorkspaceErrorBoundaryState = { failed: boolean }\n\nexport class WorkspaceErrorBoundary extends React.Component<WorkspaceErrorBoundaryProps, WorkspaceErrorBoundaryState> {\n  state = { failed: false }\n  static getDerivedStateFromError() { return { failed: true } }\n  render() {\n    if (!this.state.failed) return this.props.children\n    return this.props.fallback ?? <section data-slot="workspace-error-boundary" role="alert" className="grid min-h-48 content-center justify-items-start gap-3 rounded-[var(--radius-card)] border border-destructive bg-card p-5"><strong>The workspace hit a problem.</strong><p className="m-0 text-sm text-muted-foreground">Your project is still safe. Reload this work surface to continue.</p><button type="button" onClick={() => this.setState({ failed: false })} className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground">Reload workspace</button></section>\n  }\n}\n`
    default:
      throw new Error(`Missing Animation source for ${name}`)
  }
}

const tokenItem = {
  name: "tokens",
  type: "registry:theme",
  title: "Animation Studio Tokens",
  description: "The canonical dark Animation Studio foundation translated to OKLCH with exact surfaces, semantic motion, durable font fallbacks, solid depth, and 44-pixel controls. No light theme is invented; default and dark intentionally use the same source authority.",
  cssVars: {
    theme: tokens.theme,
    light: tokens.source,
    dark: tokens.source,
  },
  css: {
    ":root": cssVariables(tokens.source),
    ".dark": cssVariables(tokens.source),
    ".animation-system": cssVariables(tokens.source),
  },
}

const sharedItems = purple.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => ({
    ...item,
    title: item.title.replace(/^Purple Rain /, "Animation Studio "),
    description: item.description.replaceAll("Purple Rain", "Animation Studio"),
    registryDependencies: [tokenUrl],
  }))

if (sharedItems.length !== sharedLibrary.length) {
  throw new Error(`Animation shared library mismatch: ${sharedItems.length} registry items and ${sharedLibrary.length} counted pieces.`)
}

await mkdir(path.join(root, "registry", "animation", "patterns"), { recursive: true })
for (const item of nativeItems) {
  await writeFile(path.join(root, "registry", "animation", "patterns", `${item.name}.tsx`), sourceFor(item.name))
}

const registryNativeItems = nativeItems.map((item) => ({
  name: item.name,
  type: "registry:ui",
  title: `Animation Studio ${item.title}`,
  description: item.description,
  registryDependencies: [tokenUrl],
  files: [{ path: `registry/animation/patterns/${item.name}.tsx`, type: "registry:ui" }],
}))

const registry = {
  $schema: purple.$schema,
  name: "animation-studio",
  homepage: "https://kit.scottelling.com/kit/animation",
  items: [tokenItem, ...sharedItems, ...registryNativeItems],
}

const library = [...sharedLibrary, ...nativeItems]

await mkdir(path.join(root, "registry", "animation"), { recursive: true })
await writeFile(path.join(root, "registry", "animation", "registry.json"), `${JSON.stringify(registry, null, 2)}\n`)
await writeFile(path.join(root, "lib", "animation-library.json"), `${JSON.stringify(library, null, 2)}\n`)

console.log(`Generated Animation Studio registry with ${sharedItems.length} shared pieces and ${nativeItems.length} studio-native patterns.`)
