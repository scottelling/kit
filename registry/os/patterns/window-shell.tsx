import * as React from "react"

import { cn } from "@/lib/utils"

function WindowShell({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="window-shell" className={cn("grid min-h-80 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[var(--radius-sheet)] border border-border bg-card text-card-foreground shadow-[var(--shadow-panel)]", className)} {...props} />
}

function WindowTitleBar({ title, children, className, ...props }: React.ComponentProps<"header"> & { title: string }) {
  return (
    <header data-slot="window-title-bar" className={cn("grid min-h-11 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 border-b border-border bg-[var(--plane-2)] px-2", className)} {...props}>
      <span aria-hidden="true" />
      <strong className="truncate text-sm">{title}</strong>
      <div className="flex min-w-0 justify-end gap-2">{children}</div>
    </header>
  )
}

function WindowContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="window-content" className={cn("min-h-0 min-w-0 overflow-auto p-4", className)} {...props} />
}

function WindowStatus({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer data-slot="window-status" className={cn("flex min-h-11 items-center justify-between gap-3 border-t border-border px-3 text-xs text-muted-foreground", className)} {...props} />
}

export { WindowContent, WindowShell, WindowStatus, WindowTitleBar }
