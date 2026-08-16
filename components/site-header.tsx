"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react"

import animationLibrary from "@/lib/animation-library.json"
import elementsLibrary from "@/lib/elements-library.json"
import library from "@/lib/purple-rain-library.json"
import osLibrary from "@/lib/os-library.json"
import { studioAssets, studioCategories } from "@/lib/studio-library"

const familyPlaces = [
  ["Foundations", "Colors, type, spacing, shape, and depth"],
  ["Actions", "Buttons, toggles, toolbars, and choices"],
  ["Forms", "Fields, pickers, switches, and uploads"],
  ["Navigation", "Ways to move, filter, and know your place"],
  ["Overlays", "Dialogs, menus, sheets, and focused surfaces"],
  ["Feedback", "Status, loading, success, and recovery"],
  ["Data", "Cards, lists, tables, charts, and calendars"],
  ["Patterns", "Complete forms, settings, checkout, and search"],
].map(([label, hint]) => ({ label, hint, href: `/kit#family-${label.toLowerCase()}`, words: label.toLowerCase() }))

const places = [
  { label: "Browse icons", hint: "Search every approved Lucide and Material Symbols Rounded icon", href: "/studio/icons", words: "icons symbols lucide material rounded search gallery" },
  { label: "Browse fonts", hint: "Test approved fonts in headings, reading, controls, and pairings", href: "/studio/fonts", words: "fonts typography type pairings outfit jetbrains inter serif" },
  { label: "Prepare a kit swap", hint: "Keep the product, repair the experience, and change the visual system", href: "/studio/swap", words: "swap adopt migrate theme product repair rollback cabinet" },
  { label: "Open Elements", hint: "Touch complete behaviors and carry them into a project", href: "/elements", words: "elements knight rider larson scanner signature effects motion code interactive" },
  { label: "Explore Animation Studio", hint: "Shape scenes, motion, timelines, code, and delivery in one complete creative workspace", href: "/kit/animation", words: "animation studio cue storyboard canvas inspector motion timeline code delivery components kit" },
  { label: "Explore Shadow", hint: "Test smooth depth and one continuous edge on real surfaces", href: "/kit/shadow", words: "shadow elevation depth ring cards dialogs menus smooth" },
  { label: "Explore OS", hint: "Use the complete solid-surface system for desktop, phone, and widget products", href: "/kit/os", words: "os complete kit desktop phone widget window dock command themes components" },
  { label: "Explore JADE", hint: "Touch every raised, seated, and sunken JADE piece", href: "/kit/jade", words: "jade complete kit tactile mint components" },
  { label: "Compare the systems", hint: "Use the same working interface in JADE and Purple Rain", href: "/kit/jade/compare", words: "jade purple rain comparison live working interface" },
  { label: "Build a project", hint: "Shape a brief into a complete system, then build the working screens", href: "/build", words: "make create start execute project plain english shape studio system" },
  { label: "Saved projects", hint: "Return to drafts, built work, and approvals", href: "/projects", words: "saved history drafts archive approved" },
  { label: "Complete templates", hint: "Choose from eight complete project systems", href: "/templates", words: "landing app ecommerce publication portfolio docs marketplace campaign screens" },
  { label: "Shape a kit copy", hint: "Change a safe copy in plain English and prove it on a real interface", href: "/labs", words: "theme workshop copy colors type shape depth light dark apply publish restore" },
  { label: "Creative Labs", hint: "Tune brand, type, color, text, and motion", href: "/labs", words: "brand fonts palettes text effects animation movement" },
  { label: "Quality approval", hint: "See every release check and approval state", href: "/quality", words: "audit accessibility approve release check standards" },
  { label: "Shape a design system", hint: "Direction, type, color, motion, templates, skills, and team in plain English", href: "/build", words: "studio brief brand fonts colors motion templates prompts skills agents ship deploy" },
  ...studioCategories.map((item) => ({
    label: item.plain,
    hint: `${item.name} in the complete Build library`,
    href: `/build#studio-${item.name.toLowerCase()}`,
    words: `${item.name} ${item.plain}`.toLowerCase(),
  })),
  ...studioAssets.map((item) => ({
    label: item.name,
    hint: item.summary,
    href: `/build#library`,
    words: `${item.category} ${item.bestFor} ${item.detail}`.toLowerCase(),
  })),
  ...elementsLibrary.map((item) => ({
    label: item.title,
    hint: item.description,
    href: `/elements#${item.id}`,
    words: `${item.category} ${item.technicalName}`.toLowerCase(),
  })),
  ...familyPlaces,
  { label: "Compare styles", hint: "Try Purple Rain beside Origin", href: "/demo", words: "origin side by side" },
  ...library.map((item) => ({
    label: item.title,
    hint: item.description,
    href: `/kit#${item.name}`,
    words: `${item.category} ${item.preview}`,
  })),
  ...osLibrary.filter((item) => item.category === "OS Patterns").map((item) => ({
    label: item.title,
    hint: item.description,
    href: `/kit/os#${item.name}`,
    words: `os ${item.category} ${item.preview}`,
  })),
  ...animationLibrary.filter((item) => item.category === "Animation Patterns").map((item) => ({
    label: item.title,
    hint: item.description,
    href: `/kit/animation#${item.name}`,
    words: `animation studio ${item.category} ${item.preview}`,
  })),
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const buildPages = ["/build", "/projects", "/templates", "/labs", "/quality", "/preview"]

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return places.slice(0, 9)
    return places.filter((place) => `${place.label} ${place.hint} ${place.words}`.toLowerCase().includes(needle)).slice(0, 12)
  }, [query])

  function openFinder() {
    setQuery("")
    setActive(0)
    dialogRef.current?.showModal()
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  function closeFinder() {
    dialogRef.current?.close()
  }

  function visit(href: string) {
    closeFinder()
    if (pathname === "/kit" && href.startsWith("/kit#")) {
      const hash = href.slice(4)
      window.history.pushState(null, "", hash)
      window.dispatchEvent(new CustomEvent("kit-reveal", { detail: hash.slice(1) }))
      return
    }
    router.push(href)
  }

  function handleFinderKeys(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActive((current) => (current + 1) % results.length)
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActive((current) => (current - 1 + results.length) % results.length)
    }
    if (event.key === "Enter") {
      event.preventDefault()
      visit(results[active]?.href ?? results[0].href)
    }
  }

  useEffect(() => {
    function handleShortcut(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        openFinder()
      }
    }
    window.addEventListener("keydown", handleShortcut)
    return () => window.removeEventListener("keydown", handleShortcut)
  }, [])

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Kits home">
          kits<span aria-hidden="true">.</span>
        </Link>
        <button className="find-button" type="button" onClick={openFinder}>
          <Search aria-hidden="true" />
          <span>What are you looking for?</span>
        </button>
        <nav aria-label="Main pages">
          <Link aria-current={buildPages.includes(pathname) || pathname.startsWith("/studio") ? "page" : undefined} href="/build">Build</Link>
          <Link aria-current={pathname === "/elements" ? "page" : undefined} href="/elements">Elements</Link>
          <Link aria-current={pathname.startsWith("/kit") ? "page" : undefined} href="/kit">Kits</Link>
        </nav>
      </header>

      <dialog
        className="finder-dialog"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeFinder()
        }}
      >
        <div className="finder-panel">
          <div className="finder-heading">
            <div>
              <h2>Find a piece</h2>
              <p>Type what you want to see.</p>
            </div>
            <button type="button" onClick={closeFinder}>Close</button>
          </div>
          <label className="finder-field">
            <span className="sr-only">Find a piece</span>
            <Search aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActive(0)
              }}
              onKeyDown={handleFinderKeys}
              placeholder="Try “calendar” or “checkout”"
              autoComplete="off"
            />
          </label>
          <div className="finder-results" role="listbox" aria-label="Matching pieces">
            {results.map((place, index) => (
              <button
                className={index === active ? "is-active" : undefined}
                type="button"
                role="option"
                aria-selected={index === active}
                key={`${place.href}-${place.label}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => visit(place.href)}
              >
                <strong>{place.label}</strong>
                <span>{place.hint}</span>
              </button>
            ))}
            {results.length === 0 ? (
              <p className="finder-empty">Nothing matched that phrase. Try “calendar,” “forms,” or “compare.”</p>
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  )
}
