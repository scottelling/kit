"use client"

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react"
import Link from "next/link"
import { FormEvent, useMemo, useRef, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type KitName = "jade" | "purple"
type ViewMode = "compare" | KitName
type TaskFilter = "all" | "open" | "done"

type Task = {
  id: string
  title: string
  description: string
  context: string
}

const tasks: Task[] = [
  {
    id: "home",
    title: "Review the home page direction",
    description: "Check the opening message, the primary action, and the first mobile screen before release.",
    context: "Home page",
  },
  {
    id: "mobile",
    title: "Check the mobile navigation",
    description: "Make sure the current page and the next action remain obvious on a narrow screen.",
    context: "Navigation",
  },
  {
    id: "type",
    title: "Approve the type pairing",
    description: "Confirm that headings, body copy, and controls remain clear at every reading size.",
    context: "Typography",
  },
  {
    id: "checkout",
    title: "Test the checkout recovery path",
    description: "Walk through a declined payment and verify that the next step is unmistakable.",
    context: "Commerce",
  },
]

type WorkspaceProps = {
  kit: KitName
  dark: boolean
  filter: TaskFilter
  query: string
  selectedId: string
  completed: string[]
  direction: string
  draft: string
  visibleTasks: Task[]
  onFilter: (filter: TaskFilter) => void
  onQuery: (query: string) => void
  onSelect: (id: string) => void
  onToggle: (id: string) => void
  onDirection: (direction: string) => void
  onDraft: (draft: string) => void
  onReview: (kit: KitName) => void
}

function Workspace({
  kit,
  dark,
  filter,
  query,
  selectedId,
  completed,
  direction,
  draft,
  visibleTasks,
  onFilter,
  onQuery,
  onSelect,
  onToggle,
  onDirection,
  onDraft,
  onReview,
}: WorkspaceProps) {
  const selected = tasks.find((task) => task.id === selectedId) ?? tasks[0]
  const selectedIsDone = completed.includes(selected.id)

  return (
    <article className={`pilot-panel pilot-panel--${kit}${dark && kit === "purple" ? " dark" : ""}`}>
      <header className="pilot-panel__bar">
        <div className="pilot-panel__identity">
          <span aria-hidden="true">{kit === "jade" ? "J" : "P"}</span>
          <div>
            <strong>{kit === "jade" ? "JADE" : "Purple Rain"}</strong>
            <small>{kit === "jade" ? "Tactile and light-native" : "Clear and decision-led"}</small>
          </div>
        </div>
        <span className="pilot-live"><i aria-hidden="true" /> Live preview</span>
      </header>

      <div className="pilot-product">
        <section className="pilot-product__heading">
          <div>
            <h3>Launch review</h3>
            <p>Make the final design decisions before release.</p>
          </div>
          <div className="pilot-progress" aria-label={`${completed.length} of ${tasks.length} decisions complete`}>
            <strong>{completed.length}/{tasks.length}</strong>
            <span>complete</span>
          </div>
        </section>

        <div className="pilot-workspace">
          <section className="pilot-task-pane" aria-label="Launch decisions">
            <label className="pilot-search">
              <Search aria-hidden="true" />
              <span className="sr-only">Find a decision</span>
              <input
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                placeholder="Find a decision"
              />
              {query ? (
                <button type="button" aria-label="Clear decision search" onClick={() => onQuery("")}>
                  <X aria-hidden="true" />
                </button>
              ) : null}
            </label>

            <div className="pilot-filters" role="group" aria-label="Filter decisions">
              {(["all", "open", "done"] as const).map((item) => (
                <button key={item} type="button" aria-pressed={filter === item} onClick={() => onFilter(item)}>
                  {item === "all" ? "All" : item === "open" ? "Open" : "Done"}
                </button>
              ))}
            </div>

            <p className="pilot-result-count" aria-live="polite">
              {visibleTasks.length} {visibleTasks.length === 1 ? "decision" : "decisions"}
            </p>

            <div className="pilot-task-list">
              {visibleTasks.map((task) => {
                const done = completed.includes(task.id)
                return (
                  <div className="pilot-task-row" data-selected={selectedId === task.id} key={task.id}>
                    <button
                      className="pilot-task-check"
                      type="button"
                      aria-label={`${done ? "Reopen" : "Complete"} ${task.title}`}
                      aria-pressed={done}
                      onClick={() => onToggle(task.id)}
                    >
                      {done ? <CheckCircle2 aria-hidden="true" /> : <Circle aria-hidden="true" />}
                    </button>
                    <button className="pilot-task-open" type="button" onClick={() => onSelect(task.id)}>
                      <span>{task.title}</span>
                      <small>{task.context}</small>
                    </button>
                  </div>
                )
              })}
              {visibleTasks.length === 0 ? (
                <div className="pilot-empty">
                  <strong>No decisions matched.</strong>
                  <button type="button" onClick={() => onQuery("")}>Show every decision</button>
                </div>
              ) : null}
            </div>
          </section>

          <section className="pilot-detail" aria-labelledby={`${kit}-decision-title`}>
            <div className="pilot-detail__heading">
              <span>{selected.context}</span>
              <h4 id={`${kit}-decision-title`}>{selected.title}</h4>
              <p>{selected.description}</p>
            </div>

            <fieldset className="pilot-choice">
              <legend>Decision</legend>
              <div>
                {["Ready", "Needs work", "Hold"].map((choice) => (
                  <button
                    type="button"
                    aria-pressed={direction === choice}
                    key={choice}
                    onClick={() => onDirection(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="pilot-field">
              <span>Review note</span>
              <input
                value={draft}
                onChange={(event) => onDraft(event.target.value)}
                placeholder="Add a decision note"
              />
              <small>Your note appears in both views.</small>
            </label>

            <div className="pilot-detail__actions">
              <button
                className="pilot-primary"
                type="button"
                data-state={selectedIsDone ? "success" : "default"}
                onClick={() => onReview(kit)}
              >
                {selectedIsDone ? <Check aria-hidden="true" /> : null}
                {selectedIsDone ? "Approved" : "Review approval"}
                {!selectedIsDone ? <ArrowRight aria-hidden="true" /> : null}
              </button>
              <button className="pilot-secondary" type="button" onClick={() => onToggle(selected.id)}>
                {selectedIsDone ? "Reopen" : "Mark complete"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}

export function JadeExperience() {
  const [dark, setDark] = useState(false)
  const [view, setView] = useState<ViewMode>("compare")
  const [filter, setFilter] = useState<TaskFilter>("all")
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(tasks[0].id)
  const [completed, setCompleted] = useState<string[]>(["type"])
  const [direction, setDirection] = useState("Ready")
  const [draft, setDraft] = useState("")
  const [dialogKit, setDialogKit] = useState<KitName | null>(null)
  const [approvalNote, setApprovalNote] = useState("")
  const [approvalError, setApprovalError] = useState("")
  const [saving, setSaving] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const approvalInputRef = useRef<HTMLInputElement>(null)

  const visibleTasks = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return tasks.filter((task) => {
      const done = completed.includes(task.id)
      const filterMatches = filter === "all" || (filter === "done" ? done : !done)
      const queryMatches = !needle || `${task.title} ${task.context}`.toLowerCase().includes(needle)
      return filterMatches && queryMatches
    })
  }, [completed, filter, query])

  function toggleTask(id: string) {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function openReview(kit: KitName) {
    setDialogKit(kit)
    setApprovalNote(draft)
    setApprovalError("")
    window.requestAnimationFrame(() => {
      dialogRef.current?.showModal()
      approvalInputRef.current?.focus()
    })
  }

  function closeReview() {
    dialogRef.current?.close()
  }

  function approve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (approvalNote.trim().length < 3) {
      setApprovalError("Add a short reason so the decision is clear later.")
      approvalInputRef.current?.focus()
      return
    }
    setApprovalError("")
    setSaving(true)
    window.setTimeout(() => {
      setCompleted((current) => current.includes(selectedId) ? current : [...current, selectedId])
      setDraft(approvalNote.trim())
      setSaving(false)
      closeReview()
    }, 520)
  }

  const sharedWorkspaceProps = {
    dark,
    filter,
    query,
    selectedId,
    completed,
    direction,
    draft,
    visibleTasks,
    onFilter: setFilter,
    onQuery: setQuery,
    onSelect: setSelectedId,
    onToggle: toggleTask,
    onDirection: setDirection,
    onDraft: setDraft,
    onReview: openReview,
  }

  return (
    <div className={`jade-pilot${dark ? " jade-pilot--dark" : ""}`}>
      <SiteHeader />
      <main className="jade-main">
        <nav className="kit-worlds jade-worlds" aria-label="Choose a visual system">
          <span>Visual systems</span>
          <div>
            <Link href="/kit">Purple Rain <small>138 pieces</small></Link>
            <Link href="/kit/jade">JADE <small>138 pieces</small></Link>
            <Link aria-current="page" href="/kit/jade/compare">Comparison <small>Live</small></Link>
          </div>
        </nav>

        <section className="jade-intro" aria-labelledby="jade-title">
          <div className="jade-intro__copy">
            <h1 id="jade-title">Touch the difference.</h1>
            <p>The same launch review is working in two visual systems. Change the light, press the controls, and decide whether JADE deserves to become a complete kit.</p>
          </div>
          <div className="jade-theme-control" role="group" aria-label="Change both previews between light and dark">
            <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}><Sun aria-hidden="true" /> Light</button>
            <button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon aria-hidden="true" /> Dark</button>
          </div>
        </section>

        <section className="jade-signature" aria-label="What makes JADE distinct">
          <div className="jade-planes" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div>
            <strong>Three physical levels</strong>
            <p>A cool canvas, a recessed work area, and a raised surface make the interface readable before decoration.</p>
          </div>
          <div>
            <strong>One bold signal</strong>
            <p>Mint is reserved for the next action, a live state, or a selected object.</p>
          </div>
          <button className="jade-touch-test" type="button">
            Press and feel it seat
            <ArrowRight aria-hidden="true" />
          </button>
        </section>

        <section className="pilot-comparison" aria-labelledby="comparison-title">
          <header className="pilot-comparison__heading">
            <div>
              <h2 id="comparison-title">Same work. Different feel.</h2>
              <p>Every change travels to both versions, so the comparison stays honest.</p>
            </div>
            <div className="pilot-view-control" role="group" aria-label="Choose comparison view">
              {(["compare", "jade", "purple"] as const).map((item) => (
                <button type="button" aria-pressed={view === item} key={item} onClick={() => setView(item)}>
                  {item === "compare" ? "Together" : item === "jade" ? "JADE" : "Purple Rain"}
                </button>
              ))}
            </div>
          </header>

          <div className={`pilot-panels pilot-panels--${view}`}>
            {view !== "purple" ? <Workspace kit="jade" {...sharedWorkspaceProps} /> : null}
            {view !== "jade" ? <Workspace kit="purple" {...sharedWorkspaceProps} /> : null}
          </div>
        </section>
      </main>

      <dialog
        className={`pilot-dialog pilot-dialog--${dialogKit ?? "jade"}${dialogKit === "purple" && dark ? " dark" : ""}`}
        ref={dialogRef}
        onClose={() => {
          setDialogKit(null)
          setSaving(false)
          setApprovalError("")
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && !saving) {
            event.preventDefault()
            closeReview()
          }
        }}
        onClick={(event) => { if (event.target === event.currentTarget && !saving) closeReview() }}
      >
        <form onSubmit={approve}>
          <header>
            <div>
              <span>{dialogKit === "jade" ? "JADE review" : "Purple Rain review"}</span>
              <h2>Approve this direction?</h2>
              <p>The decision will be reflected in both views.</p>
            </div>
            <button type="button" aria-label="Close approval" disabled={saving} onClick={closeReview}><X aria-hidden="true" /></button>
          </header>
          <label className="pilot-field">
            <span>Reason for approval</span>
            <input
              ref={approvalInputRef}
              value={approvalNote}
              onChange={(event) => {
                setApprovalNote(event.target.value)
                if (approvalError) setApprovalError("")
              }}
              aria-invalid={Boolean(approvalError)}
              aria-describedby={approvalError ? "approval-error" : "approval-help"}
              placeholder="What makes this ready?"
            />
            <small id={approvalError ? "approval-error" : "approval-help"} data-error={Boolean(approvalError)}>
              {approvalError || "A short note keeps the decision useful later."}
            </small>
          </label>
          <footer>
            <button className="pilot-secondary" type="button" disabled={saving} onClick={closeReview}>Keep reviewing</button>
            <button className="pilot-primary" type="submit" disabled={saving} data-state={saving ? "loading" : "default"}>
              {saving ? <span className="pilot-spinner" aria-hidden="true" /> : null}
              {saving ? "Approving" : "Approve direction"}
            </button>
          </footer>
        </form>
      </dialog>

      <SiteFooter note="JADE is being tested, not assumed." />
    </div>
  )
}
