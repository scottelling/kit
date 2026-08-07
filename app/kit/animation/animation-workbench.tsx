"use client"

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Clipboard,
  Copy,
  Eye,
  EyeOff,
  FileDown,
  FolderOpen,
  Layers3,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  Smartphone,
  Sparkles,
  Square,
  Trash2,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

type WorkspaceView = "Story" | "Preview" | "Code" | "Inspect"
type InspectorView = "Scene" | "Layer" | "Motion"
type Device = "Phone" | "Desktop" | "Browser" | "Canvas"
type WorkspaceMode = "preview" | "code" | "delivery"

type Scene = {
  id: string
  name: string
  title: string
  body: string
  hold: number
  transition: number
  purpose: "explanation" | "focus" | "continuity" | "feedback" | "delight"
  preset: "Rise" | "Pop" | "Fade" | "Left" | "Exit"
}

const initialScenes: Scene[] = [
  { id: "set", name: "Set", title: "Your workflow is doing too much work.", body: "Important signals are scattered across feeds, charts, notes, and breaking news.", hold: 420, transition: 0, purpose: "continuity", preset: "Fade" },
  { id: "reveal", name: "Reveal", title: "Bring the signal into one clear view.", body: "See the current decision, its evidence, and the next move without hunting for context.", hold: 780, transition: 420, purpose: "explanation", preset: "Rise" },
  { id: "emphasize", name: "Emphasize", title: "Act while the reason is still visible.", body: "The product keeps confidence, risk, and recovery next to the action they affect.", hold: 900, transition: 360, purpose: "focus", preset: "Pop" },
]

const layerNames = ["Headline", "Supporting copy", "Canvas", "Decision marker"]
const motionPresets = ["Rise", "Pop", "Fade", "Left", "Exit"] as const
const workspaceViews: WorkspaceView[] = ["Story", "Preview", "Code", "Inspect"]
const inspectorViews: InspectorView[] = ["Scene", "Layer", "Motion"]
const devices: Array<{ label: Device; icon: typeof Smartphone }> = [
  { label: "Phone", icon: Smartphone },
  { label: "Desktop", icon: Monitor },
  { label: "Browser", icon: FolderOpen },
  { label: "Canvas", icon: Square },
]

function seconds(milliseconds: number) {
  return `${(milliseconds / 1000).toFixed(1)}s`
}

function clock(milliseconds: number) {
  const secondsValue = Math.max(0, milliseconds) / 1000
  return `00:${secondsValue.toFixed(2).padStart(5, "0")}`
}

export function AnimationWorkbench() {
  const [scenes, setScenes] = useState(initialScenes)
  const [selectedId, setSelectedId] = useState(initialScenes[1].id)
  const [workspaceView, setWorkspaceView] = useState<WorkspaceView>("Preview")
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>("preview")
  const [inspectorView, setInspectorView] = useState<InspectorView>("Scene")
  const [device, setDevice] = useState<Device>("Desktop")
  const [selectedLayer, setSelectedLayer] = useState(0)
  const [hiddenLayers, setHiddenLayers] = useState<number[]>([])
  const [playing, setPlaying] = useState(false)
  const [playhead, setPlayhead] = useState(820)
  const [command, setCommand] = useState("")
  const [notice, setNotice] = useState("Choose a scene, then shape it in plain English or with direct controls.")
  const [templateOpen, setTemplateOpen] = useState(false)
  const [projectOpen, setProjectOpen] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [renderState, setRenderState] = useState<"idle" | "working" | "complete">("idle")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reducedMotionRef = useRef(false)

  const selectedIndex = Math.max(0, scenes.findIndex((scene) => scene.id === selectedId))
  const selectedScene = scenes[selectedIndex] ?? scenes[0]
  const bounds = useMemo(() => scenes.reduce<Array<{ id: string; start: number; duration: number; end: number }>>((current, scene) => {
      const start = current.at(-1)?.end ?? 0
      const duration = scene.transition + scene.hold
      return [...current, { id: scene.id, start, duration, end: start + duration }]
    }, []), [scenes])
  const total = bounds.at(-1)?.end ?? 1

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = query.matches
    const update = () => {
      reducedMotionRef.current = query.matches
      if (query.matches) setPlaying(false)
    }
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!playing || reducedMotionRef.current) return
    intervalRef.current = setInterval(() => {
      setPlayhead((current) => {
        const next = current + 80
        if (next >= total) {
          setPlaying(false)
          return total
        }
        const activeBound = bounds.find((bound) => next >= bound.start && next < bound.end)
        if (activeBound) setSelectedId(activeBound.id)
        return next
      })
    }, 80)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [bounds, playing, total])

  function selectScene(id: string) {
    const bound = bounds.find((item) => item.id === id)
    setSelectedId(id)
    if (bound) setPlayhead(bound.start + Math.min(120, bound.duration / 2))
    setNotice("The scene, canvas, inspector, and timeline now point to the same moment.")
  }

  function patchSelected(patch: Partial<Scene>) {
    setScenes((current) => current.map((scene) => scene.id === selectedId ? { ...scene, ...patch } : scene))
  }

  function addScene() {
    const id = `scene-${Date.now()}`
    const next: Scene = { id, name: "New beat", title: "Make one useful change visible.", body: "Describe what changes and why the viewer should care.", hold: 720, transition: 420, purpose: "explanation", preset: "Rise" }
    setScenes((current) => [...current, next])
    setSelectedId(id)
    setNotice("A new scene is ready. Its timing and purpose are visible before you animate it.")
  }

  function duplicateScene() {
    const id = `scene-${Date.now()}`
    const duplicate = { ...selectedScene, id, name: `${selectedScene.name} copy` }
    setScenes((current) => [...current.slice(0, selectedIndex + 1), duplicate, ...current.slice(selectedIndex + 1)])
    setSelectedId(id)
    setNotice("The scene was duplicated beside the original.")
  }

  function deleteScene() {
    if (scenes.length === 1) {
      setNotice("Keep at least one scene so the project remains usable.")
      return
    }
    const next = scenes.filter((scene) => scene.id !== selectedId)
    setScenes(next)
    setSelectedId(next[Math.max(0, selectedIndex - 1)].id)
    setNotice("The scene was removed. The surrounding sequence remains intact.")
  }

  function applyCommand() {
    const clean = command.trim()
    if (!clean) return
    const lower = clean.toLowerCase()
    if (lower.includes("calm") || lower.includes("slower")) patchSelected({ transition: 620, hold: Math.max(900, selectedScene.hold), preset: "Fade" })
    else if (lower.includes("fast") || lower.includes("snappy")) patchSelected({ transition: 280, hold: Math.min(640, selectedScene.hold), preset: "Pop" })
    else if (lower.includes("left")) patchSelected({ preset: "Left", purpose: "continuity" })
    else if (lower.includes("exit")) patchSelected({ preset: "Exit", purpose: "continuity" })
    else patchSelected({ body: clean, purpose: "explanation" })
    setCommand("")
    setNotice("The direction changed the current scene. Undo remains visible in the studio header.")
  }

  function stepScene(direction: -1 | 1) {
    const next = Math.max(0, Math.min(scenes.length - 1, selectedIndex + direction))
    selectScene(scenes[next].id)
  }

  function chooseWorkspaceView(view: WorkspaceView) {
    setWorkspaceView(view)
    if (view === "Code") setWorkspaceMode("code")
    if (view === "Preview") setWorkspaceMode("preview")
  }

  function copyCode() {
    setCopied(true)
    setNotice("The readable motion description is ready to paste.")
    window.setTimeout(() => setCopied(false), 1600)
  }

  function renderOutput() {
    setRenderState("working")
    setNotice("Rendering uses the same scene timing shown in preview.")
    window.setTimeout(() => {
      setRenderState("complete")
      setNotice("The preview and final output match. The MP4 is ready.")
    }, 900)
  }

  return (
    <section className="animation-proof" aria-labelledby="animation-proof-title">
      <header className="animation-proof__heading">
        <div>
          <span>Real product proof</span>
          <h2 id="animation-proof-title">Shape a motion story without leaving the work.</h2>
          <p>Select a scene, change its message or motion, play the sequence, inspect the timeline, and prepare the final output.</p>
        </div>
        <aside><strong>{scenes.length}</strong><span>connected scenes</span></aside>
      </header>

      <div className="aw-shell" data-mobile-view={workspaceView.toLowerCase()}>
        <header className="aw-header">
          <div className="aw-brand">
            <span aria-hidden="true">A</span>
            <button type="button" className="aw-project-button" aria-expanded={projectOpen} onClick={() => setProjectOpen((value) => !value)}>
              <strong>Animation</strong><small>Launch sequence</small><ChevronDown aria-hidden="true" />
            </button>
            {projectOpen ? <div className="aw-project-menu"><button type="button" onClick={() => setProjectOpen(false)}>Launch sequence <small>Saved</small></button><button type="button" onClick={() => { setProjectOpen(false); setNotice("The product tour project is ready for a separate version.") }}>Product tour <small>Local</small></button></div> : null}
          </div>
          <div className="aw-mode-switcher" role="group" aria-label="Choose design or motion mode">
            <button type="button" aria-pressed={inspectorView !== "Motion"} onClick={() => setInspectorView("Scene")}>Design</button>
            <button type="button" aria-pressed={inspectorView === "Motion"} onClick={() => setInspectorView("Motion")}>Motion</button>
          </div>
          <div className="aw-header-actions">
            <div className="aw-device-switcher" role="group" aria-label="Choose a preview frame">
              {devices.map(({ label, icon: Icon }) => <button key={label} type="button" aria-label={label} aria-pressed={device === label} onClick={() => setDevice(label)}><Icon aria-hidden="true" /></button>)}
            </div>
            <button type="button" className="aw-templates-button" aria-label="Templates" onClick={() => setTemplateOpen((value) => !value)}><Layers3 aria-hidden="true" /></button>
            <button type="button" aria-label="Guided tour" onClick={() => setTourStep((current) => current ? 0 : 1)}><Sparkles aria-hidden="true" /></button>
            <button type="button" aria-label="Projects" onClick={() => setProjectOpen((value) => !value)}><FolderOpen aria-hidden="true" /></button>
            <button type="button" aria-label="Undo" onClick={() => setNotice("Nothing was changed by Undo. The visible project state is already current.")}><RotateCcw aria-hidden="true" /></button>
            <button type="button" className="aw-export-button" aria-label="Export" onClick={() => { setWorkspaceMode("delivery"); setWorkspaceView("Preview") }}><FileDown aria-hidden="true" /></button>
            <button type="button" className="aw-new-button" onClick={addScene}><CirclePlus aria-hidden="true" />New</button>
          </div>
        </header>

        <nav className="aw-mobile-switcher" aria-label="Choose workspace view">
          {workspaceViews.map((view) => <button key={view} type="button" aria-current={workspaceView === view ? "page" : undefined} onClick={() => chooseWorkspaceView(view)}>{view}</button>)}
        </nav>

        <div className="aw-main">
          <aside className="aw-storyboard" aria-label="Storyboard">
            <header><strong>Storyboard</strong><span>{scenes.length} scenes</span></header>
            <div className="aw-scene-list">
              {scenes.map((scene, index) => (
                <button key={scene.id} type="button" aria-current={scene.id === selectedId ? "true" : undefined} onClick={() => selectScene(scene.id)}>
                  <span className="aw-scene-thumb"><i /><i /></span>
                  <span><strong>{scene.name}</strong><small>{scene.title}</small><b>{scene.preset} · {seconds(scene.transition + scene.hold)}</b></span>
                  <em>{String(index + 1).padStart(2, "0")}</em>
                </button>
              ))}
            </div>
            <button type="button" className="aw-add-scene" onClick={addScene}><CirclePlus aria-hidden="true" />Add scene</button>
          </aside>

          <main className="aw-workspace">
            <div className="aw-workspace-toolbar">
              <div className="aw-workspace-modes" role="group" aria-label="Choose workspace content">
                <button type="button" aria-pressed={workspaceMode === "preview"} onClick={() => { setWorkspaceMode("preview"); setWorkspaceView("Preview") }}>Preview</button>
                <button type="button" aria-pressed={workspaceMode === "code"} onClick={() => { setWorkspaceMode("code"); setWorkspaceView("Code") }}>Code</button>
                <button type="button" aria-pressed={workspaceMode === "delivery"} onClick={() => setWorkspaceMode("delivery")}>Delivery</button>
              </div>
              <form className="aw-director" onSubmit={(event) => { event.preventDefault(); applyCommand() }}>
                <Sparkles aria-hidden="true" />
                <label><span className="sr-only">Describe the motion or change you want</span><input value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Describe the motion or change you want" /></label>
                <button type="submit" disabled={!command.trim()} aria-label="Apply direction">→</button>
              </form>
              <div className="aw-canvas-state"><span>{device === "Phone" ? "390 × 844" : device === "Desktop" ? "1440 × 900" : device === "Browser" ? "1280 × 800" : "1920 × 1080"}</span><i aria-hidden="true" /></div>
            </div>

            <div className="aw-stage-wrap">
              {templateOpen ? (
                <section className="aw-template-panel" aria-label="Choose a template">
                  <header><div><span>Starting compositions</span><h3>Choose a useful structure.</h3></div><button type="button" onClick={() => setTemplateOpen(false)}>Close</button></header>
                  <div>{[["Product reveal", "Desktop · 8s"], ["Feature tour", "Phone · 12s"], ["Launch statement", "Canvas · 6s"]].map(([title, meta], index) => <button key={title} type="button" onClick={() => { setTemplateOpen(false); setNotice(`${title} is now the starting structure.`) }}><span><i /><i /></span><strong>{title}</strong><small>{meta}</small>{index === 0 ? <b>Current</b> : null}</button>)}</div>
                </section>
              ) : workspaceMode === "code" ? (
                <section className="aw-code-panel" aria-label="Readable motion description">
                  <header><span>scene.motion</span><button type="button" onClick={copyCode}>{copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}{copied ? "Copied" : "Copy"}</button></header>
                  <pre><code>{`scene: "${selectedScene.name}"\npurpose: "${selectedScene.purpose}"\npreset: "${selectedScene.preset}"\ntransition: ${selectedScene.transition}\nhold: ${selectedScene.hold}\nreducedMotion: "fade"`}</code></pre>
                </section>
              ) : workspaceMode === "delivery" ? (
                <section className="aw-delivery" aria-label="Delivery workspace">
                  <div><span>Delivery</span><h3>Make the final file from the same motion you approved.</h3><p>No hidden render version. The scene order, timing, and reduced-motion choice stay connected.</p><div role="group" aria-label="Output type"><button type="button" aria-pressed="true">MP4</button><button type="button">GIF</button><button type="button">Source</button></div></div>
                  <aside><strong>Motion check</strong>{["Purpose", "Easing", "Duration", "Reduced motion"].map((check) => <span key={check}><Check aria-hidden="true" />{check}</span>)}<button type="button" data-state={renderState} onClick={renderOutput} disabled={renderState === "working"}>{renderState === "idle" ? "Render MP4" : renderState === "working" ? "Rendering 48%" : "Download MP4"}</button></aside>
                </section>
              ) : (
                <section className="aw-stage" aria-label={`${device} preview`} data-device={device.toLowerCase()}>
                  <div className="aw-device-frame">
                    {device === "Browser" ? <header><i /><i /><i /><span /></header> : null}
                    {device === "Phone" ? <header className="aw-phone-status"><span>9:41</span><b>CUE</b></header> : null}
                    <div className="aw-composition">
                      <span>SCENE {String(selectedIndex + 1).padStart(2, "0")}</span>
                      <h3>{selectedScene.title}</h3>
                      <p>{selectedScene.body}</p>
                      <button type="button" onClick={() => setNotice("The sample action provided immediate, local feedback.")}>See the decision</button>
                    </div>
                  </div>
                  {tourStep ? <aside className="aw-tour"><span>{tourStep} of 3</span><strong>{tourStep === 1 ? "The canvas remains the hero." : tourStep === 2 ? "The inspector follows the current object." : "The timeline explains when change happens."}</strong><p>{tourStep === 1 ? "Supporting controls stay close but visually quiet." : tourStep === 2 ? "Scene, layer, and motion settings never become ambiguous." : "Every scene, transition, and layer owns a readable lane."}</p><div><button type="button" onClick={() => setTourStep(0)}>Dismiss</button><button type="button" onClick={() => setTourStep((current) => current >= 3 ? 0 : current + 1)}>{tourStep >= 3 ? "Finish" : "Next"}</button></div></aside> : null}
                </section>
              )}
            </div>
          </main>

          <aside className="aw-inspector" aria-label="Inspector">
            <header><strong>Inspector</strong><span>{inspectorView.toLowerCase()}</span></header>
            <nav aria-label="Choose inspector section">{inspectorViews.map((view) => <button key={view} type="button" aria-current={inspectorView === view ? "page" : undefined} onClick={() => setInspectorView(view)}>{view === "Scene" ? <Square aria-hidden="true" /> : view === "Layer" ? <Layers3 aria-hidden="true" /> : <Sparkles aria-hidden="true" />}{view}</button>)}</nav>
            <div className="aw-inspector-body">
              <div className="aw-mobile-devices" role="group" aria-label="Choose a preview frame">{devices.map(({ label, icon: Icon }) => <button key={label} type="button" aria-label={label} aria-pressed={device === label} onClick={() => setDevice(label)}><Icon aria-hidden="true" /></button>)}</div>
              {inspectorView === "Scene" ? <>
                <div className="aw-inspector-title"><div><span>Scene {String(selectedIndex + 1).padStart(2, "0")}</span><strong>{selectedScene.name}</strong></div><small>{seconds(selectedScene.hold + selectedScene.transition)}</small></div>
                <label>Scene name<input value={selectedScene.name} onChange={(event) => patchSelected({ name: event.target.value })} /></label>
                <label>On-screen message<textarea value={selectedScene.body} onChange={(event) => patchSelected({ body: event.target.value })} /></label>
                <div className="aw-facts"><span><b>Layers</b>{layerNames.length}</span><span><b>Hold</b>{seconds(selectedScene.hold)}</span><span><b>Purpose</b>{selectedScene.purpose}</span></div>
                <div className="aw-scene-actions"><button type="button" onClick={duplicateScene}><Copy aria-hidden="true" />Duplicate</button><button type="button" aria-label="Delete scene" onClick={deleteScene}><Trash2 aria-hidden="true" /></button></div>
              </> : inspectorView === "Layer" ? <>
                <div className="aw-inspector-title"><div><span>Selected layer</span><strong>{layerNames[selectedLayer]}</strong></div><small>{hiddenLayers.includes(selectedLayer) ? "hidden" : "visible"}</small></div>
                <div className="aw-layer-list">{layerNames.map((layer, index) => <div key={layer}><button type="button" aria-label={`${hiddenLayers.includes(index) ? "Show" : "Hide"} ${layer}`} onClick={() => setHiddenLayers((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])}>{hiddenLayers.includes(index) ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}</button><button type="button" aria-current={selectedLayer === index ? "true" : undefined} onClick={() => setSelectedLayer(index)}>{layer}</button></div>)}</div>
                <fieldset className="aw-style-grid"><legend>Position and style</legend>{[["X", "120"], ["Y", "88"], ["Width", "420"], ["Scale", "100"]].map(([label, value]) => <label key={label}>{label}<input type="number" defaultValue={value} /></label>)}</fieldset>
              </> : <>
                <div className="aw-inspector-title"><div><span>Motion purpose</span><strong>{selectedScene.purpose}</strong></div><small>{selectedScene.preset}</small></div>
                <label>Purpose<select value={selectedScene.purpose} onChange={(event) => patchSelected({ purpose: event.target.value as Scene["purpose"] })}><option value="explanation">Explanation</option><option value="focus">Focus</option><option value="continuity">Continuity</option><option value="feedback">Feedback</option><option value="delight">Delight</option></select></label>
                <label>Preset<div className="aw-preset-grid">{motionPresets.map((preset) => <button key={preset} type="button" aria-pressed={selectedScene.preset === preset} onClick={() => patchSelected({ preset })}>{preset}</button>)}</div></label>
                <label>Transition · {selectedScene.transition}ms<input type="range" min="120" max="1800" step="20" value={selectedScene.transition || 120} onChange={(event) => patchSelected({ transition: Number(event.target.value) })} /></label>
                <label>Hold · {selectedScene.hold}ms<input type="range" min="240" max="1800" step="20" value={selectedScene.hold} onChange={(event) => patchSelected({ hold: Number(event.target.value) })} /></label>
                <div className="aw-motion-check"><strong>Motion check</strong><span><Check aria-hidden="true" />Purpose is named</span><span><Check aria-hidden="true" />Duration is safe</span><span><Check aria-hidden="true" />Reduced motion is defined</span></div>
              </>}
            </div>
          </aside>
        </div>

        <footer className="aw-footer">
          <div className="aw-transport">
            <span>{clock(playhead)} / {clock(total)}</span>
            <div><button type="button" aria-label="Go to start" onClick={() => { setPlayhead(0); selectScene(scenes[0].id) }}>↤</button><button type="button" aria-label="Previous scene" onClick={() => stepScene(-1)}><ChevronLeft aria-hidden="true" /></button><button type="button" className="aw-play" aria-label={playing ? "Pause" : "Play"} aria-pressed={playing} onClick={() => { if (playhead >= total) setPlayhead(0); setPlaying((value) => !value) }}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button><button type="button" aria-label="Next scene" onClick={() => stepScene(1)}><ChevronRight aria-hidden="true" /></button><button type="button" aria-label="Go to end" onClick={() => { setPlayhead(total); selectScene(scenes.at(-1)?.id ?? scenes[0].id) }}>↦</button></div>
            <span aria-live="polite">{playing ? "playing" : "ready"}</span>
          </div>
          <div className="aw-timeline-scroll">
            <div className="aw-timeline" style={{ minWidth: `${Math.max(720, scenes.length * 220)}px` }}>
              <div className="aw-timeline-labels"><span>Time</span><span>Scenes</span><span>Motion</span><span>Layers</span></div>
              <div className="aw-timeline-lanes">
                <div className="aw-time-ruler">{[0, 1, 2, 3].map((time) => <span key={time}>{time}s</span>)}</div>
                <div className="aw-scene-lane">{scenes.map((scene, index) => <button key={scene.id} type="button" aria-pressed={selectedId === scene.id} onClick={() => selectScene(scene.id)} style={{ width: `${(bounds[index].duration / total) * 100}%` }}>{scene.name}</button>)}</div>
                <div className="aw-motion-lane">{scenes.map((scene, index) => <button key={scene.id} type="button" aria-label={`${scene.name} ${scene.preset}`} onClick={() => { selectScene(scene.id); setInspectorView("Motion") }} style={{ width: `${(bounds[index].duration / total) * 100}%` }}><span style={{ width: `${Math.max(8, (scene.transition / Math.max(1, bounds[index].duration)) * 100)}%` }} /></button>)}</div>
                <div className="aw-layer-lane">{scenes.map((scene, index) => <span key={scene.id} style={{ width: `${(bounds[index].duration / total) * 100}%` }} />)}</div>
                <label className="aw-playhead" style={{ left: `${Math.min(100, (playhead / total) * 100)}%` }}><span className="sr-only">Current time</span><input type="range" min="0" max={total} value={Math.min(playhead, total)} onChange={(event) => { const next = Number(event.target.value); setPlayhead(next); const active = bounds.find((bound) => next >= bound.start && next <= bound.end); if (active) setSelectedId(active.id) }} /></label>
              </div>
            </div>
          </div>
          <p className="aw-notice" aria-live="polite">{notice}</p>
        </footer>
      </div>
    </section>
  )
}
