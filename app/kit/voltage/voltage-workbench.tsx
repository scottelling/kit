"use client"

import { Archive, Bolt, Check, CircleGauge, FolderOpen, Hand, HeartPulse, ShieldCheck, Sparkles, WandSparkles } from "lucide-react"
import { useState } from "react"

const sections = [
  { id: "care", label: "Care", icon: HeartPulse },
  { id: "protect", label: "Protect", icon: ShieldCheck },
  { id: "perform", label: "Perform", icon: Bolt },
  { id: "organize", label: "Organize", icon: FolderOpen },
  { id: "archive", label: "Archive", icon: Archive },
] as const

const statusCopy = {
  care: ["System care", "Everything important is in view."],
  protect: ["Protection", "Your active checks are clear."],
  perform: ["Performance", "Two useful actions are ready."],
  organize: ["Organization", "Your workspace has room to breathe."],
  archive: ["Archive", "Saved work is easy to recover."],
} as const

export function VoltageWorkbench() {
  const [active, setActive] = useState<(typeof sections)[number]["id"]>("care")
  const [completed, setCompleted] = useState(["protect"])
  const [notice, setNotice] = useState("Ready for a full check")
  const [title, detail] = statusCopy[active]

  function toggleTask(id: string) {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <section className="voltage-workbench" aria-labelledby="voltage-workbench-title">
      <header className="voltage-workbench__intro">
        <div>
          <span>Signature workspace</span>
          <h2 id="voltage-workbench-title">A desktop instrument panel you can actually use.</h2>
          <p>The rail, status field, layered cards, and quick actions show how Voltage organizes a real product without forcing this layout into projects that do not need it.</p>
        </div>
        <button type="button" onClick={() => setNotice("All checks restarted safely")}><WandSparkles aria-hidden="true" /> Start over</button>
      </header>

      <div className="voltage-window">
        <header className="voltage-window__bar">
          <div aria-label="Window controls"><i /><i /><i /></div>
          <strong>Voltage Care</strong>
          <span>{notice}</span>
        </header>
        <div className="voltage-window__body">
          <nav className="voltage-rail" aria-label="Voltage workspace">
            {sections.map((section) => {
              const Icon = section.icon
              return <button key={section.id} type="button" aria-current={active === section.id ? "page" : undefined} onClick={() => setActive(section.id)}><Icon aria-hidden="true" /><span>{section.label}</span></button>
            })}
          </nav>
          <div className="voltage-board">
            <header className="voltage-board__heading">
              <span>{title}</span>
              <h3>{detail}</h3>
              <p>Bright color marks status and action. Solid planes carry the structure.</p>
            </header>

            <div className="voltage-status-grid">
              <article className="voltage-status-card voltage-status-card--violet">
                <span><ShieldCheck aria-hidden="true" /> Protection</span>
                <strong>Your work is safe</strong>
                <p><Check aria-hidden="true" /> No urgent issues</p>
              </article>
              <article className="voltage-status-card voltage-status-card--amber">
                <span><CircleGauge aria-hidden="true" /> Performance</span>
                <strong>2 useful actions</strong>
                <p><Bolt aria-hidden="true" /> Ready when you are</p>
              </article>
              <article className="voltage-status-card voltage-status-card--cyan">
                <span><FolderOpen aria-hidden="true" /> Space</span>
                <strong>Room to work</strong>
                <p><Sparkles aria-hidden="true" /> Everything has a place</p>
              </article>
            </div>

            <section className="voltage-health-card" aria-labelledby="voltage-health-title">
              <div className="voltage-health-card__score" aria-hidden="true"><HeartPulse /><strong>Good</strong></div>
              <div>
                <span>System health</span>
                <h4 id="voltage-health-title">The essentials are working well.</h4>
                <p>Finish the two optional checks below, or leave them for later. Nothing is hidden behind the color.</p>
                <div className="voltage-task-list">
                  {[{ id: "protect", label: "Review protection" }, { id: "tidy", label: "Tidy old downloads" }].map((task) => {
                    const done = completed.includes(task.id)
                    return <button key={task.id} type="button" aria-pressed={done} onClick={() => toggleTask(task.id)}><span>{done ? <Check aria-hidden="true" /> : <Hand aria-hidden="true" />}{task.label}</span><strong>{done ? "Done" : "Check"}</strong></button>
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
