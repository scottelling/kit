import * as React from "react"

import { cn } from "@/lib/utils"

export type ProjectSwitcherProps = React.ComponentPropsWithoutRef<"details">

export function ProjectSwitcher({ children, className, ...props }: ProjectSwitcherProps) {
  return (
    <details data-slot="project-switcher" className={cn("relative w-full max-w-sm", className)} {...props}>
      {children ?? (<><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-[var(--radius-control)] border border-border bg-card px-3 text-sm font-bold">Launch sequence <span className="font-mono text-[10px] text-muted-foreground">Saved</span></summary><div className="absolute left-0 top-full z-20 mt-2 grid w-full gap-1 rounded-[var(--radius-card)] border border-border bg-popover p-2 shadow-[var(--shadow-panel)]"><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-secondary px-3 text-left text-sm font-bold">Launch sequence</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm text-muted-foreground">Product tour</button></div></>)}
    </details>
  )
}
