import * as React from "react"

import { cn } from "@/lib/utils"

export type StudioShellProps = React.ComponentPropsWithoutRef<"section">

export function StudioShell({ children, className, ...props }: StudioShellProps) {
  return (
    <section data-slot="studio-shell" className={cn("grid min-h-[32rem] grid-cols-[14rem_minmax(20rem,1fr)_18rem] grid-rows-[3.625rem_1fr_9rem] overflow-hidden rounded-[var(--radius-sheet)] bg-background text-foreground max-[920px]:grid-cols-1 max-[920px]:grid-rows-[auto_minmax(24rem,1fr)_8rem]", className)} {...props}>
      {children ?? (<><header className="col-span-3 border-b border-border bg-sidebar p-3 max-[920px]:col-span-1">Studio header</header><aside className="border-r border-border bg-sidebar p-3 max-[920px]:hidden">Storyboard</aside><main className="min-w-0 bg-background p-3">Canvas</main><aside className="border-l border-border bg-sidebar p-3 max-[920px]:hidden">Inspector</aside><footer className="col-span-3 border-t border-border bg-sidebar p-3 max-[920px]:col-span-1">Timeline</footer></>)}
    </section>
  )
}
