import * as React from "react"

import { cn } from "@/lib/utils"

export type GuidedTourProps = React.ComponentPropsWithoutRef<"section">

export function GuidedTour({ children, className, ...props }: GuidedTourProps) {
  return (
    <section data-slot="guided-tour" className={cn("grid max-w-sm gap-3 rounded-[var(--radius-card)] border-2 border-primary bg-popover p-4 shadow-[var(--shadow-panel)]", className)} {...props}>
      {children ?? (<><span className="font-mono text-[10px] text-primary">2 of 5</span><strong>Shape the current scene here.</strong><p className="m-0 text-sm text-muted-foreground">The inspector follows the selected scene or layer, so the object you are changing stays obvious.</p><div className="flex gap-2"><button type="button" className="min-h-11 rounded-[var(--radius-control)] border border-border px-3 text-sm font-bold">Dismiss</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-primary px-3 text-sm font-bold text-primary-foreground">Next</button></div></>)}
    </section>
  )
}
