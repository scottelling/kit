"use client"

import {
  Archive,
  Check,
  ChevronsLeft,
  ChevronsRight,
  Command,
  ExternalLink,
  FileText,
  Folder,
  GripVertical,
  History,
  Inbox,
  MoreHorizontal,
  PanelLeftOpen,
  PanelRightOpen,
  Plus,
  Search,
  Settings,
  Sparkles,
  X,
} from "lucide-react"
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react"
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"

type WorkItem = {
  id: string
  title: string
  group: string
  status: "Draft" | "Review" | "Ready"
  updated: string
}

const startingItems: WorkItem[] = [
  { id: "release", title: "Release direction", group: "Launch", status: "Review", updated: "Now" },
  { id: "website", title: "Website narrative", group: "Launch", status: "Draft", updated: "12m" },
  { id: "research", title: "Customer research", group: "Research", status: "Ready", updated: "1h" },
  { id: "notes", title: "Planning notes", group: "Research", status: "Draft", updated: "Yesterday" },
]

const rightTabs = ["Context", "Activity", "Preview"] as const
type RightTab = (typeof rightTabs)[number]
const narrowQuery = "(max-width: 76rem)"

function subscribeToWidth(callback: () => void) {
  const query = window.matchMedia(narrowQuery)
  query.addEventListener("change", callback)
  return () => query.removeEventListener("change", callback)
}

function getNarrowSnapshot() {
  return window.matchMedia(narrowQuery).matches
}

function getServerNarrowSnapshot() {
  return false
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

export function CalmWorkbench() {
  const shellRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const commandRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState(startingItems)
  const [selectedId, setSelectedId] = useState("release")
  const [query, setQuery] = useState("")
  const narrow = useSyncExternalStore(subscribeToWidth, getNarrowSnapshot, getServerNarrowSnapshot)
  const [leftChoice, setLeftChoice] = useState<boolean | null>(null)
  const [rightChoice, setRightChoice] = useState<boolean | null>(null)
  const leftOpen = leftChoice ?? !narrow
  const rightOpen = rightChoice ?? !narrow
  const setLeftOpen = setLeftChoice
  const setRightOpen = setRightChoice
  const [leftWidth, setLeftWidth] = useState(280)
  const [rightWidth, setRightWidth] = useState(380)
  const [rightTab, setRightTab] = useState<RightTab>("Context")
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [command, setCommand] = useState("")
  const [proposal, setProposal] = useState("")
  const [notice, setNotice] = useState<string | null>(null)
  const [undoTitle, setUndoTitle] = useState<string | null>(null)

  const selected = items.find((item) => item.id === selectedId) ?? items[0]
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return items.filter((item) => !needle || `${item.title} ${item.group} ${item.status}`.toLowerCase().includes(needle))
  }, [items, query])

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        event.stopImmediatePropagation()
        setCommandOpen(true)
        window.requestAnimationFrame(() => commandRef.current?.focus())
      } else if (event.key === "Escape") {
        if (menuOpen) setMenuOpen(false)
        else if (commandOpen) {
          setCommandOpen(false)
          setProposal("")
        }
      }
    }
    window.addEventListener("keydown", handleShortcut, { capture: true })
    return () => window.removeEventListener("keydown", handleShortcut, { capture: true })
  }, [commandOpen, menuOpen])

  function createItem() {
    const next: WorkItem = { id: `new-${items.length + 1}`, title: "Untitled note", group: "Launch", status: "Draft", updated: "Now" }
    setItems((current) => [next, ...current])
    setSelectedId(next.id)
    setNotice("New note created")
    window.requestAnimationFrame(() => titleRef.current?.select())
  }

  function updateTitle(value: string) {
    setItems((current) => current.map((item) => item.id === selected.id ? { ...item, title: value, updated: "Now" } : item))
  }

  function commitTitle(previous: string) {
    const current = selected.title.trim() || "Untitled note"
    if (current !== selected.title) updateTitle(current)
    if (current !== previous) {
      setUndoTitle(previous)
      setNotice(`Renamed to “${current}”`)
    }
  }

  function undoRename() {
    if (!undoTitle) return
    updateTitle(undoTitle)
    setNotice("Rename undone")
    setUndoTitle(null)
  }

  function runCommand() {
    const request = command.trim()
    if (!request) return
    setProposal(`Ready to apply “${request}” to ${selected.title}.`)
  }

  function applyProposal() {
    setItems((current) => current.map((item) => item.id === selected.id ? { ...item, status: "Ready", updated: "Now" } : item))
    setNotice("Change applied — marked Ready")
    setCommand("")
    setProposal("")
    setCommandOpen(false)
  }

  function resizePane(side: "left" | "right", event: ReactPointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    const bounds = shellRef.current?.getBoundingClientRect()
    if (!bounds) return
    const move = (pointer: PointerEvent) => {
      if (side === "left") setLeftWidth(clamp(pointer.clientX - bounds.left, 232, 420))
      else setRightWidth(clamp(bounds.right - pointer.clientX, 300, 520))
    }
    const stop = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", stop)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", stop)
  }

  function nudgePane(side: "left" | "right", event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    const amount = event.key === "ArrowRight" ? 16 : -16
    if (side === "left") setLeftWidth((current) => clamp(current + amount, 232, 420))
    else setRightWidth((current) => clamp(current - amount, 300, 520))
  }

  return (
    <section className="calm-workbench" aria-labelledby="calm-workbench-title">
      <header className="calm-workbench__intro">
        <div>
          <span>Signature workspace</span>
          <h2 id="calm-workbench-title">Quiet structure for work that changes constantly.</h2>
          <p>Search, edit, resize, collapse, inspect, and command the same selected object. The shell is optional; the Calm language works just as well on a simple page.</p>
        </div>
        <div className="calm-workbench__proof"><Check aria-hidden="true" /><span><strong>Dark authority</strong><small>No invented light mode</small></span></div>
      </header>

      <div
        className={`calm-app${leftOpen ? " is-left-open" : ""}${rightOpen ? " is-right-open" : ""}`}
        ref={shellRef}
        style={{ "--calm-left-width": `${leftWidth}px`, "--calm-right-width": `${rightWidth}px` } as CSSProperties}
      >
        <aside className="calm-pane calm-nav" aria-label="Workspace navigation">
          <header className="calm-pane__bar">
            <strong>Field Notes</strong>
            <button type="button" aria-label="Close navigation" title="Close navigation" onClick={() => setLeftOpen(false)}><ChevronsLeft aria-hidden="true" /></button>
          </header>
          <button className="calm-new" type="button" onClick={createItem}><Plus aria-hidden="true" />New note</button>
          <label className="calm-search"><Search aria-hidden="true" /><span className="sr-only">Search notes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search everything" />{query ? <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X aria-hidden="true" /></button> : null}</label>
          <div className="calm-nav__filters" role="group" aria-label="Filter notes"><button type="button" aria-pressed="true">All</button><button type="button">Mine</button><button type="button">Ready</button></div>
          <nav className="calm-nav__list" aria-label="Notes">
            {filtered.length ? filtered.map((item) => (
              <button key={item.id} type="button" aria-current={selected.id === item.id ? "page" : undefined} onClick={() => { setSelectedId(item.id); setQuery(""); if (window.matchMedia("(max-width: 76rem)").matches) setLeftOpen(false) }}>
                {item.group === "Launch" ? <Folder aria-hidden="true" /> : <FileText aria-hidden="true" />}
                <span><strong>{item.title}</strong><small>{item.group} · {item.updated}</small></span>
                <i>{item.status}</i>
                <MoreHorizontal aria-label={`More actions for ${item.title}`} />
              </button>
            )) : <div className="calm-empty"><strong>No notes found</strong><span>Clear the search to return to everything.</span><button type="button" onClick={() => setQuery("")}>Clear search</button></div>}
          </nav>
          <footer><button type="button"><Archive aria-hidden="true" />Archive</button><button type="button"><Settings aria-hidden="true" />Settings</button></footer>
        </aside>

        <button className="calm-resizer calm-resizer--left" type="button" aria-label="Resize navigation. Use left and right arrow keys." onPointerDown={(event) => resizePane("left", event)} onKeyDown={(event) => nudgePane("left", event)}><GripVertical aria-hidden="true" /></button>

        <main className="calm-primary">
          <header className="calm-object-bar">
            <div>
              {!leftOpen ? <button type="button" aria-label="Open navigation" title="Open navigation" onClick={() => { setLeftOpen(true); if (window.matchMedia("(max-width: 76rem)").matches) setRightOpen(false) }}><PanelLeftOpen aria-hidden="true" /></button> : null}
              <span>Launch / {selected.status}</span>
            </div>
            <div>
              <button type="button" onClick={() => setItems((current) => current.map((item) => item.id === selected.id ? { ...item, status: item.status === "Ready" ? "Draft" : "Ready" } : item))}>{selected.status === "Ready" ? "Reopen" : "Mark ready"}</button>
              <button type="button" aria-label="Open note actions" aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}><MoreHorizontal aria-hidden="true" /></button>
              {!rightOpen ? <button type="button" aria-label="Open utilities" title="Open utilities" onClick={() => { setRightOpen(true); if (window.matchMedia("(max-width: 76rem)").matches) setLeftOpen(false) }}><PanelRightOpen aria-hidden="true" /></button> : null}
              {menuOpen ? <div className="calm-menu" role="menu"><button type="button" role="menuitem" onClick={() => { titleRef.current?.focus(); setMenuOpen(false) }}>Rename note</button><button type="button" role="menuitem" onClick={() => { setNotice("Note duplicated"); setMenuOpen(false) }}>Duplicate note</button><hr /><button type="button" role="menuitem" className="is-danger" onClick={() => { setNotice("Move to archive requires confirmation"); setMenuOpen(false) }}>Move note to archive</button></div> : null}
            </div>
          </header>

          <article className="calm-document">
            <div className="calm-document__meta"><span>{selected.group}</span><span>{selected.status}</span><span>Updated {selected.updated}</span></div>
            <input
              ref={titleRef}
              className="calm-title-input"
              aria-label="Note title"
              value={selected.title}
              onFocus={(event) => event.currentTarget.dataset.previous = selected.title}
              onChange={(event) => updateTitle(event.target.value)}
              onBlur={(event) => commitTitle(event.currentTarget.dataset.previous ?? selected.title)}
              onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur(); if (event.key === "Escape") { updateTitle(event.currentTarget.dataset.previous ?? selected.title); event.currentTarget.blur() } }}
            />
            <p className="calm-document__lead">A launch should make one useful decision feel obvious. Keep the message restrained, name what changes, and let the current work remain the center of attention.</p>
            <section className="calm-section">
              <header><button type="button" aria-label="Move section"><GripVertical aria-hidden="true" /></button><div><h3>Current direction</h3><span>Working note</span></div><button type="button" aria-label="Section actions"><MoreHorizontal aria-hidden="true" /></button></header>
              <p>Lead with the completed capability. Supporting proof follows in the order a person needs it. Decorative explanation stays out of the way.</p>
            </section>
            <section className="calm-section">
              <header><button type="button" aria-label="Move section"><GripVertical aria-hidden="true" /></button><div><h3>Decision checklist</h3><span>3 items</span></div><button type="button" aria-label="Section actions"><MoreHorizontal aria-hidden="true" /></button></header>
              <label><input type="checkbox" defaultChecked />The selected object stays obvious</label>
              <label><input type="checkbox" defaultChecked />The next useful action is named</label>
              <label><input type="checkbox" />The final proof is attached</label>
            </section>
          </article>

          {notice ? <div className="calm-toast" role="status"><span>{notice}</span>{undoTitle ? <button type="button" onClick={undoRename}>Undo</button> : null}<button type="button" aria-label="Dismiss notification" onClick={() => { setNotice(null); setUndoTitle(null) }}><X aria-hidden="true" /></button></div> : null}

          <section className={`calm-command${commandOpen ? " is-open" : ""}`} aria-label="Command surface">
            {!commandOpen ? <button type="button" onClick={() => { setCommandOpen(true); window.requestAnimationFrame(() => commandRef.current?.focus()) }}><Command aria-hidden="true" /><span>Ask or command…</span><kbd>⌘K</kbd></button> : (
              <div>
                <header><span><Sparkles aria-hidden="true" />Working with {selected.title}</span><button type="button" aria-label="Close command surface" onClick={() => { setCommandOpen(false); setProposal("") }}><X aria-hidden="true" /></button></header>
                {proposal ? <div className="calm-command__proposal"><p>{proposal}</p><div><button type="button" onClick={() => setProposal("")}>Cancel</button><button type="button" onClick={applyProposal}>Apply</button></div></div> : null}
                <form onSubmit={(event) => { event.preventDefault(); runCommand() }}><input ref={commandRef} aria-label="Command" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Try “mark this ready”" /><button type="submit" disabled={!command.trim()}>Run</button></form>
              </div>
            )}
          </section>
        </main>

        <button className="calm-resizer calm-resizer--right" type="button" aria-label="Resize utilities. Use left and right arrow keys." onPointerDown={(event) => resizePane("right", event)} onKeyDown={(event) => nudgePane("right", event)}><GripVertical aria-hidden="true" /></button>

        <aside className="calm-pane calm-utility" aria-label="Context and utilities">
          <header className="calm-pane__bar"><strong>Utilities</strong><button type="button" aria-label="Close utilities" title="Close utilities" onClick={() => setRightOpen(false)}><ChevronsRight aria-hidden="true" /></button></header>
          <div className="calm-tabs" role="tablist" aria-label="Utility view">{rightTabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={rightTab === tab} onClick={() => setRightTab(tab)}>{tab}</button>)}</div>
          <div className="calm-utility__content" role="tabpanel">
            {rightTab === "Context" ? <><section><span>Selected object</span><strong>{selected.title}</strong><p>Launch · {selected.status}</p></section><section><span>Related work</span><button type="button"><FileText aria-hidden="true" /><span><strong>Launch brief</strong><small>Ready</small></span></button><button type="button"><Inbox aria-hidden="true" /><span><strong>Review feedback</strong><small>3 notes</small></span></button></section></> : null}
            {rightTab === "Activity" ? <ol className="calm-activity"><li><History aria-hidden="true" /><div><strong>Direction updated</strong><span>Just now</span></div></li><li><Check aria-hidden="true" /><div><strong>Research approved</strong><span>Today</span></div></li><li><FileText aria-hidden="true" /><div><strong>Note created</strong><span>Yesterday</span></div></li></ol> : null}
            {rightTab === "Preview" ? <div className="calm-preview"><div><small>Launch note</small><strong>{selected.title}</strong><p>A quiet preview keeps the primary document in charge.</p></div><button type="button"><ExternalLink aria-hidden="true" />Open full preview</button></div> : null}
          </div>
        </aside>
      </div>
    </section>
  )
}
