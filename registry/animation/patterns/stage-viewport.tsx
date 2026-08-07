import * as React from "react"

import { cn } from "@/lib/utils"

export type StageViewportProps = React.ComponentPropsWithoutRef<"section">

export function StageViewport({ children, className, ...props }: StageViewportProps) {
  return (
    <section data-slot="stage-viewport" className={cn("grid min-h-72 place-items-center overflow-hidden rounded-[var(--radius-card)] border border-border bg-background p-4", className)} {...props}>
      {children ?? (<div className="grid aspect-video w-full max-w-xl place-items-center rounded-[var(--radius-card)] border border-border bg-plane-pressed"><div className="grid max-w-md grid-cols-2 gap-8 px-8"><strong className="text-2xl leading-tight">Make the next idea visible.</strong><p className="m-0 text-sm text-muted-foreground">The canvas stays in front while every supporting control remains quiet.</p></div></div>)}
    </section>
  )
}
