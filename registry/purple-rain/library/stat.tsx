import * as React from "react"

import { cn } from "@/lib/utils"

export type StatProps = React.ComponentPropsWithoutRef<"div">

export function Stat({ className, ...props }: StatProps) {
  return (
    <div data-slot="stat" className={cn("flex flex-wrap gap-3", className)} {...props}>{[["24", "Ready"], ["8", "Review"], ["3", "Blocked"]].slice(0, 1).map(([value, label]) => <div key={label} className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] grid min-w-28 gap-1 p-4"><strong className="text-3xl tabular-nums">{value}</strong><span className="text-sm text-muted-foreground">{label}</span></div>)}</div>
  )
}
