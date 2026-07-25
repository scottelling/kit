"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type CopyCommandProps = {
  command: string
  compact?: boolean
  label?: string
}

export function CopyCommand({ command, compact = false, label }: CopyCommandProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  async function copy() {
    let copiedToClipboard = false

    try {
      await navigator.clipboard.writeText(command)
      copiedToClipboard = true
    } catch {
      const field = document.createElement("textarea")
      field.value = command
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.inset = "0 auto auto -9999px"
      document.body.appendChild(field)
      field.select()
      copiedToClipboard = document.execCommand("copy")
      field.remove()
    }

    if (!copiedToClipboard) return

    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className={compact ? "copy-command copy-command--compact" : "copy-command"}>
      {label ? <span className="copy-command__label">{label}</span> : null}
      <code>{command}</code>
      <button
        type="button"
        className="copy-command__action"
        onClick={copy}
        aria-label={`${copied ? "Copied" : "Copy"} ${label ?? command}`}
        aria-live="polite"
      >
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  )
}
