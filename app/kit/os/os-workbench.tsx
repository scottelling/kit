"use client"

import { Check, ChevronLeft, Search, X } from "lucide-react"
import { useMemo, useState } from "react"

const tasks = [
  { id: "direction", title: "Approve the home direction", owner: "Scott", detail: "Choose the page direction that makes the offer and next action clearest." },
  { id: "phone", title: "Check the phone flow", owner: "Mara", detail: "Make sure the same decision works naturally on a phone without squeezing the desktop." },
  { id: "release", title: "Publish the release notes", owner: "Elena", detail: "Confirm the useful changes, recovery path, and public result before publishing." },
]

export function OsWorkbench() {
  const [selectedId, setSelectedId] = useState(tasks[0].id)
  const [completed, setCompleted] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const [phoneDetail, setPhoneDetail] = useState(false)
  const [notice, setNotice] = useState("Choose a task in any view. Every view stays together.")
  const selected = tasks.find((task) => task.id === selectedId) ?? tasks[0]
  const visibleTasks = useMemo(() => tasks.filter((task) => `${task.title} ${task.owner}`.toLowerCase().includes(query.trim().toLowerCase())), [query])

  function choose(id: string, fromPhone = false) {
    setSelectedId(id)
    if (fromPhone) setPhoneDetail(true)
    setNotice("The same task is selected on desktop, phone, and widget.")
  }

  function toggleComplete(id: string) {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    setNotice(completed.includes(id) ? "The task is open again in every view." : "The task is complete in every view.")
  }

  const isComplete = completed.includes(selected.id)

  return (
    <section className="os-workbench" aria-labelledby="os-workbench-title">
      <header className="os-workbench__heading">
        <div><span>Real product proof</span><h2 id="os-workbench-title">One task. Three honest views.</h2><p>Change the work on desktop, phone, or widget. The same selection and completion state follows everywhere.</p></div>
        <aside><strong>{completed.length} of {tasks.length}</strong><span>launch tasks complete</span></aside>
      </header>

      <div className="os-workbench__views">
        <article className="os-desktop" aria-label="Desktop project view">
          <header className="os-desktop__menu"><strong>Launch room</strong><nav aria-label="Desktop sections"><button type="button" aria-pressed="true">Work</button><button type="button" onClick={() => setNotice("The people view is ready for the next shared pattern.")}>People</button></nav><span>{completed.length === tasks.length ? "Ready to publish" : "Changes saved"}</span></header>
          <div className="os-desktop__window">
            <header><span>Release review</span><button type="button" onClick={() => setNotice("Focus mode keeps this decision in front.")}>Focus</button></header>
            <div className="os-desktop__body">
              <aside>
                <label className="os-task-search"><Search aria-hidden="true" /><span className="sr-only">Find a task</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a task" />{query ? <button type="button" aria-label="Clear task search" onClick={() => setQuery("")}><X /></button> : null}</label>
                <div className="os-task-list">{visibleTasks.map((task) => <button key={task.id} type="button" aria-current={selected.id === task.id ? "true" : undefined} onClick={() => choose(task.id)}><span>{completed.includes(task.id) ? <Check aria-hidden="true" /> : <i aria-hidden="true" />}</span><strong>{task.title}</strong><small>{task.owner}</small></button>)}</div>
                {visibleTasks.length === 0 ? <div className="os-task-empty"><strong>No task matched.</strong><button type="button" onClick={() => setQuery("")}>Show every task</button></div> : null}
              </aside>
              <main>
                <span>Current decision · {selected.owner}</span><h3>{selected.title}</h3><p>{selected.detail}</p>
                <label>Review note<input defaultValue="Clear, useful, and ready to act on." /></label>
                <div><button type="button" onClick={() => setNotice("The review note is ready for the team.")}>Share note</button><button type="button" data-primary="true" data-complete={isComplete} onClick={() => toggleComplete(selected.id)}>{isComplete ? "Reopen task" : "Mark complete"}</button></div>
              </main>
            </div>
            <footer><span aria-live="polite">{notice}</span><strong>{completed.length === tasks.length ? "Release ready" : `${tasks.length - completed.length} decisions remain`}</strong></footer>
          </div>
        </article>

        <div className="os-compact-views">
          <article className="os-phone" aria-label="Phone project view">
            <header>{phoneDetail ? <button type="button" aria-label="Back to tasks" onClick={() => setPhoneDetail(false)}><ChevronLeft /> Tasks</button> : <strong>Launch room</strong>}<span>{completed.length}/{tasks.length}</span></header>
            {phoneDetail ? <main><span>Current decision</span><h3>{selected.title}</h3><p>{selected.detail}</p><button type="button" data-primary="true" data-complete={isComplete} onClick={() => toggleComplete(selected.id)}>{isComplete ? "Reopen task" : "Mark complete"}</button></main> : <div className="os-phone__list">{tasks.map((task) => <button key={task.id} type="button" onClick={() => choose(task.id, true)}><span>{completed.includes(task.id) ? <Check aria-hidden="true" /> : <i aria-hidden="true" />}</span><strong>{task.title}</strong><small>{task.owner}</small><b aria-hidden="true">›</b></button>)}</div>}
          </article>

          <article className="os-widget" aria-label="Widget project view">
            <header><div><span>Launch</span><strong>Current decision</strong></div><b>{completed.length}/{tasks.length}</b></header>
            <main><span>{selected.owner}</span><h3>{selected.title}</h3><button type="button" data-complete={isComplete} onClick={() => toggleComplete(selected.id)}>{isComplete ? <><Check aria-hidden="true" /> Done</> : "Mark complete"}</button></main>
          </article>
        </div>
      </div>
    </section>
  )
}
