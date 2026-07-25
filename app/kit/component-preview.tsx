"use client"

import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Grid2X2,
  Heart,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
  X,
} from "lucide-react"
import type { ReactNode } from "react"
import { useState } from "react"

export type LibraryItem = {
  name: string
  title: string
  category: string
  description: string
  preview: string
}

type ComponentPreviewProps = {
  item: LibraryItem
  expanded?: boolean
}

const samplePeople = ["MR", "ST", "EO"]
const sampleRows = [
  ["Release notes", "Mara", "Ready"],
  ["Launch page", "Sam", "Review"],
  ["Email copy", "Elena", "Draft"],
]

export function ComponentPreview({ item, expanded = false }: ComponentPreviewProps) {
  const [active, setActive] = useState(0)
  const [on, setOn] = useState(true)
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [text, setText] = useState("Purple Rain")
  const [amount, setAmount] = useState(64)
  const { name, preview, title } = item
  const sizeClass = expanded ? " mini-preview--expanded" : ""

  const choiceButtons = (labels: string[]) => (
    <div className="mini-choice-row" role="group" aria-label={title}>
      {labels.map((label, index) => (
        <button key={label} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
          {label}
        </button>
      ))}
    </div>
  )

  let sample: ReactNode

  switch (preview) {
    case "color":
      sample = <div className="mini-swatches" aria-label="Purple Rain colors"><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
      break
    case "type":
      sample = <div className="mini-type"><strong>Aa</strong><span>Clear first. Beautiful second.</span></div>
      break
    case "spacing":
      sample = <div className="mini-spacing"><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
      break
    case "radius":
      sample = <div className="mini-radii"><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
      break
    case "shadow":
      sample = <div className="mini-shadows"><i aria-hidden="true" /><i aria-hidden="true" /></div>
      break
    case "focus":
      sample = <button type="button" className="mini-focus">Press Tab to find me</button>
      break
    case "separator":
      sample = <div className="mini-separators"><span>Before</span><i aria-hidden="true" /><span>After</span></div>
      break
    case "surface":
      sample = <div className="mini-surfaces"><i aria-hidden="true">1</i><i aria-hidden="true">2</i><i aria-hidden="true">3</i></div>
      break
    case "layout":
      sample = name === "stack"
        ? <div className="mini-stack"><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
        : <div className="mini-container"><i aria-hidden="true"><span /></i></div>
      break

    case "button":
      sample = <button type="button" className="mini-primary" onClick={() => setOn((value) => !value)}>{on ? "Save changes" : "Saved"}</button>
      break
    case "button-group":
      sample = choiceButtons(["Left", "Center", "Right"])
      break
    case "icon-button":
      sample = <button type="button" className="mini-icon-button" aria-label="Add item" onClick={() => setOn((value) => !value)}>{on ? <Plus /> : <Check />}</button>
      break
    case "split-button":
      sample = <div className="mini-split"><button type="button">Publish</button><button type="button" aria-label="More publishing choices" onClick={() => setOpen((value) => !value)}><ChevronDown /></button>{open ? <span>Schedule instead</span> : null}</div>
      break
    case "menu":
      sample = <div className="mini-menu"><button type="button" onClick={() => setOpen((value) => !value)}>Move <ChevronDown /></button>{open ? <div><button type="button">To today</button><button type="button">To archive</button></div> : null}</div>
      break
    case "toggle":
      sample = <button type="button" className="mini-toggle-button" aria-pressed={on} onClick={() => setOn((value) => !value)}>{on ? <Check /> : null} Selected</button>
      break
    case "toggle-group":
      sample = choiceButtons(["B", "I", "U"])
      break
    case "segments":
      sample = choiceButtons(["Day", "Week", "Month"])
      break
    case "floating":
      sample = <button type="button" className="mini-floating" aria-label="Create new"><Plus /></button>
      break
    case "link":
      sample = <button type="button" className="mini-link">View all notes <span aria-hidden="true">→</span></button>
      break
    case "copy":
      sample = <button type="button" className="mini-copy" onClick={() => setCopied(true)}><Copy />{copied ? "Copied" : "Copy link"}</button>
      break
    case "favorite":
      sample = <button type="button" className="mini-favorite" aria-pressed={on} onClick={() => setOn((value) => !value)}><Heart fill={on ? "currentColor" : "none"} />{on ? "Saved" : "Save"}</button>
      break
    case "toolbar":
      sample = <div className="mini-toolbar"><button aria-label="List view" type="button"><List /></button><button aria-label="Grid view" type="button"><Grid2X2 /></button><button aria-label="More" type="button"><MoreHorizontal /></button></div>
      break
    case "bulk":
      sample = <div className="mini-bulk"><span>3 selected</span><button type="button">Archive</button><button type="button" aria-label="Clear selection"><X /></button></div>
      break

    case "input":
    case "field":
      sample = <label className="mini-field"><span>{name === "field" ? "Project name" : "Name"}</span><input value={text} onChange={(event) => setText(event.target.value)} /></label>
      break
    case "textarea":
      sample = <label className="mini-field"><span>Notes</span><textarea value={text} onChange={(event) => setText(event.target.value)} /></label>
      break
    case "select":
      sample = <label className="mini-field"><span>Status</span><select defaultValue="ready"><option value="ready">Ready</option><option value="review">Review</option><option value="blocked">Blocked</option></select></label>
      break
    case "checkbox":
    case "checkbox-group":
      sample = <div className="mini-checks">{["Email updates", "Weekly summary"].slice(0, preview === "checkbox" ? 1 : 2).map((label, index) => <label key={label}><input type="checkbox" defaultChecked={index === 0} />{label}</label>)}</div>
      break
    case "radio":
      sample = <div className="mini-checks">{["Public", "Private"].map((label, index) => <label key={label}><input type="radio" name={`visibility-${name}`} defaultChecked={index === 0} />{label}</label>)}</div>
      break
    case "switch":
      sample = <button type="button" className="mini-switch" role="switch" aria-checked={on} onClick={() => setOn((value) => !value)}><i aria-hidden="true" /><span>{on ? "On" : "Off"}</span></button>
      break
    case "slider":
    case "range":
      sample = <label className="mini-range"><span>{preview === "range" ? `Range: 20–${amount}` : `Volume: ${amount}`}</span><input type="range" min="20" max="100" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label>
      break
    case "progress":
    case "meter":
      sample = <div className="mini-progress"><div><span>{preview === "meter" ? "Storage" : "Uploading"}</span><b>{amount}%</b></div><progress max="100" value={amount} /><button type="button" onClick={() => setAmount((value) => value >= 100 ? 24 : value + 12)}>Advance</button></div>
      break
    case "file":
    case "dropzone":
      sample = <label className={`mini-upload${preview === "dropzone" ? " is-dropzone" : ""}`}><Upload /><span>{preview === "dropzone" ? "Drop a file or browse" : "Choose a file"}</span><input type="file" /></label>
      break
    case "otp":
      sample = <div className="mini-otp" aria-label="Verification code">{["4", "2", "", ""].map((value, index) => <input key={index} inputMode="numeric" maxLength={1} defaultValue={value} aria-label={`Digit ${index + 1}`} />)}</div>
      break
    case "search":
    case "combobox":
      sample = <div className="mini-search"><Search /><input value={text} onChange={(event) => setText(event.target.value)} aria-label={title} />{preview === "combobox" ? <ChevronDown /> : null}</div>
      break
    case "date":
    case "time":
    case "number":
    case "password":
    case "color-input":
      sample = <label className="mini-field"><span>{title}</span><input type={preview === "color-input" ? "color" : preview} defaultValue={preview === "number" ? "12" : preview === "password" ? "rainfall" : undefined} /></label>
      break
    case "rating":
      sample = <div className="mini-rating" role="group" aria-label="Rating">{[1, 2, 3, 4, 5].map((number) => <button key={number} type="button" aria-label={`${number} out of 5`} onClick={() => setActive(number)}>{number <= active + 1 ? "●" : "○"}</button>)}</div>
      break
    case "edit":
      sample = on ? <div className="mini-inline-edit"><span>{text}</span><button type="button" onClick={() => setOn(false)}>Edit</button></div> : <div className="mini-inline-edit"><input value={text} onChange={(event) => setText(event.target.value)} autoFocus /><button type="button" onClick={() => setOn(true)}>Save</button></div>
      break

    case "tabs":
    case "filter-tabs":
    case "view":
      sample = <div className="mini-nav-sample">{choiceButtons(preview === "view" ? ["List", "Grid"] : ["All", "Active", "Done"])}<p>{preview === "view" ? (active === 0 ? "List view" : "Grid view") : `${["All", "Active", "Done"][active]} items`}</p></div>
      break
    case "breadcrumb":
      sample = <nav className="mini-breadcrumb" aria-label="Breadcrumb"><a href="#">Home</a><span>/</span><a href="#">Kit</a><span>/</span><b>Button</b></nav>
      break
    case "pagination":
      sample = <div className="mini-pagination"><button type="button" onClick={() => setActive(Math.max(0, active - 1))}>Back</button><span>Page {active + 1}</span><button type="button" onClick={() => setActive(active + 1)}>Next</button></div>
      break
    case "stepper":
      sample = <div className="mini-stepper">{["Details", "Review", "Finish"].map((label, index) => <button type="button" key={label} aria-current={active === index ? "step" : undefined} onClick={() => setActive(index)}><i aria-hidden="true">{index + 1}</i><span>{label}</span></button>)}</div>
      break
    case "bottom-nav":
      sample = <nav className="mini-bottom-nav">{choiceButtons(["Home", "Search", "Saved"])}</nav>
      break
    case "sidebar":
    case "topbar":
    case "nav-menu":
      sample = <nav className={`mini-structural-nav is-${preview}`}>{["Home", "Work", "People"].map((label, index) => <button key={label} type="button" aria-current={active === index ? "page" : undefined} onClick={() => setActive(index)}>{label}</button>)}</nav>
      break
    case "command":
    case "palette":
      sample = <div className="mini-command"><div><Search /><input placeholder="Find anything" /></div>{["Open kit", "View compare"].map((label, index) => <button key={label} type="button" data-active={active === index} onMouseEnter={() => setActive(index)} onClick={() => setActive(index)}>{label}<span>↵</span></button>)}</div>
      break
    case "page-header":
      sample = <header className="mini-page-header"><div><ArrowLeft /><span>Projects</span></div><h4>Release plan</h4><button type="button">Share</button></header>
      break
    case "back":
      sample = <a className="mini-back" href="#"><ArrowLeft /> Back to projects</a>
      break
    case "anchor":
    case "toc":
      sample = <nav className="mini-anchor">{["Overview", "Details", "Notes"].map((label, index) => <a key={label} aria-current={active === index ? "location" : undefined} href={`#${name}`} onClick={() => setActive(index)}>{label}</a>)}</nav>
      break
    case "app-switcher":
      sample = <div className="mini-app-switcher"><button type="button" onClick={() => setOpen((value) => !value)}>Purple Rain <ChevronDown /></button>{open ? <div>Workshop<br />Archive</div> : null}</div>
      break

    case "dialog":
    case "alert-dialog":
    case "sheet":
    case "drawer":
    case "popover":
    case "tooltip":
    case "dropdown":
    case "context":
    case "hover":
    case "lightbox":
    case "action-menu":
      sample = <div className={`mini-overlay-demo is-${preview}`}><button type="button" onClick={() => setOpen((value) => !value)}>{open ? "Close" : `Open ${title}`}</button>{open ? <div role="status"><strong>{title}</strong><p>{preview === "tooltip" ? "A short, useful hint." : "Keep the current choice in view."}</p></div> : null}</div>
      break

    case "badge":
      sample = <div className="mini-badges"><span>Ready</span><span>Review</span><span>Blocked</span></div>
      break
    case "alert":
    case "banner":
    case "toast":
    case "snackbar":
      sample = <div className={`mini-feedback is-${preview}`}><AlertCircle /><div><strong>{title}</strong><p>Your changes need one more look.</p></div><button type="button" aria-label="Dismiss" onClick={() => setOn(false)}>{on ? <X /> : <Check />}</button></div>
      break
    case "empty":
      sample = <div className="mini-empty"><i aria-hidden="true" /><strong>No notes yet</strong><span>Notes keep decisions nearby.</span><button type="button">Add a note</button></div>
      break
    case "skeleton":
      sample = <div className="mini-skeleton"><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
      break
    case "dots":
      sample = <div className="mini-dots" role="status" aria-label="Loading"><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
      break
    case "spinner":
      sample = <div className="mini-spinner" role="status" aria-label="Loading" />
      break
    case "status":
      sample = <div className="mini-statuses"><span><i aria-hidden="true" />Ready</span><span><i aria-hidden="true" />Waiting</span><span><i aria-hidden="true" />Blocked</span></div>
      break
    case "progress-card":
      sample = <div className="mini-progress-card"><div><strong>Launch checklist</strong><span>{amount}%</span></div><progress value={amount} max="100" /><button type="button" onClick={() => setAmount((value) => value >= 100 ? 28 : value + 12)}>Mark one done</button></div>
      break
    case "error":
    case "success":
    case "offline":
      sample = <div className={`mini-state is-${preview}`}>{preview === "success" ? <Check /> : <AlertCircle />}<strong>{preview === "error" ? "Couldn’t save" : preview === "offline" ? "You’re offline" : "Changes saved"}</strong><span>{preview === "error" ? "Try again when you’re ready." : preview === "offline" ? "Work will sync when you reconnect." : "Everything is up to date."}</span><button type="button">{preview === "success" ? "View changes" : "Try again"}</button></div>
      break

    case "card":
      sample = <div className="mini-card"><span>Weekly notes</span><strong>4 decisions ready</strong><p>Everything needed for Friday’s review.</p><button type="button">Open notes</button></div>
      break
    case "avatar":
    case "avatar-group":
      sample = <div className={`mini-avatars${preview === "avatar-group" ? " is-group" : ""}`}>{samplePeople.slice(0, preview === "avatar" ? 1 : 3).map((person) => <span key={person}>{person}</span>)}</div>
      break
    case "table":
    case "data-table":
      sample = <div className="mini-table"><div><b>Item</b><b>Owner</b><b>State</b></div>{sampleRows.slice(0, expanded ? 3 : 2).map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>
      break
    case "description":
      sample = <dl className="mini-description"><div><dt>Owner</dt><dd>Mara Rivera</dd></div><div><dt>State</dt><dd>Ready</dd></div><div><dt>Due</dt><dd>Friday</dd></div></dl>
      break
    case "list":
    case "list-item":
      sample = <ul className="mini-list">{["Approve the release", "Check the notes", "Invite reviewers"].slice(0, preview === "list-item" ? 1 : 3).map((label, index) => <li key={label}><button type="button" onClick={() => setActive(index)} aria-current={active === index ? "true" : undefined}><i aria-hidden="true">{index + 1}</i><span>{label}</span><ChevronDown /></button></li>)}</ul>
      break
    case "stat":
    case "stat-group":
      sample = <div className={`mini-stats${preview === "stat-group" ? " is-group" : ""}`}>{[["24", "Ready"], ["8", "Review"], ["3", "Blocked"]].slice(0, preview === "stat" ? 1 : 3).map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}</div>
      break
    case "timeline":
    case "activity":
    case "agenda":
      sample = <ol className="mini-timeline">{["09:00 Review copy", "11:30 Approve page", "14:00 Share notes"].map((label, index) => <li key={label}><i aria-hidden="true" className={index === active ? "is-active" : ""} /><button type="button" onClick={() => setActive(index)}>{label}</button></li>)}</ol>
      break
    case "calendar":
      sample = <div className="mini-calendar"><header><button type="button">‹</button><strong>July</strong><button type="button">›</button></header><div>{[20,21,22,23,24,25,26,27,28,29,30,31].map((day) => <button key={day} type="button" aria-pressed={active === day} onClick={() => setActive(day)}>{day}</button>)}</div></div>
      break
    case "accordion":
    case "collapsible":
      sample = <div className="mini-accordion"><button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{title}<ChevronDown /></button>{open ? <p>The useful detail stays next to its question.</p> : null}</div>
      break
    case "carousel":
      sample = <div className="mini-carousel"><button type="button" aria-label="Previous" onClick={() => setActive((active + 2) % 3)}>‹</button><div><i aria-hidden="true">{active + 1}</i><strong>{["First idea", "Second idea", "Third idea"][active]}</strong></div><button type="button" aria-label="Next" onClick={() => setActive((active + 1) % 3)}>›</button></div>
      break
    case "bar-chart":
      sample = <div className="mini-bars" aria-label="Four values"><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></div>
      break
    case "donut":
      sample = <div className="mini-donut"><i aria-hidden="true" /><strong>72%</strong><span>Ready</span></div>
      break
    case "tree":
      sample = <ul className="mini-tree"><li><button type="button" onClick={() => setOpen((value) => !value)}><ChevronDown />Library</button>{open ? <ul><li>Actions</li><li>Forms</li><li>Data</li></ul> : null}</li></ul>
      break

    case "app-shell":
      sample = <div className="mini-app-shell"><aside>PR</aside><header>Release</header><main><strong>Today</strong><span>Three things need you.</span></main></div>
      break
    case "auth":
    case "sign-in":
    case "sign-up":
    case "forgot":
    case "profile":
    case "settings":
    case "invite":
    case "contact":
    case "feedback-form":
    case "checkout":
      sample = <form className="mini-pattern-form" onSubmit={(event) => { event.preventDefault(); setOn(false) }}><strong>{title}</strong><label>{["profile", "invite", "contact"].includes(preview) ? "Name" : "Email address"}<input type="text" defaultValue={preview === "profile" ? "Mara Rivera" : undefined} placeholder="you@example.com" /></label>{["sign-up", "sign-in", "auth"].includes(preview) ? <label>Password<input type="password" defaultValue="rainfall" /></label> : null}<button type="submit">{on ? (preview === "forgot" ? "Send reset link" : "Save changes") : "Saved"}</button></form>
      break
    case "cart":
    case "order":
      sample = <div className="mini-summary"><strong>{title}</strong><div><span>Workshop seat</span><b>$48</b></div><div><span>Delivery</span><b>$0</b></div><div><span>Total</span><b>$48</b></div><button type="button">Review order</button></div>
      break
    case "pricing-card":
      sample = <div className="mini-pricing"><span>Studio</span><strong>$24</strong><p>For one working team.</p><button type="button">Choose Studio</button></div>
      break
    case "pricing-table":
      sample = <div className="mini-pricing-table"><div><b>Personal</b><b>Studio</b></div><div><span>1 workspace</span><span>5 workspaces</span></div><div><span>Basic history</span><span>Full history</span></div></div>
      break
    case "filter-bar":
      sample = <div className="mini-filter"><Search /><input placeholder="Find items" />{choiceButtons(["All", "Ready"])}</div>
      break
    case "results":
      sample = <div className="mini-results"><label><Search /><input value={text} onChange={(event) => setText(event.target.value)} /></label><span>3 matches</span>{["Button", "Card", "Dialog"].map((label) => <button type="button" key={label}>{label}<span>Open</span></button>)}</div>
      break
    case "notifications":
      sample = <div className="mini-notifications"><header><strong>Notifications</strong><span>3 new</span></header>{["Mara approved the page", "Sam left a note", "Elena shared a file"].map((label, index) => <button type="button" key={label} onClick={() => setActive(index)} aria-current={active === index ? "true" : undefined}><i aria-hidden="true" />{label}</button>)}</div>
      break
    default:
      sample = <div className="mini-fallback">{title}</div>
  }

  return <div className={`mini-preview${sizeClass}`}>{sample}</div>
}
