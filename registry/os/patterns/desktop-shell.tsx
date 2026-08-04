import * as React from "react"

import { cn } from "@/lib/utils"

function DesktopShell({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="desktop-shell"
      className={cn("relative grid min-h-[32rem] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[var(--radius-sheet)] border border-border bg-background text-foreground shadow-[var(--shadow-panel)]", className)}
      {...props}
    />
  )
}

function DesktopMenuArea({ className, ...props }: React.ComponentProps<"header">) {
  return <header data-slot="desktop-menu-area" className={cn("flex min-h-11 items-center justify-between gap-3 border-b border-border bg-[var(--plane-2)] px-3", className)} {...props} />
}

function DesktopWorkspace({ className, ...props }: React.ComponentProps<"main">) {
  return <main data-slot="desktop-workspace" className={cn("relative min-h-0 overflow-auto bg-[var(--plane-1)] p-4", className)} {...props} />
}

function DesktopDockArea({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer data-slot="desktop-dock-area" className={cn("flex min-h-16 items-center justify-center border-t border-border bg-[var(--plane-2)] px-3", className)} {...props} />
}

export { DesktopDockArea, DesktopMenuArea, DesktopShell, DesktopWorkspace }
