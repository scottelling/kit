"use client"

import { Moon, Search, Sun, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

import { ComponentPreview, type LibraryItem } from "./component-preview"

type KitExperienceProps = {
  library: LibraryItem[]
}

const familyOrder = ["Foundations", "Actions", "Forms", "Navigation", "Overlays", "Feedback", "Data", "Patterns"]

export function KitExperience({ library }: KitExperienceProps) {
  const [dark, setDark] = useState(false)
  const [query, setQuery] = useState("")
  const [family, setFamily] = useState("All")
  const [selected, setSelected] = useState<LibraryItem | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return library.filter((item) => {
      const familyMatches = family === "All" || item.category === family
      const wordsMatch = !needle || `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(needle)
      return familyMatches && wordsMatch
    })
  }, [family, library, query])

  const grouped = useMemo(() => familyOrder.map((name) => ({
    name,
    items: filtered.filter((item) => item.category === name),
  })).filter((group) => group.items.length), [filtered])

  function openPreview(item: LibraryItem) {
    setSelected(item)
    window.requestAnimationFrame(() => dialogRef.current?.showModal())
  }

  function closePreview() {
    dialogRef.current?.close()
    setSelected(null)
  }

  useEffect(() => {
    function reveal(slug: string) {
      setQuery("")
      setFamily("All")
      window.setTimeout(() => document.getElementById(decodeURIComponent(slug))?.scrollIntoView({ block: "center" }), 0)
    }

    function revealFromEvent(event: Event) {
      reveal((event as CustomEvent<string>).detail)
    }

    function revealFromHash() {
      if (window.location.hash) reveal(window.location.hash.slice(1))
    }

    if (window.location.hash) window.setTimeout(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ block: "center" }), 0)
    window.addEventListener("kit-reveal", revealFromEvent)
    window.addEventListener("hashchange", revealFromHash)
    return () => {
      window.removeEventListener("kit-reveal", revealFromEvent)
      window.removeEventListener("hashchange", revealFromHash)
    }
  }, [])

  return (
    <div className={`kit-shell${dark ? " dark" : ""}`}>
      <SiteHeader />
      <main className="kit-main">
        <section className="kit-index-intro" aria-labelledby="kit-title">
          <div className="kit-index-intro__copy">
            <h1 id="kit-title">The whole Purple Rain kit.</h1>
            <p>Every piece is here. Find one by name, choose a family, then touch it before you use it.</p>
          </div>
          <div className="kit-count" aria-label="128 pieces in 8 families">
            <strong>128</strong>
            <span>pieces</span>
            <i aria-hidden="true" />
            <b>8 families</b>
          </div>
          <div className="mood-picker" role="group" aria-label="Choose light or dark">
            <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}><Sun aria-hidden="true" /> Light</button>
            <button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon aria-hidden="true" /> Dark</button>
          </div>
        </section>

        <section className="kit-finder" aria-label="Find a component">
          <label className="kit-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Find a piece</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a piece" />
            {query ? <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X /></button> : null}
          </label>
          <div className="family-rail" role="group" aria-label="Choose a family">
            {["All", ...familyOrder].map((name) => (
              <button key={name} type="button" aria-pressed={family === name} onClick={() => setFamily(name)}>
                {name}<span>{name === "All" ? library.length : library.filter((item) => item.category === name).length}</span>
              </button>
            ))}
          </div>
          <p className="kit-result-count" aria-live="polite">Showing {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</p>
        </section>

        <div className="kit-groups">
          {grouped.map((group) => (
            <section className="kit-family" key={group.name} aria-labelledby={`family-${group.name.toLowerCase()}`}>
              <header className="kit-family__heading">
                <h2 id={`family-${group.name.toLowerCase()}`}>{group.name}</h2>
                <span>{group.items.length}</span>
              </header>
              <div className="kit-grid">
                {group.items.map((item, index) => {
                  const wide = item.category === "Patterns" || (item.category === "Data" && index % 5 === 0) || (item.category === "Overlays" && index % 4 === 0)
                  return (
                    <article className={`kit-tile${wide ? " kit-tile--wide" : ""}`} id={item.name} key={item.name}>
                      <div className="kit-tile__sample"><ComponentPreview item={item} /></div>
                      <div className="kit-tile__caption">
                        <div><h3>{item.title}</h3><p>{item.description}</p></div>
                        <button type="button" onClick={() => openPreview(item)}>Open preview</button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
          {filtered.length === 0 ? (
            <section className="kit-no-results">
              <strong>No pieces matched “{query}”.</strong>
              <p>Try a shorter name, or return to the full kit.</p>
              <button type="button" onClick={() => { setQuery(""); setFamily("All") }}>Show all 128 pieces</button>
            </section>
          ) : null}
        </div>
      </main>

      <dialog
        className="kit-preview-dialog"
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) closePreview() }}
      >
        {selected ? (
          <div className="kit-preview-panel">
            <header>
              <div><span>{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p></div>
              <button type="button" onClick={closePreview}>Close</button>
            </header>
            <div className="kit-preview-stage"><ComponentPreview item={selected} expanded /></div>
            <footer><span>Light and dark ready</span><button type="button" onClick={() => setDark((value) => !value)}>Switch to {dark ? "light" : "dark"}</button></footer>
          </div>
        ) : null}
      </dialog>

      <SiteFooter />
    </div>
  )
}
