import * as React from "react"

import { cn } from "@/lib/utils"

export type SplitButtonProps = React.ComponentPropsWithoutRef<"details">

export function SplitButton({ children, className, ...props }: SplitButtonProps) {
  if (children !== undefined) {
    return (<details data-slot="split-button" className={cn("inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props}>{children}</details>)
  }

  return (
    <details data-slot="split-button" className={cn("relative inline-block", className)} {...props}><summary className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background flex cursor-pointer list-none items-center gap-2">Split Button<span aria-hidden="true">⌄</span></summary><div className="absolute left-0 top-full z-10 mt-2 grid min-w-40 gap-1 rounded-[var(--radius-card)] border border-border bg-popover p-2 text-popover-foreground shadow-[var(--shadow-panel)]"><button className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm hover:bg-muted">Open</button><button className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm hover:bg-muted">Duplicate</button></div></details>
  )
}
