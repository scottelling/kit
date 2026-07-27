import * as React from "react"

import { cn } from "@/lib/utils"

export type ActionMenuProps = React.ComponentPropsWithoutRef<"details">

export function ActionMenu({ children, className, ...props }: ActionMenuProps) {
  if (children !== undefined) {
    return (<details data-slot="action-menu" className={cn("rounded-[var(--radius-card)] bg-popover text-popover-foreground shadow-[var(--shadow-panel)]", className)} {...props}>{children}</details>)
  }

  return (
    <details data-slot="action-menu" className={cn("relative inline-block", className)} {...props}><summary className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer list-none">Open Action Menu</summary><div className="absolute left-0 top-full z-10 mt-2 min-w-56 rounded-[var(--radius-card)] border border-border bg-popover p-4 text-sm text-popover-foreground shadow-[var(--shadow-panel)]"><strong>Action Menu</strong><p className="mt-2 text-muted-foreground">A focused surface that keeps the current task clear.</p></div></details>
  )
}
