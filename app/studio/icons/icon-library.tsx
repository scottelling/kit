"use client"

import { Check, ChevronLeft, ChevronRight, Copy, Moon, Search, Star, Sun, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type IconRecord = {
  name: string
  label: string
  category: string
}

type IconFamily = {
  id: "lucide" | "material"
  name: string
  purpose: string
  license: string
  source: string
  count: number
  icons: IconRecord[]
}

export type IconCatalog = {
  version: string
  policy: Record<string, string>
  families: IconFamily[]
}

type DisplayIcon = IconRecord & {
  family: IconFamily["id"]
  familyName: string
}

const PAGE_SIZE = 72
const SAVED_KEY = "purple-rain.saved-icons"

function LucideGlyph({ name, size, stroke, filled }: { name: string; size: number; stroke: number; filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <use href={`/icons/lucide-sprite.svg#lucide-${name}`} />
    </svg>
  )
}

function MaterialGlyph({ name, size, weight, filled }: { name: string; size: number; weight: number; filled: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="material-symbols-rounded"
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
      }}
    >
      {name}
    </span>
  )
}

function Glyph({ icon, size, stroke, weight, filled }: { icon: DisplayIcon; size: number; stroke: number; weight: number; filled: boolean }) {
  return icon.family === "lucide"
    ? <LucideGlyph name={icon.name} size={size} stroke={stroke} filled={filled} />
    : <MaterialGlyph name={icon.name} size={size} weight={weight} filled={filled} />
}

export function IconLibrary({ catalog, initialFamily = "all" }: { catalog: IconCatalog; initialFamily?: "all" | IconFamily["id"] }) {
  const [query, setQuery] = useState("")
  const [family, setFamily] = useState<"all" | IconFamily["id"]>(initialFamily)
  const [category, setCategory] = useState("All")
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<DisplayIcon | null>(null)
  const [size, setSize] = useState(32)
  const [stroke, setStroke] = useState(2)
  const [weight, setWeight] = useState(400)
  const [filled, setFilled] = useState(false)
  const [dark, setDark] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState<string[]>([])

  const allIcons = useMemo(() => catalog.families.flatMap((item) => item.icons.map((icon) => ({ ...icon, family: item.id, familyName: item.name }))), [catalog])
  const categories = useMemo(() => ["All", ...Array.from(new Set(allIcons.map((icon) => icon.category))).sort()], [allIcons])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return allIcons.filter((icon) => {
      const familyMatches = family === "all" || icon.family === family
      const categoryMatches = category === "All" || icon.category === category
      const wordsMatch = !needle || `${icon.name} ${icon.label} ${icon.category} ${icon.familyName}`.toLowerCase().includes(needle)
      return familyMatches && categoryMatches && wordsMatch
    })
  }, [allIcons, category, family, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

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

  useEffect(() => {
    if (selected?.family !== "material") return
    const id = "material-symbols-selected"
    let link = document.getElementById(id) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement("link")
      link.id = id
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }
    link.href = `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL@20..48,100..700,0..1&icon_names=${encodeURIComponent(selected.name)}&display=block`
  }, [selected])

  function remember(next: string[]) {
    setSaved(next)
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(next))
    } catch {
      // The visible selection still works when browser storage is unavailable.
    }
  }

  function toggleSaved(icon: DisplayIcon) {
    const key = `${icon.family}:${icon.name}`
    remember(saved.includes(key) ? saved.filter((item) => item !== key) : [...saved, key])
  }

  async function copyName(icon: DisplayIcon) {
    try {
      await navigator.clipboard.writeText(icon.name)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  function choose(icon: DisplayIcon) {
    setSelected(icon)
    setFilled(false)
    setCopied(false)
  }

  function changeQuery(value: string) {
    setQuery(value)
    setPage(0)
  }

  function changeFamily(value: "all" | IconFamily["id"]) {
    setFamily(value)
    setPage(0)
  }

  function changeCategory(value: string) {
    setCategory(value)
    setPage(0)
  }

  const selectedKey = selected ? `${selected.family}:${selected.name}` : ""

  return (
    <div className={`icon-studio-shell${dark ? " dark" : ""}`}>
      <SiteHeader />
      <main className="icon-studio-main">
        <section className="icon-studio-opening" aria-labelledby="icon-library-title">
          <div>
            <Link href="/studio#library">Studio library</Link>
            <h1 id="icon-library-title">Find the right symbol before drawing another one.</h1>
            <p>Lucide handles familiar interface actions. Material Symbols Rounded supplies the wider vocabulary. Search both, touch the details, and save only what a project needs.</p>
          </div>
          <div className="icon-opening-actions">
            <div className="mood-picker" role="group" aria-label="Choose light or dark">
              <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}><Sun /> Light</button>
              <button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon /> Dark</button>
            </div>
            <dl>
              {catalog.families.map((item) => <div key={item.id}><dt>{item.name}</dt><dd>{item.count.toLocaleString()} icons available</dd></div>)}
              <div><dt>Saved shelf</dt><dd>{saved.length} choices kept for projects</dd></div>
            </dl>
          </div>
        </section>

        <section className="icon-policy" aria-label="Icon rules">
          <div><span>01</span><strong>Start with Lucide</strong><p>Use one consistent outline language for everyday controls and navigation.</p></div>
          <div><span>02</span><strong>Reach for Material</strong><p>Use the broader rounded family when the object or specialist concept is missing.</p></div>
          <div><span>03</span><strong>Keep brands separate</strong><p>Company marks are verified assets, never improvised from a general icon.</p></div>
        </section>

        <section className="icon-browser" aria-labelledby="icon-browser-title">
          <header>
            <div><span>Approved families</span><h2 id="icon-browser-title">Browse every available icon.</h2></div>
            <label className="icon-search"><Search aria-hidden="true" /><span className="sr-only">Search icons</span><input value={query} onChange={(event) => changeQuery(event.target.value)} placeholder="Try “calendar,” “agent,” or “export”" />{query ? <button type="button" aria-label="Clear search" onClick={() => changeQuery("")}><X /></button> : null}</label>
          </header>

          <div className="icon-family-rail" role="group" aria-label="Choose an icon family">
            <button type="button" aria-pressed={family === "all"} onClick={() => changeFamily("all")}>Both families <span>{allIcons.length.toLocaleString()}</span></button>
            {catalog.families.map((item) => <button key={item.id} type="button" aria-pressed={family === item.id} onClick={() => changeFamily(item.id)}>{item.name} <span>{item.count.toLocaleString()}</span></button>)}
          </div>
          <div className="icon-category-rail" role="group" aria-label="Choose an icon category">
            {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => changeCategory(item)}>{item}</button>)}
          </div>

          <div className="icon-browser-layout">
            <div className="icon-results">
              <p aria-live="polite">{filtered.length.toLocaleString()} icons match this view. Showing {visible.length} on this page.</p>
              <div className="icon-grid">
                {visible.map((icon) => {
                  const key = `${icon.family}:${icon.name}`
                  return <button key={key} type="button" aria-pressed={selectedKey === key} onClick={() => choose(icon)}><Glyph icon={icon} size={28} stroke={2} weight={400} filled={false} /><strong>{icon.label}</strong><small>{icon.familyName}</small>{saved.includes(key) ? <Star className="is-saved" aria-label="Saved" /> : null}</button>
                })}
              </div>
              {visible.length === 0 ? <div className="icon-empty"><strong>No icons matched that phrase.</strong><button type="button" onClick={() => { setQuery(""); setFamily("all"); setCategory("All"); setPage(0) }}>Show the complete library</button></div> : null}
              <nav className="icon-pagination" aria-label="Icon pages">
                <button type="button" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}><ChevronLeft /> Previous</button>
                <span>Page {Math.min(page + 1, pageCount)} of {pageCount}</span>
                <button type="button" disabled={page >= pageCount - 1} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}>Next <ChevronRight /></button>
              </nav>
            </div>

            <aside className="icon-inspector" aria-live="polite">
              {selected ? (
                <>
                  <div className="icon-inspector-preview"><Glyph icon={selected} size={size * 2} stroke={stroke} weight={weight} filled={filled} /></div>
                  <header><span>{selected.familyName}</span><h2>{selected.label}</h2><p>{selected.name}</p></header>
                  <label>Size <output>{size}px</output><input type="range" min="20" max="48" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
                  {selected.family === "lucide" ? <label>Stroke <output>{stroke.toFixed(1)}</output><input type="range" min="1" max="3" step="0.25" value={stroke} onChange={(event) => setStroke(Number(event.target.value))} /></label> : <label>Weight <output>{weight}</output><input type="range" min="100" max="700" step="100" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /></label>}
                  <button className="icon-fill-toggle" type="button" aria-pressed={filled} onClick={() => setFilled((value) => !value)}>{filled ? <Check /> : null}{filled ? "Filled state" : "Outline state"}</button>
                  <div className="icon-inspector-actions"><button type="button" onClick={() => toggleSaved(selected)}><Star fill={saved.includes(selectedKey) ? "currentColor" : "none"} />{saved.includes(selectedKey) ? "Remove from shelf" : "Save for a project"}</button><button type="button" onClick={() => copyName(selected)}>{copied ? <Check /> : <Copy />}{copied ? "Name copied" : "Copy icon name"}</button></div>
                </>
              ) : <div className="icon-inspector-empty"><strong>Choose an icon.</strong><p>Its size, weight, fill, name, and saved state will appear here.</p></div>}
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter note="Two approved families. One consistent decision rule." />
    </div>
  )
}
