import * as React from "react"

import { cn } from "@/lib/utils"

function SplitView({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="split-view" className={cn("grid min-h-80 min-w-0 overflow-hidden rounded-[var(--radius-sheet)] border border-border bg-background md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.3fr)] xl:grid-cols-[minmax(12rem,0.65fr)_minmax(0,1.35fr)_minmax(14rem,0.75fr)]", className)} {...props} />
}

function SplitNavigation({ className, ...props }: React.ComponentProps<"aside">) {
  return <aside data-slot="split-navigation" className={cn("min-w-0 border-b border-border bg-[var(--plane-2)] p-3 md:border-b-0 md:border-r", className)} {...props} />
}

function SplitPrimary({ className, ...props }: React.ComponentProps<"main">) {
  return <main data-slot="split-primary" className={cn("min-h-0 min-w-0 overflow-auto p-4", className)} {...props} />
}

function SplitInspector({ className, ...props }: React.ComponentProps<"aside">) {
  return <aside data-slot="split-inspector" className={cn("min-w-0 border-t border-border bg-[var(--plane-3)] p-3 xl:border-l xl:border-t-0", className)} {...props} />
}

export { SplitInspector, SplitNavigation, SplitPrimary, SplitView }
