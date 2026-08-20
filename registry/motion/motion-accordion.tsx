"use client"

import * as React from "react"

import "./motion-accordion.css"

export type MotionAccordionProps = {
  title?: string
  children?: React.ReactNode
  className?: string
}

export function MotionAccordion({ title = "What changes when I swap kits?", children, className }: MotionAccordionProps) {
  const [open, setOpen] = React.useState(false)
  const panelId = React.useId()

  return (
    <div className={["kit-motion-accordion", className].filter(Boolean).join(" ")} data-open={open}>
      <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
        <span>{title}</span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id={panelId} className="kit-motion-accordion__panel" hidden={!open}>
        <div className="kit-motion-accordion__content">
          {children ?? <p>Your product keeps its pages, content, and behavior. The selected kit changes the visual and interaction expression.</p>}
        </div>
      </div>
    </div>
  )
}
