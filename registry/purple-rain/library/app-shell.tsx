import * as React from "react"

import { cn } from "@/lib/utils"

export type AppShellProps = React.ComponentPropsWithoutRef<"section">

export function AppShell({ children, className, ...props }: AppShellProps) {
  if (children !== undefined) {
    return (<section data-slot="app-shell" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</section>)
  }

  return (
    <section data-slot="app-shell" className={cn("grid min-h-56 grid-cols-[4rem_1fr] grid-rows-[3rem_1fr] overflow-hidden rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-panel)]", className)} {...props}><aside className="row-span-2 grid place-items-start justify-center bg-primary pt-4 font-bold text-primary-foreground">PR</aside><header className="flex items-center border-b border-border px-4 text-sm font-bold">Release</header><main className="grid content-center gap-2 p-5"><strong>Today</strong><span className="text-sm text-muted-foreground">Three things need you.</span></main></section>
  )
}
