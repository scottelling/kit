import * as React from "react"

import { cn } from "@/lib/utils"

export type EmptyStateProps = React.ComponentPropsWithoutRef<"section">

export function EmptyState({ children, className, ...props }: EmptyStateProps) {
  if (children !== undefined) {
    return (<section data-slot="empty-state" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</section>)
  }

  return (
    <section data-slot="empty-state" className={cn("grid justify-items-start gap-2", className)} {...props}><span className="size-10 rounded-[var(--radius-control)] bg-muted" /><strong>No notes yet</strong><p className="text-sm text-muted-foreground">Notes keep decisions nearby.</p><button type="button" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-primary text-primary-foreground">Add a note</button></section>
  )
}
