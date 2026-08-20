"use client"

import { Check, Clipboard, Plus, RefreshCw, ShieldCheck, Trash2 } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type Contract = {
  preserve: string[]
  change: string[]
  repairBeforeSwap: string[]
  defaultProofWidths: number[]
  proof: string[]
  representativeScreens: Record<string, string[]>
  iconPolicy: Record<string, string>
  fontPolicy: Record<string, string>
  rollback: string
}

type System = {
  id: string
  label: string
  homepage: string
  tokenUrl: string
  componentCount: number
}

type Layer = {
  id: string
  label: string
  count: number
  note?: string
}

type Assessment = {
  version: string
  purpose: string
  boundary: string
  classifications: Array<{ id: string; label: string; description: string; action: string }>
  approval: string[]
}

type AssessedJourney = {
  id: string
  label: string
  classification?: string
}

const projectTypes = [
  { id: "product-app", label: "Product app", note: "Workspaces, settings, navigation, data, and daily actions" },
  { id: "creative-tool", label: "Creative tool", note: "Canvas, inspectors, projects, export, and specialist controls" },
  { id: "commerce", label: "Store", note: "Discovery, products, cart, checkout, and receipts" },
  { id: "content", label: "Content product", note: "Home, reading, search, archives, and subscriptions" },
]

const systemNotes: Record<string, string> = {
  "purple-rain": "Direct, tactile, and instantly legible with restrained orchid action.",
  jade: "Raised, seated, and sunken surfaces with a disciplined mint signal.",
  "os-kit": "Solid desktop and mobile materials with theme-wide identity.",
  "animation-studio": "A focused dark workspace with compact controls and purposeful motion.",
  "vanilla-kit": "A neutral starting point built for clean future swaps.",
  voltage: "A vivid desktop system with solid color blocks, rounded objects, and bright status signals.",
}

export function SwapStudio({ contract, assessment, systems, layers }: { contract: Contract; assessment: Assessment; systems: System[]; layers: Layer[] }) {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("Keep the product exactly as it works today. Repair spacing, overlap, overflow, and unclear interactions while changing only the visual system.")
  const [systemId, setSystemId] = useState("animation-studio")
  const [projectType, setProjectType] = useState("product-app")
  const [prepared, setPrepared] = useState(false)
  const [copied, setCopied] = useState(false)
  const [journeyDraft, setJourneyDraft] = useState("")
  const [journeys, setJourneys] = useState<AssessedJourney[]>([])

  const system = systems.find((item) => item.id === systemId) ?? systems[0]
  const type = projectTypes.find((item) => item.id === projectType) ?? projectTypes[0]
  const screens = useMemo(() => contract.representativeScreens[projectType] ?? [], [contract.representativeScreens, projectType])
  const shared = layers.find((item) => item.id === "shared")
  const specialty = layers.find((item) => item.id === "specialty")
  const unclassifiedCount = journeys.filter((journey) => !journey.classification).length
  const sharedGapCount = journeys.filter((journey) => journey.classification === "shared-gap").length
  const assessmentStatus = journeys.length === 0 ? "Not started" : unclassifiedCount ? "Needs classification" : sharedGapCount ? "Kit upgrade required" : "Ready to adopt"
  const assessmentLines = useMemo(() => journeys.length
    ? journeys.map((journey) => {
      const classification = assessment.classifications.find((item) => item.id === journey.classification)
      return `${journey.label}: ${classification?.label ?? "Not classified"}. ${classification?.action ?? "Classify this journey before adoption."}`
    })
    : ["No product journeys have been classified yet. Complete the Kit fit check before adoption."], [assessment.classifications, journeys])

  const brief = useMemo(() => [
    `Prepare ${projectName.trim() || "this product"} for a reversible ${system.label} visual-system swap.`,
    description.trim(),
    `Preserve: ${contract.preserve.join(", ")}.`,
    `Repair first: ${contract.repairBeforeSwap.join(", ")}.`,
    `Apply: ${contract.change.join(", ")}.`,
    `Use the shared component catalog for the product's existing needs. Add specialist patterns only when the current product actually needs them.`,
    `Kit fit check (${assessmentStatus}): ${assessmentLines.join(" ")}`,
    `Prove the same populated ${type.label.toLowerCase()} screens before and after: ${screens.join(", ")}.`,
    `Keep one appearance switch and one clean rollback point. Do not redesign the product layout unless a separate decision explicitly approves it.`,
  ].join("\n\n"), [assessmentLines, assessmentStatus, contract, description, projectName, screens, system.label, type.label])

  function addJourney() {
    const label = journeyDraft.trim()
    if (!label) return
    setJourneys((current) => [...current, { id: `${Date.now()}-${current.length}`, label }])
    setJourneyDraft("")
  }

  function classifyJourney(id: string, classification: string) {
    setJourneys((current) => current.map((journey) => journey.id === id ? { ...journey, classification } : journey))
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="swap-studio-shell">
      <SiteHeader />
      <main className="swap-studio-main">
        <section className="swap-opening" aria-labelledby="swap-title">
          <div>
            <Link href="/build">Build</Link>
            <h1 id="swap-title">Change the look. Keep the product.</h1>
            <p>A kit swap should feel surgical: repair what is broken, preserve what makes the product work, and make the new visual system easy to undo.</p>
          </div>
          <aside><ShieldCheck /><strong>Nothing is forced</strong><p>Every kit can reach the complete component catalog. Specialist layouts stay optional, and product-owned screens stay in the product.</p></aside>
        </section>

        <section className="swap-boundaries" aria-label="What a swap does">
          <article><span>Keep</span><h2>The product itself</h2><ul>{contract.preserve.map((item) => <li key={item}><Check />{item}</li>)}</ul></article>
          <article><span>Repair</span><h2>The broken experience</h2><ul>{contract.repairBeforeSwap.map((item) => <li key={item}><Check />{item}</li>)}</ul></article>
          <article><span>Change</span><h2>The visual language</h2><ul>{contract.change.map((item) => <li key={item}><Check />{item}</li>)}</ul></article>
        </section>

        <section className="swap-fit" aria-labelledby="swap-fit-title">
          <header><div><span>Kit fit check</span><h2 id="swap-fit-title">Classify the real things people need to do.</h2><p>{assessment.purpose}</p></div><strong data-status={assessmentStatus}>{assessmentStatus}</strong></header>
          <p className="swap-fit-boundary">{assessment.boundary}</p>
          <form onSubmit={(event) => { event.preventDefault(); addJourney() }}>
            <label htmlFor="journey-draft">Add one product journey</label>
            <div><input id="journey-draft" value={journeyDraft} onChange={(event) => setJourneyDraft(event.target.value)} placeholder="For example: publish a document" /><button type="submit" disabled={!journeyDraft.trim()}><Plus />Add journey</button></div>
          </form>
          {journeys.length ? (
            <div className="swap-fit-list">
              {journeys.map((journey) => (
                <article key={journey.id}>
                  <header><strong>{journey.label}</strong><button type="button" aria-label={`Remove ${journey.label}`} onClick={() => setJourneys((current) => current.filter((item) => item.id !== journey.id))}><Trash2 /></button></header>
                  <div role="group" aria-label={`Classify ${journey.label}`}>
                    {assessment.classifications.map((classification) => <button key={classification.id} type="button" aria-pressed={journey.classification === classification.id} onClick={() => classifyJourney(journey.id, classification.id)}><strong>{classification.label}</strong><span>{classification.description}</span></button>)}
                  </div>
                  {journey.classification ? <p>{assessment.classifications.find((item) => item.id === journey.classification)?.action}</p> : <p>Choose where this journey belongs before adoption.</p>}
                </article>
              ))}
            </div>
          ) : <div className="swap-fit-empty"><strong>No journeys added yet.</strong><p>Add the product’s main jobs one at a time. This is about design-system fit, not launch readiness.</p></div>}
          <footer><span>{journeys.length} {journeys.length === 1 ? "journey" : "journeys"}</span><span>{unclassifiedCount} unclassified</span><span>{sharedGapCount} Kit {sharedGapCount === 1 ? "gap" : "gaps"}</span></footer>
        </section>

        <section className="swap-builder" aria-labelledby="swap-builder-title">
          <header><span>Prepare the handoff</span><h2 id="swap-builder-title">Describe the product in ordinary English.</h2><p>The Studio turns these choices into the exact brief used for the audit, repair, swap, proof, and rollback.</p></header>
          <div className="swap-builder-grid">
            <form onSubmit={(event) => { event.preventDefault(); setPrepared(true) }}>
              <label>Project name<input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Cabinet" /></label>
              <label>What must stay true?<textarea value={description} onChange={(event) => setDescription(event.target.value)} /></label>
              <fieldset><legend>What kind of product is it?</legend>{projectTypes.map((item) => <button key={item.id} type="button" aria-pressed={projectType === item.id} onClick={() => setProjectType(item.id)}><strong>{item.label}</strong><span>{item.note}</span></button>)}</fieldset>
              <fieldset><legend>Which visual system should it use?</legend>{systems.map((item) => <button key={item.id} type="button" aria-pressed={systemId === item.id} onClick={() => setSystemId(item.id)}><strong>{item.label}</strong><span>{systemNotes[item.id]}</span></button>)}</fieldset>
              <button className="swap-primary" type="submit">Prepare this swap</button>
            </form>

            <div className="swap-preview" aria-live="polite">
              <header><span>{system.label}</span><strong>{projectName.trim() || "Your product"}</strong><small>{type.label}</small></header>
              <div className="swap-preview-screen">
                <aside><i /><i /><i /><i /></aside>
                <main><header><span>Current workspace</span><button type="button">Primary action</button></header><section><small>Keep the product</small><h3>The same work, newly expressed.</h3><p>The layout, content, and behavior stay familiar. The new kit carries color, type, spacing, controls, focus, and motion.</p><div><button type="button">Review</button><button type="button">Continue</button></div></section></main>
              </div>
              <dl><div><dt>Everyday pieces</dt><dd>{shared?.count ?? 0} available for existing product needs</dd></div><div><dt>Specialist patterns</dt><dd>{specialty?.count ?? 0} available, none forced</dd></div><div><dt>Rollback</dt><dd>One appearance switch</dd></div></dl>
            </div>
          </div>
        </section>

        {prepared ? (
          <section className="swap-plan" aria-labelledby="swap-plan-title">
            <header><div><span>Prepared handoff</span><h2 id="swap-plan-title">{sharedGapCount ? "Pause here. Kit has a reusable gap to fill." : journeys.length === 0 || unclassifiedCount ? "The swap plan is ready. The Kit fit check is not." : "The product is ready for a controlled swap."}</h2></div><button type="button" onClick={copyBrief}>{copied ? <Check /> : <Clipboard />}{copied ? "Brief copied" : "Copy the complete brief"}</button></header>
            <ol>
              <li><span>01</span><div><strong>Protect the current product</strong><p>Work from an isolated snapshot. Capture the same populated screens before any visual change.</p></div></li>
              <li><span>02</span><div><strong>Repair visible problems first</strong><p>Fix overlap, overflow, touch, keyboard, and scroll ownership while the current appearance is still the reference.</p></div></li>
              <li><span>03</span><div><strong>Map what already exists</strong><p>Match the product’s current controls to the shared catalog. Promote reusable missing pieces once so every kit gains them.</p></div></li>
              <li><span>04</span><div><strong>Apply {system.label}</strong><p>Change foundations and component styling. Do not import unrelated product layouts or specialist patterns.</p></div></li>
              <li><span>05</span><div><strong>Prove and keep the exit clear</strong><p>Compare the same screens across every required width and state. Keep the previous appearance available until approval.</p></div></li>
            </ol>
            <div className="swap-proof"><RefreshCw /><p><strong>Representative screens:</strong> {screens.join(" · ")}. <strong>Widths:</strong> {contract.defaultProofWidths.map((item) => `${item}px`).join(" · ")}.</p></div>
          </section>
        ) : null}
      </main>
      <SiteFooter note="Preserve the product. Repair the experience. Swap the system." />
    </div>
  )
}
