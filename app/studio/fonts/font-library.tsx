"use client"

import { Moon, Star, Sun } from "lucide-react"
import Link from "next/link"
import { type CSSProperties, useEffect, useMemo, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type FontFamily = {
  id: string
  name: string
  kind: "Sans" | "Serif" | "Mono"
  variable: string
  source: string
  bestFor: string
  voice: string
  weights: number[]
}

type FontPairing = {
  id: string
  name: string
  heading: string
  body: string
  mono: string
  bestFor: string
}

export type FontCatalog = {
  version: string
  families: FontFamily[]
  pairings: FontPairing[]
  rules: string[]
}

const SAVED_KEY = "purple-rain.saved-fonts"

function familyStyle(font: FontFamily) {
  return { "--font-preview": `var(${font.variable})` } as CSSProperties
}

export function FontLibrary({ library }: { library: FontCatalog }) {
  const [kind, setKind] = useState<"All" | FontFamily["kind"]>("All")
  const [selectedId, setSelectedId] = useState(library.families[0]?.id ?? "")
  const [sample, setSample] = useState("Make the next move obvious.")
  const [size, setSize] = useState(56)
  const [weight, setWeight] = useState(600)
  const [dark, setDark] = useState(false)
  const [saved, setSaved] = useState<string[]>([])

  const selected = library.families.find((font) => font.id === selectedId) ?? library.families[0]
  const filtered = useMemo(() => library.families.filter((font) => kind === "All" || font.kind === kind), [kind, library.families])
  const byId = useMemo(() => new Map(library.families.map((font) => [font.id, font])), [library.families])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const value = JSON.parse(window.localStorage.getItem(SAVED_KEY) ?? "[]")
        if (Array.isArray(value)) setSaved(value.filter((item): item is string => typeof item === "string"))
      } catch {
        setSaved([])
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  function choose(id: string) {
    const next = library.families.find((font) => font.id === id)
    if (next && !next.weights.includes(weight)) setWeight(next.weights.at(-2) ?? next.weights[0] ?? 400)
    setSelectedId(id)
    document.getElementById("font-playground")?.scrollIntoView({ block: "center" })
  }

  function toggleSaved(id: string) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
    setSaved(next)
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(next))
    } catch {
      // The visible shelf still works when browser storage is unavailable.
    }
  }

  return (
    <div className={`font-studio-shell${dark ? " dark" : ""}`}>
      <SiteHeader />
      <main className="font-studio-main">
        <section className="font-studio-opening" aria-labelledby="font-library-title">
          <div>
            <Link href="/studio#library">Studio library</Link>
            <h1 id="font-library-title">Judge a typeface in the work it must actually do.</h1>
            <p>See headlines, paragraphs, controls, labels, numbers, and real pairings before adding a font to a project. Only the final choices travel.</p>
          </div>
          <div className="font-opening-actions">
            <div className="mood-picker" role="group" aria-label="Choose light or dark">
              <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}><Sun /> Light</button>
              <button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon /> Dark</button>
            </div>
            <p><strong>{library.families.length} approved families</strong><span>{library.pairings.length} complete pairings · {saved.length} saved choices</span></p>
          </div>
        </section>

        <section className="font-rules" aria-label="Font selection rules">
          {library.rules.map((rule, index) => <div key={rule}><span>0{index + 1}</span><p>{rule}</p></div>)}
        </section>

        <section className="font-catalog" aria-labelledby="font-catalog-title">
          <header><div><span>Approved collection</span><h2 id="font-catalog-title">Every family in its real voice.</h2></div><div className="font-kind-rail" role="group" aria-label="Choose a font kind">{["All", "Sans", "Serif", "Mono"].map((item) => <button key={item} type="button" aria-pressed={kind === item} onClick={() => setKind(item as typeof kind)}>{item}</button>)}</div></header>
          <div className="font-grid">
            {filtered.map((font) => <button key={font.id} type="button" aria-pressed={selectedId === font.id} onClick={() => choose(font.id)} style={familyStyle(font)}><span>{font.kind}</span><strong>Ag</strong><h3>{font.name}</h3><p>{font.voice}</p><small>{font.bestFor}</small>{saved.includes(font.id) ? <Star className="is-saved" aria-label="Saved" /> : null}</button>)}
          </div>
        </section>

        {selected ? (
          <section className="font-playground" id="font-playground" style={familyStyle(selected)} aria-labelledby="font-playground-title">
            <header><div><span>{selected.kind} · {selected.source}</span><h2 id="font-playground-title">{selected.name}</h2><p>{selected.bestFor}</p></div><button type="button" onClick={() => toggleSaved(selected.id)}><Star fill={saved.includes(selected.id) ? "currentColor" : "none"} />{saved.includes(selected.id) ? "Remove from project shelf" : "Save for a project"}</button></header>
            <div className="font-controls">
              <label>Try your own words<input value={sample} onChange={(event) => setSample(event.target.value)} /></label>
              <label>Size <output>{size}px</output><input type="range" min="28" max="92" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
              <label>Weight<select value={weight} onChange={(event) => setWeight(Number(event.target.value))}>{selected.weights.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            </div>
            <div className="font-specimen">
              <h3 style={{ fontSize: size, fontWeight: weight }}>{sample}</h3>
              <p>Good interface type disappears into understanding. The sentence is easy to enter, the labels remain calm, and the numbers compare without asking for extra effort.</p>
              <div><button type="button">Review decisions</button><label>Project name<input defaultValue="Cabinet" /></label><dl><div><dt>Ready</dt><dd>24</dd></div><div><dt>Review</dt><dd>08</dd></div><div><dt>Blocked</dt><dd>03</dd></div></dl></div>
            </div>
          </section>
        ) : null}

        <section className="font-pairings" aria-labelledby="font-pairings-title">
          <header><span>Ready-made systems</span><h2 id="font-pairings-title">Pairings tested by role.</h2><p>The display voice, reading voice, and technical voice stay separate enough to help while still belonging together.</p></header>
          <div>
            {library.pairings.map((pairing) => {
              const heading = byId.get(pairing.heading)
              const body = byId.get(pairing.body)
              const mono = byId.get(pairing.mono)
              if (!heading || !body || !mono) return null
              return <article key={pairing.id} style={{ "--font-pair-heading": `var(${heading.variable})`, "--font-pair-body": `var(${body.variable})`, "--font-pair-mono": `var(${mono.variable})` } as CSSProperties}><span>{pairing.name}</span><h3>The work, understood at a glance.</h3><p>A clear hierarchy connects the current object, the supporting context, and the next useful action.</p><footer><strong>{pairing.bestFor}</strong><small>{heading.name} · {body.name} · {mono.name}</small></footer></article>
            })}
          </div>
        </section>
      </main>
      <SiteFooter note="Choose the role. Prove the reading. Load only the winners." />
    </div>
  )
}
