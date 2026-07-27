import * as React from "react"

import { cn } from "@/lib/utils"

function ApplicationShell({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="application-shell"
      className={cn(
        "grid min-h-96 grid-cols-1 overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--plane-1)] text-foreground shadow-[var(--shadow-panel)] md:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)_auto]",
        className,
      )}
      {...props}
    />
  )
}

function ApplicationSidebar({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="application-sidebar"
      className={cn("min-w-0 bg-[var(--plane-2)] p-3 md:row-span-3", className)}
      {...props}
    />
  )
}

function ApplicationHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="application-header"
      className={cn("flex min-h-14 min-w-0 items-center justify-between gap-3 px-4", className)}
      {...props}
    />
  )
}

function ApplicationMain({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="application-main"
      className={cn("min-h-0 min-w-0 overflow-auto rounded-[var(--radius-card)] bg-background p-4 text-foreground", className)}
      {...props}
    />
  )
}

function ApplicationStatus({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      data-slot="application-status"
      className={cn("flex min-h-11 min-w-0 items-center justify-between gap-3 px-4 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export { ApplicationHeader, ApplicationMain, ApplicationShell, ApplicationSidebar, ApplicationStatus }
