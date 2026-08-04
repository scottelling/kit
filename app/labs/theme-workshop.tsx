"use client"

import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clipboard,
  Copy,
  Moon,
  PackageCheck,
  Redo2,
  RotateCcw,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Undo2,
  X,
} from "lucide-react"
import type { CSSProperties } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

import { projectShareQuery, type StudioProject } from "@/lib/project-studio"
import {
  applyThemeDirection,
  createThemeVariant,
  hexToOklch,
  normalizeThemeVariant,
  oklchToHex,
  repairThemeContrast,
  themeKitNames,
  themePreviewStyle,
  themeQuality,
  type ThemeDepth,
  type ThemeKitId,
  type ThemeModeTokens,
  type ThemeTypeStyle,
  type ThemeVariant,
  type WorkshopMode,
} from "@/lib/theme-workshop"

const directionExamples = [
  "Make it warmer, calmer, and more editorial",
  "Use a vivid blue action with sharper corners",
  "Make it compact, technical, and highly legible",
  "Give it a playful rose signal with more breathing room",
]

const colorRoles: { key: keyof ThemeModeTokens; label: string; help: string }[] = [
  { key: "canvas", label: "Page", help: "The ground everything sits on" },
  { key: "surface", label: "Surface", help: "Cards, forms, and working areas" },
  { key: "raised", label: "Raised surface", help: "Menus and supporting layers" },
  { key: "action", label: "Main action", help: "The next decision" },
  { key: "ink", label: "Main text", help: "Headings and reading text" },
  { key: "mutedInk", label: "Supporting text", help: "Context that still needs to read" },
  { key: "line", label: "Lines", help: "Boundaries and structure" },
]

const depthChoices: { id: ThemeDepth; label: string; help: string }[] = [
  { id: "quiet", label: "Quiet", help: "Nearly flat" },
  { id: "tactile", label: "Tactile", help: "Clear layers" },
  { id: "frontmost", label: "Frontmost", help: "Strong focus" },
]

const typeChoices: { id: ThemeTypeStyle; label: string; help: string }[] = [
  { id: "product", label: "Product", help: "Direct and neutral" },
  { id: "editorial", label: "Editorial", help: "Measured and literary" },
  { id: "technical", label: "Technical", help: "Precise and compact" },
]

type ThemeWorkshopProps = {
  project: StudioProject
  update: (patch: Record<string, unknown>) => void
}

export function ThemeWorkshop({ project, update }: ThemeWorkshopProps) {
  const starter = useMemo(() => createThemeVariant("purple-rain", `${project.name} — Purple Rain copy`), [project.name])
  const variant = project.themeVariant ?? starter
  const [mode, setMode] = useState<WorkshopMode>("light")
  const [direction, setDirection] = useState("")
  const [directionResult, setDirectionResult] = useState<string[]>([])
  const [history, setHistory] = useState<ThemeVariant[]>([])
  const [future, setFuture] = useState<ThemeVariant[]>([])
  const [notice, setNotice] = useState("Your copy is saved automatically.")
  const [handoffCopied, setHandoffCopied] = useState(false)
  const [previewCopied, setPreviewCopied] = useState(false)
  const quality = themeQuality(variant)
  const proofVariant = useMemo(() => variant.applied ? variant : { ...createThemeVariant(variant.baseKit, `${themeKitNames[variant.baseKit]} original`), applied: false }, [variant])
  const portableVariant = variant.publishedAt ? variant : { ...variant, publishedAt: variant.updatedAt, applied: true }
  const previewPath = `/preview?${projectShareQuery({ ...project, themeVariant: portableVariant })}`
  const handoffPath = `/r/workshop/theme.json?theme=${encodeURIComponent(JSON.stringify(portableVariant))}`

  useEffect(() => {
    if (!project.themeVariant) update({ themeVariant: starter })
  }, [project.themeVariant, starter, update])

  function writeVariant(nextValue: ThemeVariant, options: { keepPublished?: boolean; record?: boolean } = {}) {
    const next = normalizeThemeVariant({
      ...nextValue,
      updatedAt: new Date().toISOString(),
      ...(options.keepPublished ? {} : { publishedAt: undefined }),
    }) as ThemeVariant
    if (options.record !== false) {
      setHistory((items) => [...items.slice(-19), variant])
      setFuture([])
    }
    update({ themeVariant: next })
    setNotice("Saved to this project.")
  }

  function startFrom(baseKit: ThemeKitId) {
    writeVariant(createThemeVariant(baseKit, `${project.name} — ${themeKitNames[baseKit]} copy`))
    setDirectionResult([`${themeKitNames[baseKit]} remains unchanged. You are shaping a new copy.`])
  }

  function updateColor(key: keyof ThemeModeTokens, hex: string) {
    const next = normalizeThemeVariant(variant) as ThemeVariant
    next[mode][key] = hexToOklch(hex, next[mode][key])
    if (key === "action") next[mode].focus = { ...next[mode].action }
    writeVariant(repairThemeContrast(next))
  }

  function applyDirection() {
    const result = applyThemeDirection(variant, direction)
    writeVariant(result.variant)
    setDirectionResult(result.changes)
    setNotice(result.understood ? "Direction applied and checked." : "No visual rule matched. Try one of the example directions.")
  }

  function undo() {
    const previous = history.at(-1)
    if (!previous) return
    setFuture((items) => [variant, ...items].slice(0, 20))
    setHistory((items) => items.slice(0, -1))
    update({ themeVariant: previous })
    setNotice("Last change undone.")
  }

  function redo() {
    const next = future[0]
    if (!next) return
    setHistory((items) => [...items.slice(-19), variant])
    setFuture((items) => items.slice(1))
    update({ themeVariant: next })
    setNotice("Change restored.")
  }

  function applyCopy() {
    writeVariant({ ...variant, applied: true }, { keepPublished: true })
    setNotice("This copy now follows the project. The source kit is still untouched.")
  }

  function restoreOriginal() {
    writeVariant({ ...variant, applied: false }, { keepPublished: true })
    setNotice(`${themeKitNames[variant.baseKit]} restored exactly. Your copy is still saved.`)
  }

  function publishCopy() {
    const repaired = repairThemeContrast(variant)
    if (!themeQuality(repaired).ready) {
      setNotice("Repair the remaining legibility checks before publishing.")
      return
    }
    const published = { ...repaired, applied: true, publishedAt: new Date().toISOString() }
    writeVariant(published, { keepPublished: true })
    update({ themeVariant: published, previewPublished: true, status: "built" })
    setNotice("Published. The project preview and kit handoff are ready to share.")
  }

  async function copyPreviewLink() {
    await navigator.clipboard.writeText(new URL(previewPath, window.location.origin).toString())
    setPreviewCopied(true)
    window.setTimeout(() => setPreviewCopied(false), 2200)
  }

  async function copyHandoff() {
    await navigator.clipboard.writeText(new URL(handoffPath, window.location.origin).toString())
    setHandoffCopied(true)
    window.setTimeout(() => setHandoffCopied(false), 2200)
  }

  return (
    <div className="theme-workshop">
      <header className="theme-workshop__intro">
        <div>
          <span>Live working copy</span>
          <h2>{variant.name}</h2>
          <p>Adjust the system in plain language or by touch, then prove it on a real working interface before it follows the project.</p>
        </div>
        <div className="theme-workshop__state" aria-live="polite">
          <strong>{variant.applied ? "Copy applied" : "Original restored"}</strong>
          <span>{notice}</span>
        </div>
      </header>

      <div className="theme-workshop__rail" aria-label="Theme Workshop progress">
        <span data-complete="true"><i>1</i> Copy</span>
        <span data-complete="true"><i>2</i> Shape</span>
        <span data-complete={quality.ready}><i>3</i> Prove</span>
        <span data-complete={Boolean(variant.publishedAt)}><i>4</i> Publish</span>
      </div>

      <div className="theme-workshop__layout">
        <div className="theme-workshop__controls">
          <section className="theme-control-section">
            <div className="theme-control-section__heading"><span>Source kit</span><strong>Choose what to copy</strong></div>
            <div className="theme-kit-choice" role="group" aria-label="Choose the source kit">
              {(["purple-rain", "jade", "os"] as ThemeKitId[]).map((kit) => (
                <button key={kit} type="button" aria-pressed={variant.baseKit === kit} onClick={() => startFrom(kit)}>
                  <i data-kit={kit} aria-hidden="true" />
                  <span><strong>{themeKitNames[kit]}</strong><small>Start a clean copy</small></span>
                  {variant.baseKit === kit ? <Check aria-hidden="true" /> : null}
                </button>
              ))}
            </div>
            <label className="theme-name-field">
              <span>Name this copy</span>
              <input value={variant.name} maxLength={80} onChange={(event) => writeVariant({ ...variant, name: event.target.value })} />
            </label>
          </section>

          <section className="theme-control-section">
            <div className="theme-control-section__heading"><span>English direction</span><strong>Describe the change</strong></div>
            <div className="theme-direction">
              <textarea value={direction} onChange={(event) => setDirection(event.target.value)} placeholder="Make it warmer, more editorial, and slightly tighter." />
              <button type="button" onClick={applyDirection} disabled={!direction.trim()}><Sparkles aria-hidden="true" /> Apply direction</button>
            </div>
            <div className="theme-direction-examples" aria-label="Example directions">
              {directionExamples.map((example) => <button key={example} type="button" onClick={() => setDirection(example)}>{example}</button>)}
            </div>
            {directionResult.length ? <ul className="theme-direction-result">{directionResult.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}</ul> : null}
          </section>

          <section className="theme-control-section">
            <div className="theme-control-section__heading theme-control-section__heading--with-actions">
              <div><span>Color roles</span><strong>Touch the part you mean</strong></div>
              <div className="theme-mode-toggle" role="group" aria-label="Edit light or dark colors">
                <button type="button" aria-pressed={mode === "light"} onClick={() => setMode("light")}><Sun aria-hidden="true" /> Light</button>
                <button type="button" aria-pressed={mode === "dark"} onClick={() => setMode("dark")}><Moon aria-hidden="true" /> Dark</button>
              </div>
            </div>
            <div className="theme-color-list">
              {colorRoles.map((role) => (
                <label key={role.key} className="theme-color-control">
                  <input type="color" value={oklchToHex(variant[mode][role.key])} onChange={(event) => updateColor(role.key, event.target.value)} aria-label={`${role.label} color`} />
                  <span><strong>{role.label}</strong><small>{role.help}</small></span>
                  <i style={{ background: oklchToHex(variant[mode][role.key]) }} aria-hidden="true" />
                </label>
              ))}
            </div>
          </section>

          <section className="theme-control-section">
            <div className="theme-control-section__heading"><span>Shape and rhythm</span><strong>Set the physical character</strong></div>
            <label className="theme-range-control"><span><strong>Corner shape</strong><small>{Math.round(variant.radius)} px</small></span><input type="range" min="0" max="32" step="1" value={variant.radius} onChange={(event) => writeVariant({ ...variant, radius: Number(event.target.value) })} /></label>
            <label className="theme-range-control"><span><strong>Breathing room</strong><small>{variant.density < 0.92 ? "Compact" : variant.density > 1.08 ? "Roomy" : "Balanced"}</small></span><input type="range" min="0.78" max="1.25" step="0.01" value={variant.density} onChange={(event) => writeVariant({ ...variant, density: Number(event.target.value) })} /></label>
            <fieldset className="theme-choice-field"><legend>Depth</legend><div>{depthChoices.map((choice) => <button key={choice.id} type="button" aria-pressed={variant.depth === choice.id} onClick={() => writeVariant({ ...variant, depth: choice.id })}><strong>{choice.label}</strong><small>{choice.help}</small></button>)}</div></fieldset>
            <fieldset className="theme-choice-field"><legend>Type voice</legend><div>{typeChoices.map((choice) => <button key={choice.id} type="button" aria-pressed={variant.typeStyle === choice.id} onClick={() => writeVariant({ ...variant, typeStyle: choice.id })}><strong>{choice.label}</strong><small>{choice.help}</small></button>)}</div></fieldset>
          </section>

          <QualityPanel variant={variant} onRepair={() => writeVariant(repairThemeContrast(variant))} />

          <section className="theme-control-section theme-release">
            <div className="theme-control-section__heading"><span>Keep or release</span><strong>The copy never overwrites its source</strong></div>
            <div className="theme-release__actions">
              <button type="button" className="theme-button theme-button--primary" onClick={applyCopy}><Save aria-hidden="true" /> Apply copy</button>
              <button type="button" className="theme-button" onClick={restoreOriginal}><RotateCcw aria-hidden="true" /> Restore original</button>
              <button type="button" className="theme-button theme-button--publish" onClick={publishCopy} disabled={!quality.ready}><PackageCheck aria-hidden="true" /> Publish kit</button>
            </div>
            {variant.publishedAt ? <div className="theme-release__share"><strong><CheckCircle2 aria-hidden="true" /> Published and ready</strong><div><button type="button" data-share-url={previewPath} onClick={copyPreviewLink}>{previewCopied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}{previewCopied ? "Preview link copied" : "Copy preview link"}</button><button type="button" data-share-url={handoffPath} onClick={copyHandoff}>{handoffCopied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{handoffCopied ? "Kit handoff copied" : "Copy kit handoff"}</button></div></div> : null}
          </section>
        </div>

        <div className="theme-workshop__preview">
          <div className="theme-preview-toolbar">
            <div><SlidersHorizontal aria-hidden="true" /><span>Live project proof</span></div>
            <div>
              <button type="button" onClick={undo} disabled={!history.length} aria-label="Undo"><Undo2 aria-hidden="true" /></button>
              <button type="button" onClick={redo} disabled={!future.length} aria-label="Redo"><Redo2 aria-hidden="true" /></button>
              <span>{mode === "light" ? "Light" : "Dark"}</span>
            </div>
          </div>
          <ThemeProof variant={proofVariant} mode={mode} projectName={project.name} />
          <p className="theme-preview-note"><ShieldCheck aria-hidden="true" /> Showing {variant.applied ? variant.name : `the untouched ${themeKitNames[variant.baseKit]} original`} across navigation, data, forms, menus, decisions, and recovery.</p>
        </div>
      </div>
    </div>
  )
}

function QualityPanel({ variant, onRepair }: { variant: ThemeVariant; onRepair: () => void }) {
  const quality = themeQuality(variant)
  return (
    <section className="theme-control-section theme-quality">
      <div className="theme-control-section__heading"><span>Automatic proof</span><strong>{quality.passed}/{quality.total} legibility checks pass</strong></div>
      <div className="theme-quality__meter"><i style={{ width: `${(quality.passed / quality.total) * 100}%` }} /></div>
      <ul>{quality.checks.map((check) => <li key={check.id} data-pass={check.pass}>{check.pass ? <CheckCircle2 aria-hidden="true" /> : <AlertTriangle aria-hidden="true" />}<span>{check.label}</span><strong>{check.pass ? "Pass" : "Repair"}</strong></li>)}</ul>
      <div className="theme-quality__locked"><ShieldCheck aria-hidden="true" /><span>44 px controls, visible focus, solid surfaces, reduced motion, and no glow stay locked.</span></div>
      {!quality.ready ? <button type="button" className="theme-button" onClick={onRepair}><ShieldCheck aria-hidden="true" /> Repair legibility</button> : null}
    </section>
  )
}

function ThemeProof({ variant, mode, projectName }: { variant: ThemeVariant; mode: WorkshopMode; projectName: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [task, setTask] = useState("Launch review")
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("Ready for review")
  const style = themePreviewStyle(variant, mode) as CSSProperties

  return (
    <section className="theme-proof" style={style} data-mode={mode} aria-label="Live themed project interface">
      <header className="theme-proof__topbar"><strong>{projectName}</strong><nav aria-label="Project sections"><button type="button" aria-pressed="true">Work</button><button type="button">Activity</button><button type="button">Settings</button></nav><button type="button" className="theme-proof__avatar" aria-label="Open account">ST</button></header>
      <div className="theme-proof__body">
        <aside><span>Today</span>{["Launch review", "Homepage copy", "Release notes"].map((item, index) => <button key={item} type="button" aria-pressed={task === item} onClick={() => { setTask(item); setMessage(index === 2 ? "Two notes need owners" : "Ready for review") }}><i>{index + 1}</i><span>{item}<small>{index === 0 ? "3 decisions" : index === 1 ? "In progress" : "2 open"}</small></span></button>)}</aside>
        <div className="theme-proof__workspace">
          <header className="theme-proof__heading"><div><span>Active project</span><h3>{task}</h3><p>{message}</p></div><div className="theme-proof__menu"><button type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>Actions</button>{menuOpen ? <div role="menu"><button type="button" role="menuitem" onClick={() => setMessage("Review duplicated")}>Duplicate review</button><button type="button" role="menuitem" onClick={() => setMessage("Shared with the team")}>Share with team</button><button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>Close menu</button></div> : null}</div></header>
          <div className="theme-proof__stats"><article><span>Ready</span><strong>12</strong><small>checks passed</small></article><article><span>Waiting</span><strong>3</strong><small>decisions</small></article><article><span>Risk</span><strong>0</strong><small>blocking issues</small></article></div>
          <div className="theme-proof__grid">
            <article className="theme-proof__decision"><span>Decision</span><h4>Approve the release direction</h4><p>The hierarchy, working states, and final action are ready for one focused review.</p><div><button type="button" onClick={() => setMessage("Direction approved")}><Check aria-hidden="true" /> Approve</button><button type="button" onClick={() => dialogRef.current?.showModal()}>Review details</button></div></article>
            <form className="theme-proof__form" onSubmit={(event) => { event.preventDefault(); setMessage(email.includes("@") ? "Invite ready to send" : "Add a complete email address") }}><span>Invite a reviewer</span><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" /></label><button type="submit">Prepare invite</button><small aria-live="polite">{message}</small></form>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} className="theme-proof__dialog" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}><div><button type="button" aria-label="Close review details" onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button><span>Release decision</span><h3>Approve this direction?</h3><p>The selected kit copy has passed its legibility checks and can be restored without touching the original.</p><div><button type="button" onClick={() => dialogRef.current?.close()}>Keep reviewing</button><button type="button" onClick={() => { setMessage("Release approved"); dialogRef.current?.close() }}>Approve release</button></div></div></dialog>
    </section>
  )
}
