"use client"

import { Check, Clipboard, Code2, Copy, Plus, Search, X } from "lucide-react"
import { useMemo, useRef, useState } from "react"

import { BeautifulUIElement, type BeautifulUIElementKind } from "@/registry/elements/beautiful-ui/beautiful-ui-elements"

type RegistryFile = { content: string; path: string; target?: string; type: string }
type ElementItem = {
  id: string
  title: string
  technicalName: string
  category: string
  description: string
  registryUrl: string
}

export function BeautifulUIShowroom({ items }: { items: ElementItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [activeItem, setActiveItem] = useState<ElementItem | null>(null)
  const [files, setFiles] = useState<RegistryFile[]>([])
  const [activePath, setActivePath] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState("")

  const categories = useMemo(() => ["All", ...new Set(items.map((item) => item.category))], [items])
  const visible = useMemo(() => items.filter((item) => {
    const matchesCategory = category === "All" || item.category === category
    const haystack = `${item.title} ${item.technicalName} ${item.description}`.toLowerCase()
    return matchesCategory && haystack.includes(query.trim().toLowerCase())
  }), [category, items, query])
  const activeFile = files.find((file) => (file.target ?? file.path) === activePath) ?? files[0]

  function projectPrompt(item: ElementItem) {
    return `Add the ${item.title} element from ${item.registryUrl} to this project. Adapt it to the project's visual system while preserving its interaction, keyboard access, readable states, 44-pixel touch controls, responsive behavior, and reduced-motion support.`
  }

  async function copyText(text: string, kind: string) {
    await navigator.clipboard.writeText(text)
    setCopied(kind)
    window.setTimeout(() => setCopied(""), 1800)
  }

  async function openCode(item: ElementItem) {
    setActiveItem(item)
    setFiles([])
    setActivePath("")
    setLoading(true)
    dialogRef.current?.showModal()
    try {
      const [itemResponse, foundationResponse] = await Promise.all([
        fetch(`/r/elements/${item.id}.json`),
        fetch("/r/elements/beautiful-ui-foundation.json"),
      ])
      if (!itemResponse.ok || !foundationResponse.ok) throw new Error("Code handoff unavailable")
      const [payload, foundation] = await Promise.all([
        itemResponse.json() as Promise<{ files?: RegistryFile[] }>,
        foundationResponse.json() as Promise<{ files?: RegistryFile[] }>,
      ])
      const nextFiles = [...(payload.files ?? []), ...(foundation.files ?? [])]
      setFiles(nextFiles)
      setActivePath(nextFiles[0]?.target ?? nextFiles[0]?.path ?? "")
    } catch {
      setFiles([])
    } finally {
      setLoading(false)
    }
  }

  const allCode = files.map((file) => `/* ${file.target ?? file.path} */\n\n${file.content}`).join("\n\n")

  return <section className="beautiful-collection" id="beautiful-ui" aria-labelledby="beautiful-ui-title">
    <header className="beautiful-collection__header">
      <div><span>Interactive Elements · 002–020</span><h2 id="beautiful-ui-title">Beautiful UI, rebuilt for real projects.</h2><p>Nineteen useful interface ideas from Beautiful UI, adapted to Kit’s standards. Every example works here, scales to a phone, and can travel into another project.</p></div>
      <a href="https://www.beautifului.dev" target="_blank" rel="noreferrer">Original collection by Shane Levine</a>
    </header>

    <div className="beautiful-collection__tools">
      <label><Search aria-hidden="true" /><span className="sr-only">Search elements</span><input placeholder="Find an element…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <div aria-label="Filter element categories">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    </div>

    <p className="beautiful-collection__count" aria-live="polite">Showing {visible.length} {visible.length === 1 ? "element" : "elements"}</p>

    <div className="beautiful-collection__grid">
      {visible.map((item) => <article key={item.id} className="beautiful-element" id={item.id}>
        <header><div><span>{String(items.indexOf(item) + 2).padStart(3, "0")} · {item.category}</span><h3>{item.title}</h3><p>{item.description}</p></div><small>{item.technicalName}</small></header>
        <div className="beautiful-element__stage"><BeautifulUIElement kind={item.id as BeautifulUIElementKind} /></div>
        <footer><button type="button" className="element-action element-action--primary" onClick={() => copyText(projectPrompt(item), `prompt-${item.id}`)}>{copied === `prompt-${item.id}` ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}{copied === `prompt-${item.id}` ? "Prompt copied" : "Add to a project"}</button><button type="button" className="element-action" onClick={() => openCode(item)}><Code2 aria-hidden="true" /> Get the code</button></footer>
      </article>)}
    </div>

    {!visible.length ? <div className="beautiful-collection__empty"><Search aria-hidden="true" /><strong>No elements match that search.</strong><button type="button" onClick={() => { setQuery(""); setCategory("All") }}>Show the complete collection</button></div> : null}

    <dialog ref={dialogRef} className="element-code-dialog" onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
      <div className="element-code-dialog__panel">
        <header><div><span>Working source</span><h2>{activeItem?.title}</h2><p>The element, shared foundation, and original MIT notice travel together.</p></div><button type="button" aria-label="Close code" onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button></header>
        {loading ? <div className="element-code-dialog__loading"><strong>Opening the source.</strong></div> : null}
        {!loading && files.length ? <><div className="element-code-dialog__toolbar"><div role="tablist" aria-label="Code files">{files.map((file) => { const path = file.target ?? file.path; return <button key={path} type="button" role="tab" aria-selected={activePath === path} onClick={() => setActivePath(path)}>{path.split("/").at(-1)}</button> })}</div><div><button type="button" onClick={() => activeFile && copyText(activeFile.content, "file")}>{copied === "file" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied === "file" ? "Copied" : "Copy file"}</button><button type="button" onClick={() => copyText(allCode, "all")}>{copied === "all" ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}{copied === "all" ? "All copied" : "Copy everything"}</button></div></div><pre tabIndex={0}><code>{activeFile?.content}</code></pre></> : null}
        {!loading && !files.length ? <div className="element-code-dialog__loading"><strong>The source could not be opened.</strong><span>Try again from the element card.</span></div> : null}
      </div>
    </dialog>
  </section>
}
