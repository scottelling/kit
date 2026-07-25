import * as React from "react"

import { cn } from "@/lib/utils"

export type ProgressCardProps = React.ComponentPropsWithoutRef<"div">

export function ProgressCard({ className, ...props }: ProgressCardProps) {
  return (
    <div data-slot="progress-card" role="status" className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] flex min-h-16 items-center gap-3 p-4 text-sm", className)} {...props}><span className="size-3 shrink-0 rounded-full bg-primary" aria-hidden="true" /><div><strong>Progress Card</strong><p className="mt-1 text-muted-foreground">The current state is visible and ready to act on.</p></div></div>
  )
}
