"use client"

import * as React from "react"

import "./motion-notice.css"

export type MotionNoticeProps = {
  triggerLabel?: string
  title?: string
  message?: string
  className?: string
}

export function MotionNotice({ triggerLabel = "Save changes", title = "Changes saved", message = "Your latest decisions are now part of the project.", className }: MotionNoticeProps) {
  const [open, setOpen] = React.useState(false)
  const timer = React.useRef<number | null>(null)

  React.useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current)
  }, [])

  function showNotice() {
    if (timer.current) window.clearTimeout(timer.current)
    setOpen(true)
    timer.current = window.setTimeout(() => setOpen(false), 3200)
  }

  return (
    <div className={["kit-motion-notice", className].filter(Boolean).join(" ")}>
      <button className="kit-motion-notice__trigger" type="button" onClick={showNotice}>{triggerLabel}</button>
      <div className="kit-motion-notice__surface" data-open={open} role="status" aria-live="polite" aria-hidden={!open}>
        <span aria-hidden="true">✓</span>
        <div><strong>{title}</strong><p>{message}</p></div>
        <button type="button" aria-label="Dismiss notice" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>×</button>
      </div>
    </div>
  )
}
