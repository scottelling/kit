import * as React from "react"

import { cn } from "@/lib/utils"

export type AlertDialogProps = React.ComponentPropsWithoutRef<"details">

export function AlertDialog({ className, ...props }: AlertDialogProps) {
  return (
    <details data-slot="alert-dialog" className={cn("relative inline-block", className)} {...props}><summary className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer list-none">Open Alert Dialog</summary><div className="absolute left-0 top-full z-10 mt-2 min-w-56 rounded-[var(--radius-card)] border border-border bg-popover p-4 text-sm text-popover-foreground shadow-[var(--shadow-panel)]"><strong>Alert Dialog</strong><p className="mt-2 text-muted-foreground">A focused surface that keeps the current task clear.</p></div></details>
  )
}
