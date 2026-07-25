"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ButtonGroupProps = React.ComponentPropsWithoutRef<"div">

export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  const [active, setActive] = React.useState("Overview")
  return (
    <div data-slot="button-group" role="group" aria-label="Button Group" className={cn("inline-flex flex-wrap gap-1 rounded-[var(--radius-card)] bg-muted p-1", className)} {...props}>{["One", "Two", "Three"].map((label) => <button key={label} type="button" onClick={() => setActive(label)} aria-pressed={active === label} className="min-h-11 rounded-[var(--radius-control)] px-3 text-sm font-semibold aria-pressed:bg-primary aria-pressed:text-primary-foreground">{label}</button>)}</div>
  )
}
