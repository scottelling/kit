"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type BulkActionBarProps = React.ComponentPropsWithoutRef<"div">

export function BulkActionBar({ children, className, ...props }: BulkActionBarProps) {
  const [active, setActive] = React.useState("Overview")
  if (children !== undefined) {
    return (<div data-slot="bulk-action-bar" className={cn("inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="bulk-action-bar" role="group" aria-label="Bulk Action Bar" className={cn("inline-flex flex-wrap gap-1 rounded-[var(--radius-card)] bg-muted p-1", className)} {...props}>{["One", "Two", "Three"].map((label) => <button key={label} type="button" onClick={() => setActive(label)} aria-pressed={active === label} className="min-h-11 rounded-[var(--radius-control)] px-3 text-sm font-semibold aria-pressed:bg-primary aria-pressed:text-primary-foreground">{label}</button>)}</div>
  )
}
