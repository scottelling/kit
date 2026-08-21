"use client"

import { Check, ChevronRight, Copy, ExternalLink, Search, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type SystemLink = {
  id: string
  label: string
  showroom: string
  component: string
}

type Guide = {
  name: string
  title: string
  category: string
  scope: string
  purpose: string
  useWhen: string[]
  avoidWhen: string[]
  states: string[]
  interactionStates: string[]
  events: string[]
  flow: { mode: string; rule: string; machineThreshold: string }
  kitOwns: string[]
  productOwns: string[]
  accessibility: string[]
  responsive: string[]
  proof: string[]
  systems: SystemLink[]
  prompt: string
}

type Catalog = {
  count: number
  categories: Array<{ name: string; count: number }>
  systems: Array<Omit<SystemLink, "component"> & { itemBase: string }>
  items: Guide[]
}

function GuideList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="guide-checklist">
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul>
    </section>
  )
}

export function GuideLibrary({ catalog }: { catalog: Catalog }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [selectedName, setSelectedName] = useState(catalog.items[0]?.name ?? "button")
  const [systemId, setSystemId] = useState("vanilla")
  const [copied, setCopied] = useState(false)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return catalog.items.filter((guide) => {
      const inCategory = category === "All" || guide.category === category
      const words = `${guide.title} ${guide.category} ${guide.purpose} ${guide.useWhen.join(" ")} ${guide.events.join(" ")}`.toLowerCase()
      return inCategory && (!needle || words.includes(needle))
    })
  }, [catalog.items, category, query])

  const selected = catalog.items.find((guide) => guide.name === selectedName) ?? visible[0] ?? catalog.items[0]
  const system = selected.systems.find((item) => item.id === systemId) ?? selected.systems[0]

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash.slice(1)
      if (hash && catalog.items.some((guide) => guide.name === hash)) setSelectedName(hash)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [catalog.items])

  function chooseGuide(name: string) {
    setSelectedName(name)
    setCopied(false)
    window.history.replaceState(null, "", `#${name}`)
    if (window.innerWidth < 880) window.requestAnimationFrame(() => document.getElementById("selected-guide")?.scrollIntoView({ block: "start" }))
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(selected.prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="guide-shell">
      <SiteHeader />
      <main className="guide-main">
        <section className="guide-opening" aria-labelledby="guide-title">
          <div>
            <Link href="/build#library">Studio library</Link>
            <span>One shared source for people and agents</span>
            <h1 id="guide-title">Every component understands its job.</h1>
            <p>Choose any interface piece. See when it belongs, what can happen, what it must show, what the product still owns, and what has to work before it ships.</p>
          </div>
          <aside aria-label="What these guides connect">
            <strong>{catalog.count} complete guides</strong>
            <p>The same maintained instructions power this room, the public handoff, the installer, the agent skill, and the release checks.</p>
            <div><span>{catalog.categories.length} families</span><span>{catalog.systems.length} visual kits</span><span>1 shared contract</span></div>
          </aside>
        </section>

        <section className="guide-finder" aria-label="Find a component guide">
          <label>
            <Search aria-hidden="true" />
            <span className="sr-only">Find a component guide</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “checkout”, “failed”, or “dialog”" />
            {query ? <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X aria-hidden="true" /></button> : null}
          </label>
          <div className="guide-category-rail" role="group" aria-label="Choose a component family">
            <button type="button" aria-pressed={category === "All"} onClick={() => setCategory("All")}>Everything <span>{catalog.count}</span></button>
            {catalog.categories.map((item) => <button key={item.name} type="button" aria-pressed={category === item.name} onClick={() => setCategory(item.name)}>{item.name} <span>{item.count}</span></button>)}
          </div>
          <p aria-live="polite">Showing {visible.length} {visible.length === 1 ? "guide" : "guides"}</p>
        </section>

        <section className="guide-workbench" aria-label="Component guide workbench">
          <aside className="guide-index">
            {visible.map((guide) => (
              <button key={guide.name} type="button" aria-pressed={selected.name === guide.name} onClick={() => chooseGuide(guide.name)}>
                <span>{guide.category}{guide.scope === "specialist" ? " · Optional" : ""}</span>
                <strong>{guide.title}</strong>
                <small>{guide.purpose}</small>
                <ChevronRight aria-hidden="true" />
              </button>
            ))}
            {visible.length === 0 ? <div className="guide-empty"><strong>No guide matched “{query}”.</strong><p>Try the task rather than the visual name.</p><button type="button" onClick={() => { setQuery(""); setCategory("All") }}>Show everything</button></div> : null}
          </aside>

          <article className="guide-detail" id="selected-guide">
            <header>
              <div><span>{selected.category}{selected.scope === "specialist" ? " · Optional specialist" : " · Shared by every kit"}</span><h2>{selected.title}</h2><p>{selected.purpose}</p></div>
              <button type="button" onClick={copyPrompt}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? "Request copied" : "Use in a project"}</button>
            </header>

            <div className="guide-decision-pair">
              <section><span>Use it when</span><p>{selected.useWhen[0]}</p></section>
              <section><span>Choose something else when</span><p>{selected.avoidWhen[0]}</p></section>
            </div>

            <section className="guide-flow">
              <header><div><span>Interaction flow</span><h3>The screen follows one explicit state.</h3></div><small>{selected.flow.mode === "machine-ready" ? "Machine-ready flow" : selected.flow.mode === "stateless" ? "Direct foundation" : "Named events"}</small></header>
              <div><strong>What can happen</strong><div>{selected.events.map((event) => <span key={event}>{event.replaceAll("_", " ").toLowerCase()}</span>)}</div></div>
              <div><strong>What people can see</strong><div>{selected.states.map((state) => <span key={state}>{state}</span>)}</div></div>
              <div><strong>How the control can be used</strong><div>{selected.interactionStates.map((state) => <span key={state}>{state}</span>)}</div></div>
              <p>{selected.flow.rule}</p>
            </section>

            <div className="guide-ownership">
              <GuideList title="Kit takes care of" items={selected.kitOwns} />
              <GuideList title="The product still decides" items={selected.productOwns} />
            </div>

            <div className="guide-quality">
              <GuideList title="Everyone can use it" items={selected.accessibility} />
              <GuideList title="It fits the phone" items={selected.responsive} />
              <GuideList title="Prove it before release" items={selected.proof} />
            </div>

            <section className="guide-handoff">
              <div><span>Try the real piece</span><h3>The guidance stays. The visual kit changes.</h3><p>Choose a kit, then open the working component in that system.</p></div>
              <div className="guide-system-choices" role="radiogroup" aria-label="Choose a visual kit">
                {selected.systems.map((item) => <button key={item.id} type="button" role="radio" aria-checked={system.id === item.id} onClick={() => setSystemId(item.id)}>{item.label}</button>)}
              </div>
              <div className="guide-handoff-actions">
                <a href={`${system.showroom}#${selected.name}`}>See it in {system.label} <ExternalLink aria-hidden="true" /></a>
                <a href={`/r/guides/${selected.name}.md`}>Take this guide</a>
              </div>
            </section>
          </article>
        </section>
      </main>
      <SiteFooter note="One component. One job. Every state accounted for." />
    </div>
  )
}
