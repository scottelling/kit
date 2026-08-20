"use client"

import * as React from "react"

import "./motion-state-swap.css"

export type MotionStateSwapProps = {
  firstLabel?: string
  secondLabel?: string
  className?: string
}

export function MotionStateSwap({ firstLabel = "Ready to review", secondLabel = "Review complete", className }: MotionStateSwapProps) {
  const [complete, setComplete] = React.useState(false)

  return (
    <div className={["kit-motion-swap", className].filter(Boolean).join(" ")} data-state={complete ? "complete" : "ready"}>
      <div className="kit-motion-swap__status" aria-hidden="true">
        <span data-label="ready">{firstLabel}</span>
        <span data-label="complete">{secondLabel}</span>
      </div>
      <span className="kit-motion-swap__announcement" aria-live="polite">{complete ? secondLabel : firstLabel}</span>
      <button type="button" onClick={() => setComplete((value) => !value)}>{complete ? "Return to review" : "Complete review"}</button>
    </div>
  )
}
