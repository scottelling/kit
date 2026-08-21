"use client"

import { Moon, Search, Sun, X } from "lucide-react"
import Link from "next/link"
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import animationTokens from "@/lib/animation-tokens.json"
import calmTokens from "@/lib/calm-tokens.json"
import osTokens from "@/lib/os-tokens.json"
import sourcedKits from "@/lib/sourced-kits.generated.json"
import vanillaTokens from "@/lib/vanilla-kit-tokens.json"
import voltageTokens from "@/lib/voltage-tokens.json"

import { AnimationWorkbench } from "./animation/animation-workbench"
import { CalmWorkbench } from "./calm/calm-workbench"
import { ComponentPreview, type LibraryItem } from "./component-preview"
import { OsWorkbench } from "./os/os-workbench"
import { VoltageWorkbench } from "./voltage/voltage-workbench"

type KitExperienceProps = {
  library: LibraryItem[]
  system?: "purple-rain" | "jade" | "os" | "animation" | "vanilla" | "voltage" | "calm"
}

const familyOrder = ["Foundations", "Actions", "Forms", "Navigation", "Overlays", "Feedback", "Data", "Patterns", "OS Patterns", "Animation Patterns"]
const osThemes = [
  { id: "default", label: "Default", source: "dark" },
  { id: "daylight", label: "Daylight", source: "light" },
  { id: "hacker", label: "Hacker", source: "hacker" },
  { id: "ethereal", label: "Ethereal", source: "ethereal" },
  { id: "paper", label: "Paper", source: "paper" },
] as const

export function KitExperience({ library, system = "purple-rain" }: KitExperienceProps) {
  const [dark, setDark] = useState(system === "voltage" || system === "calm")
  const [osTheme, setOsTheme] = useState<(typeof osThemes)[number]["id"]>("default")
  const [query, setQuery] = useState("")
  const [family, setFamily] = useState("All")
  const [selected, setSelected] = useState<LibraryItem | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previewTriggerRef = useRef<HTMLElement | null>(null)
  const activeKitRef = useRef<HTMLAnchorElement>(null)
  const isJade = system === "jade"
  const isOs = system === "os"
  const isAnimation = system === "animation"
  const isVanilla = system === "vanilla"
  const isVoltage = system === "voltage"
  const isCalm = system === "calm"
  const systemName = isJade ? "JADE" : isOs ? "OS" : isAnimation ? "Animation Studio" : isVanilla ? "Vanilla" : isVoltage ? "Voltage" : isCalm ? "Calm Desktop" : "Purple Rain"
  const familyCount = new Set(library.map((item) => item.category)).size
  const selectedOsTheme = osThemes.find((theme) => theme.id === osTheme) ?? osThemes[0]
  const osThemeValues = selectedOsTheme.source === "light"
    ? osTokens.light
    : selectedOsTheme.source === "dark"
      ? osTokens.dark
      : osTokens.presets[selectedOsTheme.source]
  const osStyle = isOs
    ? Object.fromEntries(Object.entries({ ...osTokens.theme, ...osThemeValues }).map(([name, value]) => [`--${name}`, value])) as CSSProperties
    : undefined
  const animationStyle = isAnimation
    ? Object.fromEntries(Object.entries({ ...animationTokens.theme, ...animationTokens.source }).map(([name, value]) => [`--${name}`, value])) as CSSProperties
    : undefined
  const vanillaStyle = isVanilla
    ? Object.fromEntries(Object.entries({ ...vanillaTokens.theme, ...(dark ? vanillaTokens.dark : vanillaTokens.light) }).map(([name, value]) => [`--${name}`, value])) as CSSProperties
    : undefined
  const voltageStyle = isVoltage
    ? Object.fromEntries(Object.entries({ ...voltageTokens.theme, ...(dark ? voltageTokens.dark : voltageTokens.light) }).map(([name, value]) => [`--${name}`, value])) as CSSProperties
    : undefined
  const calmStyle = isCalm
    ? Object.fromEntries(Object.entries({ ...calmTokens.theme, ...calmTokens.dark }).map(([name, value]) => [`--${name}`, value])) as CSSProperties
    : undefined
  const availableFamilies = familyOrder.filter((name) => library.some((item) => item.category === name))

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return library.filter((item) => {
      const familyMatches = family === "All" || item.category === family
      const wordsMatch = !needle || `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(needle)
      return familyMatches && wordsMatch
    })
  }, [family, library, query])

  const grouped = useMemo(() => availableFamilies.map((name) => ({
    name,
    items: filtered.filter((item) => item.category === name),
  })).filter((group) => group.items.length), [availableFamilies, filtered])

  function openPreview(item: LibraryItem) {
    previewTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelected(item)
    window.requestAnimationFrame(() => dialogRef.current?.showModal())
  }

  function closePreview() {
    dialogRef.current?.close()
    setSelected(null)
    window.requestAnimationFrame(() => previewTriggerRef.current?.focus())
  }

  useEffect(() => {
    if (window.innerWidth < 640) {
      const activeLink = activeKitRef.current
      const rail = activeLink?.parentElement
      if (activeLink && rail) rail.scrollLeft = activeLink.offsetLeft - (rail.clientWidth - activeLink.clientWidth) / 2
    }
  }, [system])

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
    <div style={osStyle ?? animationStyle ?? vanillaStyle ?? voltageStyle ?? calmStyle} className={`kit-shell${isJade ? " jade-library" : ""}${isOs ? ` os-library os-theme-${osTheme}` : ""}${isAnimation ? " animation-library" : ""}${isVanilla ? " vanilla-library" : ""}${isVoltage ? " voltage-library" : ""}${isCalm ? " calm-library" : ""}${dark || isAnimation || isCalm || (isOs && selectedOsTheme.source !== "light" && selectedOsTheme.source !== "paper") ? " dark" : ""}`}>
      <SiteHeader />
      <main className="kit-main">
        <nav className="kit-worlds" aria-label="Choose a kit">
          <span>Kits</span>
          <div>
            <Link ref={!isJade && !isOs && !isAnimation && !isVanilla && !isVoltage && !isCalm ? activeKitRef : undefined} aria-current={!isJade && !isOs && !isAnimation && !isVanilla && !isVoltage && !isCalm ? "page" : undefined} href="/kit">Purple Rain <small>{library.length} pieces</small></Link>
            <Link ref={isVanilla ? activeKitRef : undefined} aria-current={isVanilla ? "page" : undefined} href="/kit/vanilla">Vanilla <small>{library.length} pieces</small></Link>
            <Link ref={isJade ? activeKitRef : undefined} aria-current={isJade ? "page" : undefined} href="/kit/jade">JADE <small>{library.length} pieces</small></Link>
            <Link ref={isOs ? activeKitRef : undefined} aria-current={isOs ? "page" : undefined} href="/kit/os">OS <small>{library.length} pieces</small></Link>
            <Link ref={isAnimation ? activeKitRef : undefined} aria-current={isAnimation ? "page" : undefined} href="/kit/animation">Animation <small>{library.length} pieces</small></Link>
            <Link ref={isVoltage ? activeKitRef : undefined} aria-current={isVoltage ? "page" : undefined} href="/kit/voltage">Voltage <small>{library.length} pieces</small></Link>
            <Link ref={isCalm ? activeKitRef : undefined} aria-current={isCalm ? "page" : undefined} href="/kit/calm">Calm <small>{library.length} pieces</small></Link>
            <Link href="/kit/shadow">Shadow <small>12 elevations</small></Link>
            {sourcedKits.map((kit) => (
              <Link key={kit.id} href={kit.route}>{kit.title} <small>{kit.pieceCount} pieces</small></Link>
            ))}
          </div>
        </nav>
        <section className="kit-index-intro" aria-labelledby="kit-title">
          <div className="kit-index-intro__copy">
            <h1 id="kit-title">The whole {systemName} kit.</h1>
            <p>{isJade ? "Raised, seated, and sunken surfaces now cover the complete catalog. OS and creative-workspace patterns are available when a product needs them, never forced." : isOs ? "The useful OS identity now covers the complete catalog: everyday product pieces, desktop and mobile structures, and optional creative-workspace patterns." : isAnimation ? "A complete dark system for every product surface: everyday interface pieces plus optional desktop, storyboard, canvas, inspector, motion, timeline, code, and delivery structures." : isVanilla ? "The neutral starting system for new products. Every piece uses the shared Kit language, so another visual system can replace the appearance later without rebuilding the product." : isVoltage ? "A vivid desktop system built from solid color blocks, rounded object geometry, and unmistakable status signals. The full catalog is here; its signature workspace stays optional." : isCalm ? "A quiet, dense desktop system built from graphite structure, inline editing, native-style navigation, restrained periwinkle decisions, and transient-only depth. Its three-pane workspace stays optional." : "Every shared and specialist piece is here. Find one by name, choose a family, then touch it before you use it. Specialist layouts stay optional."}</p>
            {isJade ? <Link className="kit-compare-link" href="/kit/jade/compare">See JADE beside Purple Rain</Link> : null}
            {isVanilla ? <a className="kit-compare-link" href="/vanilla">Open the working project starter</a> : null}
          </div>
          <div className="kit-count" aria-label={`${library.length} pieces in ${familyCount} families`}>
            <strong>{library.length}</strong>
            <span>pieces</span>
            <i aria-hidden="true" />
            <b>{familyCount} families</b>
          </div>
          {isOs ? (
            <div className="mood-picker os-theme-picker" role="group" aria-label="Choose an OS theme">
              {osThemes.map((theme) => <button key={theme.id} type="button" aria-pressed={osTheme === theme.id} onClick={() => setOsTheme(theme.id)}>{theme.label}</button>)}
            </div>
          ) : isAnimation || isCalm ? (
            <div className="animation-mode-note"><Moon aria-hidden="true" /><span><strong>Dark authority</strong><small>No invented light theme</small></span></div>
          ) : (
            <div className="mood-picker" role="group" aria-label="Choose light or dark">
              <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}><Sun aria-hidden="true" /> Light</button>
              <button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon aria-hidden="true" /> Dark</button>
            </div>
          )}
        </section>

        {isOs ? <OsWorkbench /> : null}
        {isAnimation ? <AnimationWorkbench /> : null}
        {isVoltage ? <VoltageWorkbench /> : null}
        {isCalm ? <CalmWorkbench /> : null}

        <section className="kit-finder" aria-label="Find a component">
          <label className="kit-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Find a piece</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a piece" />
            {query ? <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X /></button> : null}
          </label>
          <div className="family-rail" role="group" aria-label="Choose a family">
            {["All", ...availableFamilies].map((name) => (
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
                      <div className="kit-tile__sample"><ComponentPreview item={item} system={system} /></div>
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
              <button type="button" onClick={() => { setQuery(""); setFamily("All") }}>Show all {library.length} pieces</button>
            </section>
          ) : null}
        </div>
      </main>

      <dialog
        className="kit-preview-dialog"
        ref={dialogRef}
        onCancel={(event) => { event.preventDefault(); closePreview() }}
        onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closePreview() } }}
        onClose={(event) => { if (event.target === event.currentTarget) setSelected(null) }}
        onClick={(event) => { if (event.target === event.currentTarget) closePreview() }}
      >
        {selected ? (
          <div className="kit-preview-panel">
            <header>
              <div><span>{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p></div>
              <button type="button" onClick={closePreview}>Close</button>
            </header>
            <div className="kit-preview-stage"><ComponentPreview item={selected} expanded system={system} /></div>
            <footer><span>{isOs ? "Five solid theme moods ready" : isAnimation || isCalm ? "Canonical dark foundation ready" : "Light and dark ready"}</span><div><Link href={`/studio/guides#${selected.name}`}>How to use this</Link><button type="button" onClick={() => isOs ? setOsTheme(osThemes[(osThemes.findIndex((theme) => theme.id === osTheme) + 1) % osThemes.length].id) : isAnimation || isCalm ? closePreview() : setDark((value) => !value)}>{isOs ? "Try the next theme" : isAnimation || isCalm ? "Done" : `Switch to ${dark ? "light" : "dark"}`}</button></div></footer>
          </div>
        ) : null}
      </dialog>

      <SiteFooter />
    </div>
  )
}
