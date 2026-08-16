"use client"

import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Code2,
  FileCode2,
  FileText,
  Filter,
  LoaderCircle,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Send,
  Sparkles,
  SquarePen,
  X,
} from "lucide-react"
import type { FormEvent, ReactNode } from "react"
import { useState } from "react"

import "./beautiful-ui-elements.css"

export type BeautifulUIElementKind =
  | "loading-state"
  | "thinking"
  | "streaming-text"
  | "approval-card"
  | "tool-chips"
  | "task-rows"
  | "chat"
  | "prompt-bar"
  | "recommendation-card"
  | "context-cards"
  | "diff-table"
  | "records-table"
  | "filter-table"
  | "sidebar-nav"
  | "search"
  | "insight-cards"
  | "code-block"
  | "fine-tune-card"
  | "selection-actions"

const tasks = [
  ["Reviewing source files", "complete"],
  ["Mapping shared patterns", "running"],
  ["Checking empty states", "waiting"],
] as const

const records = [
  { name: "Acme Labs", owner: "Maya Chen", stage: "Active", value: "$42k" },
  { name: "Northstar", owner: "Eli Brooks", stage: "Review", value: "$28k" },
  { name: "Fieldwork", owner: "Noor Patel", stage: "Paused", value: "$17k" },
] as const

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick?: () => void }) {
  return <button type="button" className="bui-icon-button" aria-label={label} onClick={onClick}>{children}</button>
}

function StatusDot({ status }: { status: "complete" | "running" | "waiting" }) {
  if (status === "complete") return <CheckCircle2 aria-hidden="true" />
  if (status === "running") return <LoaderCircle className="bui-spin" aria-hidden="true" />
  return <Circle aria-hidden="true" />
}

function LoadingState() {
  const [running, setRunning] = useState(true)
  const [step, setStep] = useState(2)
  const advance = () => {
    setRunning(true)
    setStep((current) => current === 4 ? 1 : current + 1)
  }
  return <div className="bui-window bui-loading">
    <div className="bui-window__top"><span>Building response</span><span>{running ? `Step ${step} of 4` : "Paused"}</span></div>
    <div className="bui-pixel-track" aria-label={`${step} of 4 steps complete`}>{[1, 2, 3, 4].map((item) => <i key={item} data-active={item <= step} />)}</div>
    <strong>{running ? ["Reading the brief", "Finding the pattern", "Shaping the answer", "Checking the result"][step - 1] : "Ready when you are"}</strong>
    <p>Progress stays specific, calm, and easy to stop.</p>
    <div className="bui-actions"><button type="button" className="bui-button" onClick={advance}>{step === 4 ? "Start again" : "Show next step"}</button><button type="button" className="bui-button bui-button--quiet" onClick={() => setRunning(!running)}>{running ? "Pause" : "Continue"}</button></div>
  </div>
}

function Thinking() {
  const [open, setOpen] = useState(0)
  const steps = [
    ["Understood the request", "The customer needs a concise launch brief with the risk clearly separated from the recommendation."],
    ["Searched the workspace", "Found the current positioning, three customer quotes, and the last approved launch decision."],
    ["Prepared the answer", "Used the approved facts and left unsupported claims out."],
  ]
  return <div className="bui-window">
    <div className="bui-window__top"><span><Sparkles aria-hidden="true" /> Reasoning</span><span>3 steps</span></div>
    <div className="bui-trace-list">{steps.map(([title, body], index) => <button key={title} type="button" className="bui-trace" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span><Check aria-hidden="true" /><strong>{title}</strong><ChevronDown aria-hidden="true" /></span>{open === index ? <p>{body}</p> : null}</button>)}</div>
  </div>
}

function StreamingText() {
  const [expanded, setExpanded] = useState(false)
  return <article className="bui-window bui-answer">
    <div className="bui-window__top"><span>Answer</span><span>3 sources</span></div>
    <h3>Build the smallest useful release first.</h3>
    <p>Start with the path customers already understand. Keep the new behavior reversible, measure the decision point, and publish the result where the team can inspect it.</p>
    {expanded ? <p>The evidence points to one onboarding route, a clear handoff state, and a visible way back. Those constraints reduce ambiguity without narrowing what the product can become.</p> : null}
    <button type="button" className="bui-text-action" onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : "Continue reading"}<ArrowRight aria-hidden="true" /></button>
    <div className="bui-source-row"><button type="button">01 Product brief</button><button type="button">02 Customer notes</button><button type="button">03 Launch decision</button></div>
  </article>
}

function ApprovalCard() {
  const [choice, setChoice] = useState("review")
  const [approved, setApproved] = useState(false)
  if (approved) return <div className="bui-window bui-confirmed"><CheckCircle2 aria-hidden="true" /><div><strong>Direction approved</strong><p>The work can continue using the review-first release plan.</p></div><button type="button" className="bui-button bui-button--quiet" onClick={() => setApproved(false)}>Change</button></div>
  return <div className="bui-window">
    <div className="bui-window__top"><span>Approval needed</span><span>One decision</span></div>
    <h3>How should the first release behave?</h3>
    <div className="bui-choice-list">{[["review", "Review first", "Prepare every change, then wait for approval."], ["safe", "Safe actions", "Continue automatically only for reversible actions."], ["manual", "Manual only", "Take no action without a direct instruction."]].map(([value, title, note]) => <button key={value} type="button" aria-pressed={choice === value} onClick={() => setChoice(value)}><i>{choice === value ? <Check aria-hidden="true" /> : null}</i><span><strong>{title}</strong><small>{note}</small></span></button>)}</div>
    <button type="button" className="bui-button bui-button--wide" onClick={() => setApproved(true)}>Approve this direction</button>
  </div>
}

function ToolChips() {
  const [active, setActive] = useState("files")
  const detail: Record<string, string> = { files: "3 interface files inspected", edits: "2 focused changes prepared", checks: "All visible states checked" }
  const chips = [{ id: "files", icon: FileText, label: "Read files" }, { id: "edits", icon: SquarePen, label: "Edited UI" }, { id: "checks", icon: CheckCircle2, label: "Ran checks" }]
  return <div className="bui-window">
    <div className="bui-window__top"><span>Work completed</span><span>Just now</span></div>
    <div className="bui-chip-row">{chips.map(({ id, icon: Icon, label }) => <button key={id} type="button" aria-pressed={active === id} onClick={() => setActive(id)}><Icon aria-hidden="true" />{label}</button>)}</div>
    <div className="bui-tool-detail"><strong>{detail[active]}</strong><p>Select a work chip to see what happened without opening a technical log.</p></div>
  </div>
}

function TaskRows() {
  const [failed, setFailed] = useState(true)
  return <div className="bui-window">
    <div className="bui-window__top"><span>Agent tasks</span><span>3 active</span></div>
    <div className="bui-task-list">{tasks.map(([title, status], index) => {
      const current = index === 2 && failed ? "waiting" : index === 2 ? "complete" : status
      return <div key={title}><StatusDot status={current} /><span><strong>{title}</strong><small>{current === "complete" ? "Done" : current === "running" ? "Working now" : "Needs attention"}</small></span>{index === 2 ? <button type="button" onClick={() => setFailed(!failed)}>{failed ? "Resolve" : "Undo"}</button> : null}</div>
    })}</div>
  </div>
}

function Chat() {
  const [messages, setMessages] = useState(["Summarize the launch decision.", "The team approved a review-first release with a visible rollback path."])
  const [draft, setDraft] = useState("")
  const send = (event: FormEvent) => { event.preventDefault(); if (!draft.trim()) return; setMessages([...messages, draft.trim()]); setDraft("") }
  return <div className="bui-window bui-chat">
    <div className="bui-window__top"><span><MessageSquare aria-hidden="true" /> Project conversation</span><button type="button">New chat</button></div>
    <div className="bui-messages">{messages.map((message, index) => <p key={`${message}-${index}`} data-agent={index % 2 === 1}>{message}</p>)}</div>
    <form onSubmit={send}><input aria-label="Message" placeholder="Ask a follow-up…" value={draft} onChange={(event) => setDraft(event.target.value)} /><IconButton label="Send message"><Send aria-hidden="true" /></IconButton></form>
  </div>
}

function PromptBar() {
  const [draft, setDraft] = useState("")
  const [sent, setSent] = useState(false)
  return <div className="bui-prompt">
    <textarea aria-label="Prompt" placeholder="Describe what you want to make…" value={draft} onChange={(event) => { setDraft(event.target.value); setSent(false) }} />
    <div><span><button type="button"><Plus aria-hidden="true" /> Add context</button><button type="button">Fast model <ChevronDown aria-hidden="true" /></button></span><span><IconButton label="Dictate"><Mic aria-hidden="true" /></IconButton><button type="button" className="bui-send" disabled={!draft.trim()} onClick={() => setSent(true)}>{sent ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}<span>{sent ? "Sent" : "Send"}</span></button></span></div>
  </div>
}

function RecommendationCard() {
  const [result, setResult] = useState("")
  return <div className="bui-window">
    <div className="bui-window__top"><span>Recommendation</span><span className="bui-confidence">92% confidence</span></div>
    <h3>Move the project review before publishing.</h3><p className="bui-copy">This keeps the launch reversible and puts the final decision next to the evidence.</p>
    <div className="bui-meter"><i style={{ width: "92%" }} /></div>
    <div className="bui-actions"><button type="button" className="bui-button" onClick={() => setResult("Accepted")}>Use recommendation</button><button type="button" className="bui-button bui-button--quiet" onClick={() => setResult("Saved for later")}>Save for later</button></div>
    {result ? <p className="bui-result"><Check aria-hidden="true" /> {result}</p> : null}
  </div>
}

function ContextCards() {
  const [open, setOpen] = useState(0)
  const cards = [["Launch brief", "The first release must be reversible and easy to review."], ["Customer note", "People need to understand what changed without reading a technical log."], ["Decision record", "The team chose a review-first handoff for public changes."]]
  return <div className="bui-context-grid">{cards.map(([title, body], index) => <button key={title} type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span><FileText aria-hidden="true" /><small>Source {index + 1}</small></span><strong>{title}</strong><p>{open === index ? body : `${body.slice(0, 58)}…`}</p><span className="bui-open-label">{open === index ? "Collapse" : "Read source"}<ArrowRight aria-hidden="true" /></span></button>)}</div>
}

function DiffTable() {
  const [accepted, setAccepted] = useState<number[]>([])
  const rows = [["Launch date", "Aug 20", "Aug 27"], ["Owner", "Product", "Maya Chen"], ["Status", "Draft", "Ready for review"]]
  const toggle = (index: number) => setAccepted((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
  return <div className="bui-table-wrap"><table className="bui-table"><caption>Proposed changes</caption><thead><tr><th>Field</th><th>Current</th><th>Proposed</th><th>Use</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]}><th>{row[0]}</th><td><del>{row[1]}</del></td><td><ins>{row[2]}</ins></td><td><button type="button" aria-pressed={accepted.includes(index)} onClick={() => toggle(index)}>{accepted.includes(index) ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}<span>{accepted.includes(index) ? "Added" : "Add"}</span></button></td></tr>)}</tbody></table></div>
}

function RecordsTable() {
  const [selected, setSelected] = useState<string[]>([])
  const [ascending, setAscending] = useState(true)
  const shown = [...records].sort((a, b) => ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  return <div className="bui-table-wrap"><table className="bui-table"><caption><span>Accounts</span><button type="button" onClick={() => setAscending(!ascending)}>Sort {ascending ? "A–Z" : "Z–A"}</button></caption><thead><tr><th>Select</th><th>Account</th><th>Owner</th><th>Stage</th><th>Value</th></tr></thead><tbody>{shown.map((record) => <tr key={record.name} data-selected={selected.includes(record.name)}><td><button type="button" className="bui-check" aria-label={`Select ${record.name}`} aria-pressed={selected.includes(record.name)} onClick={() => setSelected((current) => current.includes(record.name) ? current.filter((item) => item !== record.name) : [...current, record.name])}>{selected.includes(record.name) ? <Check aria-hidden="true" /> : null}</button></td><th>{record.name}</th><td>{record.owner}</td><td><span className="bui-tag">{record.stage}</span></td><td>{record.value}</td></tr>)}</tbody></table></div>
}

function FilterTable() {
  const [filter, setFilter] = useState("All")
  const shown = filter === "All" ? records : records.filter((record) => record.stage === filter)
  return <div className="bui-window bui-filter-table"><div className="bui-filter-row"><span><Filter aria-hidden="true" /> Accounts</span>{["All", "Active", "Review", "Paused"].map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="bui-simple-rows">{shown.map((record) => <div key={record.name}><strong>{record.name}</strong><span>{record.owner}</span><small>{record.stage}</small></div>)}</div>{!shown.length ? <p className="bui-empty">No accounts match this view.</p> : null}</div>
}

function SidebarNav() {
  const [active, setActive] = useState("Home")
  return <div className="bui-sidebar-demo"><aside><div className="bui-workspace"><i>AL</i><span><strong>Acme Labs</strong><small>Product team</small></span><ChevronDown aria-hidden="true" /></div><button type="button" className="bui-quick-search"><Search aria-hidden="true" /> Quick search <kbd>⌘K</kbd></button><nav>{["Home", "Projects", "Tasks", "Documents"].map((item) => <button key={item} type="button" aria-current={active === item ? "page" : undefined} onClick={() => setActive(item)}>{item}<small>{item === "Tasks" ? "8" : ""}</small></button>)}</nav><button type="button" className="bui-profile"><i>MC</i><span><strong>Maya Chen</strong><small>maya@acme.co</small></span><MoreHorizontal aria-hidden="true" /></button></aside><main><small>Current section</small><strong>{active}</strong><p>The product area stays unchanged while the selected destination is clear.</p></main></div>
}

function SearchElement() {
  const [query, setQuery] = useState("")
  const options = ["Create a launch brief", "Open project roadmap", "Find customer interviews", "Review pending decisions", "Invite a teammate"]
  const results = options.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
  return <div className="bui-search"><label><Search aria-hidden="true" /><input autoComplete="off" placeholder="Search actions and projects…" value={query} onChange={(event) => setQuery(event.target.value)} />{query ? <IconButton label="Clear search" onClick={() => setQuery("")}><X aria-hidden="true" /></IconButton> : <kbd>⌘K</kbd>}</label><div>{results.map((item, index) => <button key={item} type="button"><span><strong>{item}</strong><small>{index < 2 ? "Action" : "Workspace"}</small></span><ArrowRight aria-hidden="true" /></button>)}{!results.length ? <p><Search aria-hidden="true" /><strong>No matches</strong><span>Try a project, person, or action.</span></p> : null}</div></div>
}

function InsightCards() {
  const [page, setPage] = useState(0)
  const insights = [
    { title: "Activation improved", value: "+18%", points: [22, 36, 31, 52, 67, 74] },
    { title: "Support load fell", value: "−12%", points: [70, 61, 63, 48, 43, 35] },
    { title: "Review speed rose", value: "+24%", points: [18, 28, 41, 46, 65, 82] },
  ]
  const current = insights[page]
  return <div className="bui-window bui-insight"><div className="bui-window__top"><span>Agent insight</span><span>{page + 1} of {insights.length}</span></div><small>Last 30 days</small><h3>{current.title}</h3><strong>{current.value}</strong><div className="bui-bars" aria-label={`${current.title} ${current.value}`}>{current.points.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><p>The strongest change followed the new review step.</p><div className="bui-pager"><IconButton label="Previous insight" onClick={() => setPage((page + insights.length - 1) % insights.length)}><ChevronLeft aria-hidden="true" /></IconButton><span>{insights.map((_, index) => <i key={index} data-active={index === page} />)}</span><IconButton label="Next insight" onClick={() => setPage((page + 1) % insights.length)}><ChevronRight aria-hidden="true" /></IconButton></div></div>
}

function CodeBlock() {
  const code = ["export function ReleasePlan() {", "  const decision = useDecision()", "", "  return (", "    <Review status={decision.status} />", "  )", "}"]
  const [visible, setVisible] = useState(4)
  const [copied, setCopied] = useState(false)
  return <div className="bui-code"><header><span><FileCode2 aria-hidden="true" /> release-plan.tsx</span><button type="button" onClick={() => { navigator.clipboard.writeText(code.join("\n")); setCopied(true) }}>{copied ? <Check aria-hidden="true" /> : <Code2 aria-hidden="true" />}{copied ? "Copied" : "Copy"}</button></header><pre><code>{code.slice(0, visible).map((line, index) => <span key={`${line}-${index}`}><i>{index + 1}</i>{line || " "}</span>)}</code></pre><button type="button" className="bui-code-more" onClick={() => setVisible(visible === code.length ? 4 : code.length)}>{visible === code.length ? "Reset stream" : "Stream remaining lines"}<Play aria-hidden="true" /></button></div>
}

function FineTuneCard() {
  const [radius, setRadius] = useState(18)
  const [space, setSpace] = useState(24)
  const [weight, setWeight] = useState(650)
  return <div className="bui-tuner"><div className="bui-tuner__preview" style={{ borderRadius: radius, padding: space }}><small>Launch plan</small><strong style={{ fontWeight: weight }}>Review before publishing.</strong><button type="button">Open plan</button></div><div className="bui-tuner__controls"><div><span><label htmlFor="radius-control">Corners</label><output>{radius}px</output></span><input id="radius-control" type="range" min="0" max="32" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></div><div><span><label htmlFor="space-control">Space</label><output>{space}px</output></span><input id="space-control" type="range" min="12" max="40" value={space} onChange={(event) => setSpace(Number(event.target.value))} /></div><div><span><label htmlFor="weight-control">Type weight</label><output>{weight}</output></span><input id="weight-control" type="range" min="400" max="800" step="50" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /></div></div></div>
}

function SelectionActions() {
  const original = "The team should probably consider moving the review step earlier because it may make the release process a little safer."
  const alternatives: Record<string, string> = { Shorten: "Move review earlier to make the release safer.", Clarify: "Review the work before publishing so the team can safely reverse a change.", Formalize: "The team should complete its review before publication to preserve a clear rollback path." }
  const [text, setText] = useState(original)
  const [active, setActive] = useState("")
  return <div className="bui-selection"><div className="bui-selection__bar"><span>Rewrite selection</span>{Object.keys(alternatives).map((action) => <button key={action} type="button" aria-pressed={active === action} onClick={() => { setActive(action); setText(alternatives[action]) }}>{action}</button>)}<button type="button" onClick={() => { setActive(""); setText(original) }}>Reset</button></div><p>{text}</p><small>{active ? `${active} version applied` : "Select a rewrite direction"}</small></div>
}

export function BeautifulUIElement({ kind }: { kind: BeautifulUIElementKind }) {
  const Element = {
    "loading-state": LoadingState,
    thinking: Thinking,
    "streaming-text": StreamingText,
    "approval-card": ApprovalCard,
    "tool-chips": ToolChips,
    "task-rows": TaskRows,
    chat: Chat,
    "prompt-bar": PromptBar,
    "recommendation-card": RecommendationCard,
    "context-cards": ContextCards,
    "diff-table": DiffTable,
    "records-table": RecordsTable,
    "filter-table": FilterTable,
    "sidebar-nav": SidebarNav,
    search: SearchElement,
    "insight-cards": InsightCards,
    "code-block": CodeBlock,
    "fine-tune-card": FineTuneCard,
    "selection-actions": SelectionActions,
  }[kind]
  return <div className="bui-root"><Element /></div>
}
