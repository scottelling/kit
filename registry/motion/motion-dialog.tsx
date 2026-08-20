"use client"

import * as React from "react"

import "./motion-dialog.css"

export type MotionDialogProps = {
  triggerLabel?: string
  title?: string
  description?: string
  confirmLabel?: string
  onConfirm?: () => void
  className?: string
}

export function MotionDialog({
  triggerLabel = "Review decision",
  title = "Ready to publish?",
  description = "The page will become visible to everyone with the link.",
  confirmLabel = "Publish page",
  onConfirm,
  className,
}: MotionDialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const closeTimer = React.useRef<number | null>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  React.useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }, [])

  function openDialog() {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.dataset.closing = "false"
    dialog.showModal()
  }

  function closeDialog() {
    const dialog = dialogRef.current
    if (!dialog?.open || dialog.dataset.closing === "true") return
    dialog.dataset.closing = "true"
    const exitDuration = Number.parseFloat(window.getComputedStyle(dialog).getPropertyValue("--kit-motion-exit")) || 140
    closeTimer.current = window.setTimeout(() => {
      dialog.close()
      dialog.dataset.closing = "false"
      triggerRef.current?.focus()
    }, exitDuration)
  }

  return (
    <div className={["kit-motion-dialog", className].filter(Boolean).join(" ")}>
      <button ref={triggerRef} className="kit-motion-dialog__trigger" type="button" onClick={openDialog}>{triggerLabel}</button>
      <dialog
        ref={dialogRef}
        className="kit-motion-dialog__surface"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onCancel={(event) => {
          event.preventDefault()
          closeDialog()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog()
        }}
      >
        <div className="kit-motion-dialog__content">
          <span className="kit-motion-dialog__eyebrow">Confirm the next step</span>
          <h2 id={titleId}>{title}</h2>
          <p id={descriptionId}>{description}</p>
          <div className="kit-motion-dialog__actions">
            <button type="button" onClick={closeDialog}>Keep editing</button>
            <button
              type="button"
              data-primary="true"
              onClick={() => {
                onConfirm?.()
                closeDialog()
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}
