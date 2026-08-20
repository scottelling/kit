"use client"

import { Check, ExternalLink, Moon, Play, RotateCcw, SlidersHorizontal, Sun, Undo2 } from "lucide-react"
import Link from "next/link"
import type { CSSProperties } from "react"
import { useMemo, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { MotionAccordion } from "@/registry/motion/motion-accordion"
import { MotionDialog } from "@/registry/motion/motion-dialog"
import { MotionMenu } from "@/registry/motion/motion-menu"
import { MotionNotice } from "@/registry/motion/motion-notice"
import { MotionStateSwap } from "@/registry/motion/motion-state-swap"

export type MotionTheme = {
  id: string
  label: string
  darkOnly: boolean
  light: Record<string, string>
  dark: Record<string, string>
}

type MotionPattern = {
  id: string
  title: string
  plain: string
  purpose: string
  trigger: string
  category: string
  source: string
}

type MotionSettings = {
  duration: number
  distance: number
  scale: number
  ease: "system" | "crisp" | "calm"
}

type CustomStyle = CSSProperties & Record<`--${string}`, string | number>

const defaultSettings: MotionSettings = {
  duration: 180,
  distance: 8,
  scale: 97,
  ease: "system",
}

const eases: Record<MotionSettings["ease"], string> = {
  system: "var(--ease-standard, cubic-bezier(0.23, 1, 0.32, 1))",
  crisp: "cubic-bezier(0.23, 1, 0.32, 1)",
  calm: "cubic-bezier(0.2, 0, 0, 1)",
}

function tokensToStyle(tokens: Record<string, string>): CustomStyle {
  return Object.fromEntries(Object.entries(tokens).map(([name, value]) => [`--${name}`, value])) as CustomStyle
}

function PatternPreview({ id }: { id: string }) {
  if (id === "motion-menu") return <MotionMenu />
  if (id === "motion-dialog") return <MotionDialog />
  if (id === "motion-state-swap") return <MotionStateSwap />
  if (id === "motion-accordion") return <MotionAccordion />
  return <MotionNotice />
}

function motionStyle(settings: MotionSettings): CustomStyle {
  return {
    "--kit-motion-duration": `${settings.duration}ms`,
    "--kit-motion-exit": `${Math.max(100, settings.duration - 40)}ms`,
    "--kit-motion-fast": `${Math.max(100, settings.duration - 60)}ms`,
    "--kit-motion-distance": `${settings.distance}px`,
    "--kit-motion-distance-small": `${Math.min(4, Math.round(settings.distance / 2))}px`,
    "--kit-motion-scale": settings.scale / 100,
    "--kit-motion-ease": eases[settings.ease],
  }
}

export function MotionStudio({ library, themes }: { library: MotionPattern[]; themes: MotionTheme[] }) {
  const [themeId, setThemeId] = useState("vanilla")
  const [dark, setDark] = useState(false)
  const [selectedId, setSelectedId] = useState(library[0]?.id ?? "motion-menu")
  const [settings, setSettings] = useState(defaultSettings)
  const [history, setHistory] = useState<MotionSettings[]>([])
  const [replay, setReplay] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const selectedTheme = themes.find((item) => item.id === themeId) ?? themes[0]
  const selectedPattern = library.find((item) => item.id === selectedId) ?? library[0]
  const previewStyle = useMemo(() => ({
    ...tokensToStyle(dark || selectedTheme.darkOnly ? selectedTheme.dark : selectedTheme.light),
    ...motionStyle(settings),
  }), [dark, selectedTheme, settings])

  function chooseTheme(id: string) {
    const next = themes.find((item) => item.id === id)
    setThemeId(id)
    if (next?.darkOnly) setDark(true)
  }

  function updateSettings(next: Partial<MotionSettings>) {
    setHistory((items) => [...items.slice(-19), settings])
    setSettings((current) => ({ ...current, ...next }))
    setSaved(false)
  }

  function undo() {
    setHistory((items) => {
      const previous = items.at(-1)
      if (!previous) return items
      setSettings({ ...previous })
      setSaved(false)
      setReplay((value) => value + 1)
      return items.slice(0, -1)
    })
  }

  function reset() {
    if (JSON.stringify(settings) !== JSON.stringify(defaultSettings)) {
      setHistory((items) => [...items.slice(-19), settings])
    }
    setSettings(defaultSettings)
    setSaved(false)
    setReplay((value) => value + 1)
  }

  async function copyProjectRequest(pattern: MotionPattern) {
    const text = `Use Kit's ${pattern.title} motion on the appropriate ${pattern.category.toLowerCase()} interaction. Keep the active visual kit. Use ${settings.duration}ms entry motion, ${Math.max(100, settings.duration - 40)}ms exit motion, ${settings.distance}px maximum travel, ${settings.scale}% starting scale, visible focus, 44-pixel controls, and the built-in less-motion behavior. Do not change the product layout or content.`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(pattern.id)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      setCopied(null)
    }
  }

  function saveDirection() {
    try {
      window.localStorage.setItem("kit.motion-direction", JSON.stringify({ pattern: selectedId, settings }))
    } catch {
      // The visible selection remains available when storage is restricted.
    }
    setSaved(true)
  }

  return (
    <div className="motion-studio-shell">
      <SiteHeader />
      <main className="motion-studio-main">
        <section className="motion-opening" aria-labelledby="motion-title">
          <div>
            <Link href="/build#library">Studio library</Link>
            <span>Purposeful movement, shared by every kit</span>
            <h1 id="motion-title">Motion should explain what just happened.</h1>
            <p>Touch five everyday interactions, change their feel, compare the gentler version, and carry the result into a project without changing its visual kit.</p>
          </div>
          <aside aria-label="Motion Studio release rules">
            <strong>What is protected</strong>
            <p>No resting loops. No glare. No shaking errors. No moving page dimensions. Every interaction keeps visible focus and a gentler motion path.</p>
            <a href="https://transitions.dev/" target="_blank" rel="noreferrer">Source study: Transitions.dev <ExternalLink aria-hidden="true" /></a>
          </aside>
        </section>

        <section className="motion-kit-bar" aria-labelledby="motion-kit-title">
          <div>
            <span>Choose the visual kit</span>
            <h2 id="motion-kit-title">The behavior stays. The character changes.</h2>
          </div>
          <div className="motion-kit-controls">
            <div className="motion-kit-choices" role="radiogroup" aria-label="Choose a visual kit">
              {themes.map((item) => (
                <button key={item.id} type="button" role="radio" aria-checked={themeId === item.id} onClick={() => chooseTheme(item.id)}>{item.label}</button>
              ))}
            </div>
            <div className="motion-mode-choices" role="group" aria-label="Choose light or dark">
              <button type="button" aria-pressed={!dark} disabled={selectedTheme.darkOnly} onClick={() => setDark(false)}><Sun aria-hidden="true" /> Light</button>
              <button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon aria-hidden="true" /> Dark</button>
            </div>
          </div>
          {selectedTheme.darkOnly ? <p className="motion-dark-note">Animation keeps its inspected dark foundation. A light version has not been invented.</p> : null}
        </section>

        <section className="motion-gallery" aria-labelledby="motion-gallery-title">
          <header>
            <span>Five approved behaviors</span>
            <h2 id="motion-gallery-title">Use them. Don’t just watch them.</h2>
            <p>Each example is a real control with keyboard behavior, touch-sized actions, and the active kit’s exact visual foundation.</p>
          </header>
          <div className="motion-gallery-grid">
            {library.map((pattern, index) => (
              <article key={pattern.id} id={pattern.id} className="motion-pattern-card">
                <header><span>0{index + 1} · {pattern.category}</span><h3>{pattern.title}</h3><p>{pattern.plain}</p></header>
                <div className="motion-pattern-stage" style={previewStyle}><PatternPreview id={pattern.id} /></div>
                <footer>
                  <p>{pattern.purpose}</p>
                  <div>
                    <button type="button" onClick={() => { setSelectedId(pattern.id); document.getElementById("refine-motion")?.scrollIntoView({ block: "start" }) }}><SlidersHorizontal aria-hidden="true" /> Refine this</button>
                    <button type="button" onClick={() => copyProjectRequest(pattern)}>{copied === pattern.id ? <Check aria-hidden="true" /> : null}{copied === pattern.id ? "Request copied" : "Use in a project"}</button>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="motion-refine" id="refine-motion" aria-labelledby="motion-refine-title">
          <header>
            <span>Motion workbench</span>
            <h2 id="motion-refine-title">Refine the feel with your hands.</h2>
            <p>Select a behavior, change only the values that matter, and compare it with Less movement before keeping the direction.</p>
          </header>
          <div className="motion-refine-layout">
            <aside className="motion-refine-controls">
              <fieldset>
                <legend>Choose the behavior</legend>
                <div className="motion-pattern-rail">
                  {library.map((pattern) => <button key={pattern.id} type="button" aria-pressed={selectedId === pattern.id} onClick={() => { setSelectedId(pattern.id); setReplay((value) => value + 1) }}>{pattern.title}</button>)}
                </div>
              </fieldset>
              <label><span>Arrival pace <output>{settings.duration} ms</output></span><input type="range" min="140" max="260" step="10" value={settings.duration} onChange={(event) => updateSettings({ duration: Number(event.target.value) })} /></label>
              <label><span>Travel <output>{settings.distance} px</output></span><input type="range" min="0" max="12" step="1" value={settings.distance} onChange={(event) => updateSettings({ distance: Number(event.target.value) })} /></label>
              <label><span>Starting size <output>{settings.scale}%</output></span><input type="range" min="95" max="99" step="1" value={settings.scale} onChange={(event) => updateSettings({ scale: Number(event.target.value) })} /></label>
              <fieldset>
                <legend>How it settles</legend>
                <div className="motion-ease-choices">
                  {(["system", "crisp", "calm"] as const).map((ease) => <button key={ease} type="button" aria-pressed={settings.ease === ease} onClick={() => updateSettings({ ease })}>{ease === "system" ? "Kit character" : ease === "crisp" ? "Crisp" : "Calm"}</button>)}
                </div>
              </fieldset>
              <div className="motion-refine-actions">
                <button type="button" disabled={!history.length} onClick={undo}><Undo2 aria-hidden="true" /> Undo</button>
                <button type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Reset</button>
              </div>
            </aside>

            <div className="motion-refine-preview" style={previewStyle}>
              <header><div><span>{selectedTheme.label} · {dark || selectedTheme.darkOnly ? "Dark" : "Light"}</span><h3>{selectedPattern.title}</h3></div><button type="button" onClick={() => setReplay((value) => value + 1)}><Play aria-hidden="true" /> Replay</button></header>
              <div className="motion-preview-pair" key={`${selectedId}-${replay}`}>
                <section><span>Full motion</span><div className="motion-preview-stage"><PatternPreview id={selectedId} /></div></section>
                <section className="kit-motion-reduced"><span>Less movement</span><div className="motion-preview-stage"><PatternPreview id={selectedId} /></div></section>
              </div>
              <footer>
                <div><strong>{settings.duration} ms</strong><span>arrival</span></div>
                <div><strong>{Math.max(100, settings.duration - 40)} ms</strong><span>departure</span></div>
                <div><strong>{settings.distance} px</strong><span>travel</span></div>
                <button type="button" onClick={saveDirection}>{saved ? <Check aria-hidden="true" /> : null}{saved ? "Direction kept" : "Keep this direction"}</button>
              </footer>
            </div>
          </div>
        </section>

        <section className="motion-source" aria-labelledby="motion-source-title">
          <div><span>Source boundary</span><h2 id="motion-source-title">Connected, credited, and still ours.</h2><p>Transitions.dev helped us study useful interaction categories. Kit owns these five implementations and applies stricter performance, accessibility, tactile, and visual rules.</p></div>
          <div className="motion-source-cards">
            <article><strong>What travels through Kit</strong><p>The tested interaction, the active visual kit, the gentler motion path, and a plain-English project request.</p></article>
            <article><strong>What stays with Transitions.dev</strong><p>Its original recipe library, paid collection, installer, and product identity remain at their official source.</p><a href="https://transitions.dev/" target="_blank" rel="noreferrer">Open the original library <ExternalLink aria-hidden="true" /></a></article>
          </div>
        </section>
      </main>
      <SiteFooter note="Move only when movement makes the interface easier to understand." />
    </div>
  )
}
