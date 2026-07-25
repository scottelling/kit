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
    await navigator.clipboard.writeText(command)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      className={compact ? "copy-command copy-command--compact" : "copy-command"}
      onClick={copy}
      aria-label={`${copied ? "Copied" : "Copy"} ${label ?? command}`}
    >
      {label ? <span className="copy-command__label">{label}</span> : null}
      <code>{command}</code>
      <span className="copy-command__action" aria-live="polite">
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </span>
    </button>
  )
}
