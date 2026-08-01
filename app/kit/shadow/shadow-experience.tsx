"use client"

import {
  ArrowRight,
  Bell,
  Check,
  CreditCard,
  Layers3,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react"
import Link from "next/link"
import { type CSSProperties, type ReactNode, useRef, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { shadowDepths, type ShadowDepth, shadowRecipeCount, shadowSource } from "@/lib/shadow-system"

type ShadowStyle = CSSProperties & {
  "--shadow-ink": string
  "--shadow-ring-choice": string
}

const shadowColors = [
  { name: "Ink", value: "oklch(0.16 0.018 305)" },
  { name: "Plum", value: "oklch(0.34 0.09 309)" },
  { name: "Blue", value: "oklch(0.47 0.13 252)" },
  { name: "Jade", value: "oklch(0.43 0.09 165)" },
] as const

const ringColors = [
  { name: "Automatic", value: "var(--shadow-ring-default)" },
  { name: "Plum", value: "color-mix(in srgb, oklch(0.42 0.09 309) 24%, transparent)" },
  { name: "Blue", value: "color-mix(in srgb, oklch(0.55 0.14 252) 26%, transparent)" },
  { name: "Jade", value: "color-mix(in srgb, oklch(0.58 0.1 165) 28%, transparent)" },
] as const

function ElevatedSurface({
  children,
  className = "",
  depth,
  ring,
}: {
  children: ReactNode
  className?: string
  depth: ShadowDepth
  ring: boolean
}) {
  return (
    <div className={`shadow-object shadow-depth-${depth}${ring ? " has-ring" : ""} ${className}`}>
      {children}
    </div>
  )
}

export function ShadowExperience() {
  const [dark, setDark] = useState(false)
  const [depth, setDepth] = useState<ShadowDepth>("md")
  const [ring, setRing] = useState(true)
  const [shadowColor, setShadowColor] = useState(0)
  const [ringColor, setRingColor] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [noticeVisible, setNoticeVisible] = useState(true)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const style: ShadowStyle = {
    "--shadow-ink": shadowColors[shadowColor].value,
    "--shadow-ring-choice": ringColors[ringColor].value,
  }

  return (
    <div className={`shadow-shell${dark ? " dark" : ""}`} data-theme={dark ? "dark" : "light"} style={style}>
      <SiteHeader />
      <main className="shadow-main">
        <nav className="shadow-worlds" aria-label="Choose a kit">
          <span>Kits</span>
          <div>
            <Link href="/kit">Purple Rain <small>138 pieces</small></Link>
            <Link href="/kit/jade">JADE <small>138 pieces</small></Link>
            <Link aria-current="page" href="/kit/shadow">Shadow <small>{shadowRecipeCount} elevations</small></Link>
          </div>
        </nav>

        <section className="shadow-hero" aria-labelledby="shadow-title">
          <div className="shadow-hero__copy">
            <span>Elevation kit</span>
            <h1 id="shadow-title">One edge. Better depth.</h1>
            <p>Shadow gives raised surfaces a soft stack of depth and folds the hairline edge into the shadow itself. Cards, menus, sheets, and dialogs feel lighter without losing their boundary.</p>
            <div className="shadow-hero__facts" aria-label="Shadow kit contents">
              <strong>{shadowRecipeCount}</strong><span>elevation recipes</span>
              <strong>2</strong><span>edge treatments</span>
              <strong>0</strong><span>new dependencies</span>
            </div>
          </div>
          <div className="shadow-theme" role="group" aria-label="Choose light or dark">
            <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}><Sun aria-hidden="true" /> Light</button>
            <button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon aria-hidden="true" /> Dark</button>
          </div>
        </section>

        <section className="shadow-lab" aria-labelledby="shadow-lab-title">
          <header>
            <div><span>Touch test</span><h2 id="shadow-lab-title">Feel the edge change.</h2></div>
            <p>The left surface stacks a hard border beside a shadow. The right surface uses one continuous shadow edge.</p>
          </header>

          <div className="shadow-lab__stage">
            <article className={`shadow-before shadow-depth-${depth}`}>
              <Layers3 aria-hidden="true" />
              <strong>Separate edge</strong>
              <span>Border, then shadow</span>
            </article>
            <ElevatedSurface className="shadow-after" depth={depth} ring={ring}>
              <Check aria-hidden="true" />
              <strong>One edge</strong>
              <span>Hairline inside the stack</span>
            </ElevatedSurface>
          </div>

          <div className="shadow-controls">
            <fieldset>
              <legend>Depth</legend>
              <div className="shadow-segments">
                {shadowDepths.map((item) => (
                  <button key={item.id} type="button" aria-pressed={depth === item.id} onClick={() => setDepth(item.id)}>{item.id.toUpperCase()}</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Edge</legend>
              <button className="shadow-switch" type="button" role="switch" aria-checked={ring} onClick={() => setRing((value) => !value)}>
                <i aria-hidden="true" /> {ring ? "Hairline on" : "Shadow only"}
              </button>
            </fieldset>
            <fieldset>
              <legend>Shadow color</legend>
              <div className="shadow-swatches">
                {shadowColors.map((item, index) => (
                  <button key={item.name} type="button" aria-label={`${item.name} shadow`} aria-pressed={shadowColor === index} onClick={() => setShadowColor(index)} style={{ "--swatch": item.value } as CSSProperties} />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Edge color</legend>
              <div className="shadow-swatches shadow-swatches--ring">
                {ringColors.map((item, index) => (
                  <button key={item.name} type="button" aria-label={`${item.name} edge`} aria-pressed={ringColor === index} onClick={() => setRingColor(index)} style={{ "--swatch": item.value } as CSSProperties} />
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        <section className="shadow-ladder" aria-labelledby="shadow-ladder-title">
          <header><span>Depth ladder</span><h2 id="shadow-ladder-title">Six levels, two treatments.</h2><p>Use the smallest depth that clearly explains where a surface sits.</p></header>
          <div>
            {shadowDepths.map((item) => (
              <button key={item.id} type="button" aria-pressed={depth === item.id} onClick={() => setDepth(item.id)}>
                <ElevatedSurface depth={item.id} ring={ring}><i aria-hidden="true" /></ElevatedSurface>
                <b>{item.name}</b><span>{item.use}</span><small>{item.id.toUpperCase()}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="shadow-patterns" aria-labelledby="shadow-patterns-title">
          <header><span>Real surfaces</span><h2 id="shadow-patterns-title">Put depth where it earns its place.</h2></header>
          <div className="shadow-pattern-grid">
            <article className="shadow-pattern-card">
              <ElevatedSurface depth="md" ring>
                <span>Project card</span><strong>Launch review</strong><p>Three decisions are ready for you.</p><button type="button">Open review <ArrowRight aria-hidden="true" /></button>
              </ElevatedSurface>
            </article>

            <article className="shadow-pattern-menu">
              <button type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><Menu aria-hidden="true" /> Actions</button>
              {menuOpen ? <ElevatedSurface depth="md" ring><button type="button">Share project</button><button type="button">Duplicate</button><button type="button">Archive</button></ElevatedSurface> : <p>Open the menu to test a floating surface.</p>}
            </article>

            <article className="shadow-pattern-dialog">
              <CreditCard aria-hidden="true" /><strong>Focused decision</strong><p>A dialog gets the strongest depth because it temporarily owns the next action.</p><button type="button" onClick={() => dialogRef.current?.showModal()}>Open dialog</button>
            </article>

            <article className="shadow-pattern-toast">
              {noticeVisible ? <ElevatedSurface depth="lg" ring><Bell aria-hidden="true" /><div><strong>Review ready</strong><span>All checks passed.</span></div><button type="button" aria-label="Dismiss notice" onClick={() => setNoticeVisible(false)}><X /></button></ElevatedSurface> : <button type="button" onClick={() => setNoticeVisible(true)}>Show notice again</button>}
            </article>
          </div>
        </section>

        <section className="shadow-pairing" aria-labelledby="shadow-pairing-title">
          <header><span>Works across kits</span><h2 id="shadow-pairing-title">Depth travels. Identity stays put.</h2><p>Shadow strengthens elevation without replacing Purple Rain or JADE color, type, shape, or interaction rules.</p></header>
          <div>
            <article className="shadow-pairing-card shadow-pairing-card--purple"><ElevatedSurface depth="md" ring><span>Purple Rain</span><strong>Decision card</strong><p>Orchid still marks the action.</p><button type="button">Approve direction</button></ElevatedSurface></article>
            <article className="shadow-pairing-card shadow-pairing-card--jade"><ElevatedSurface depth="md" ring><span>JADE</span><strong>Decision card</strong><p>Mint still marks the action.</p><button type="button">Approve direction</button></ElevatedSurface></article>
          </div>
        </section>

        <section className="shadow-rule" aria-label="Shadow usage rule">
          <div><span>One rule to remember</span><h2>When a surface floats, its edge belongs inside the shadow.</h2></div>
          <p>Do not add a second border to a raised card, menu, dialog, sheet, toast, or popover. The hairline is already part of the depth.</p>
        </section>

        <p className="shadow-credit">Adapted from <a href={shadowSource.homepage} target="_blank" rel="noreferrer">Smooth Shadow</a> by Florian Kiem and collaborators. Rebuilt inside Kit under its MIT license without importing its demo or application structure.</p>
      </main>

      <dialog className="shadow-dialog" ref={dialogRef} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}>
        <ElevatedSurface depth="2xl" ring className="shadow-dialog__panel">
          <button type="button" aria-label="Close dialog" onClick={() => dialogRef.current?.close()}><X /></button>
          <span>Final decision</span><h2>Approve the release?</h2><p>The work is clear, responsive, and ready to share.</p>
          <div><button type="button" onClick={() => dialogRef.current?.close()}>Keep reviewing</button><button type="button" onClick={() => dialogRef.current?.close()}>Approve release</button></div>
        </ElevatedSurface>
      </dialog>

      <SiteFooter note="Shadow adds depth without taking over the design system." />
    </div>
  )
}
