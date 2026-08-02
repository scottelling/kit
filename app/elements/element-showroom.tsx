"use client"

import { Check, Clipboard, Code2, Copy, Plus, X } from "lucide-react"
import { useRef, useState } from "react"

import { LarsonScanner } from "@/registry/elements/larson-scanner/larson-scanner"

type RegistryFile = {
  content: string
  path: string
  target?: string
  type: string
}

type ElementItem = {
  id: string
  title: string
  technicalName: string
  category: string
  description: string
  registryUrl: string
}

export function ElementShowroom({ item }: { item: ElementItem }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [files, setFiles] = useState<RegistryFile[]>([])
  const [activePath, setActivePath] = useState("")
  const [loadingCode, setLoadingCode] = useState(false)
  const [notice, setNotice] = useState("Everything below is live.")
  const [copied, setCopied] = useState<"project" | "file" | "all" | "" >("")

  const activeFile = files.find((file) => (file.target ?? file.path) === activePath) ?? files[0]
  const projectPrompt = `Add the ${item.title} ${item.technicalName} from ${item.registryUrl} to this project. Preserve its complete reduced-motion behavior, muted sound default, touch-safe custom path, and isolated ${item.category} styling.`

  async function copyText(text: string, kind: "project" | "file" | "all", message: string) {
    await navigator.clipboard.writeText(text)
    setCopied(kind)
    setNotice(message)
    window.setTimeout(() => setCopied(""), 2200)
  }

  async function openCode() {
    dialogRef.current?.showModal()
    if (files.length || loadingCode) return
    setLoadingCode(true)
    try {
      const response = await fetch("/r/elements/larson-scanner.json")
      if (!response.ok) throw new Error("Code handoff unavailable")
      const payload = await response.json() as { files?: RegistryFile[] }
      const nextFiles = payload.files ?? []
      setFiles(nextFiles)
      setActivePath(nextFiles[0]?.target ?? nextFiles[0]?.path ?? "")
    } catch {
      setNotice("The live element still works, but its code handoff could not be opened.")
    } finally {
      setLoadingCode(false)
    }
  }

  function closeCode() {
    dialogRef.current?.close()
  }

  const allCode = files.map((file) => `/* ${file.target ?? file.path} */\n\n${file.content}`).join("\n\n")

  return (
    <section className="element-feature" id="knight-rider" aria-labelledby="knight-rider-title">
      <header className="element-feature__header">
        <div>
          <span>Signature Effect · 001</span>
          <h2 id="knight-rider-title">{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <div className="element-feature__actions">
          <button type="button" className="element-action element-action--primary" data-project-prompt={projectPrompt} onClick={() => copyText(projectPrompt, "project", "The English project prompt is copied.")}>
            {copied === "project" ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
            {copied === "project" ? "Prompt copied" : "Add to a project"}
          </button>
          <button type="button" className="element-action" onClick={openCode}><Code2 aria-hidden="true" /> Get the code</button>
        </div>
      </header>

      <div className="element-feature__proof">
        <div><span>Live</span><strong>Touch every control</strong></div>
        <div><span>Sound</span><strong>Starts muted</strong></div>
        <div><span>Motion</span><strong>Freezes completely when requested</strong></div>
        <div><span>Phone</span><strong>44px programming controls</strong></div>
      </div>

      <div className="element-feature__stage">
        <LarsonScanner title="Knight Rider / Larson Scanner" />
      </div>

      <div className="element-feature__handoff" aria-live="polite">
        <span>{notice}</span>
        <button type="button" onClick={() => copyText(projectPrompt, "project", "The English project prompt is copied.")}><Clipboard aria-hidden="true" /> Copy the English prompt</button>
      </div>

      <dialog ref={dialogRef} className="element-code-dialog" onClick={(event) => { if (event.target === event.currentTarget) closeCode() }}>
        <div className="element-code-dialog__panel">
          <header>
            <div><span>Exact working source</span><h2>Knight Rider code</h2><p>Choose a file, copy it, or copy the complete element.</p></div>
            <button type="button" aria-label="Close code" onClick={closeCode}><X aria-hidden="true" /></button>
          </header>

          {loadingCode ? <div className="element-code-dialog__loading"><strong>Opening the source.</strong><span>The live element stays available behind this window.</span></div> : null}

          {!loadingCode && files.length ? (
            <>
              <div className="element-code-dialog__toolbar">
                <div role="tablist" aria-label="Code files">
                  {files.map((file) => {
                    const path = file.target ?? file.path
                    const label = path.split("/").at(-1) ?? path
                    return <button key={path} type="button" role="tab" aria-selected={activePath === path} onClick={() => setActivePath(path)}>{label}</button>
                  })}
                </div>
                <div>
                  <button type="button" onClick={() => activeFile && copyText(activeFile.content, "file", `${activeFile.target ?? activeFile.path} copied.`)}>{copied === "file" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied === "file" ? "Copied" : "Copy file"}</button>
                  <button type="button" onClick={() => copyText(allCode, "all", "The complete element is copied.")}>{copied === "all" ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}{copied === "all" ? "All copied" : "Copy everything"}</button>
                </div>
              </div>
              <pre tabIndex={0}><code>{activeFile?.content}</code></pre>
            </>
          ) : null}

          {!loadingCode && !files.length ? <div className="element-code-dialog__loading"><strong>The code could not be opened.</strong><span>The public handoff remains at {item.registryUrl}.</span></div> : null}
        </div>
      </dialog>
    </section>
  )
}
