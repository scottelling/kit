import * as React from "react"

import { cn } from "@/lib/utils"

export type MotionInspectorProps = React.ComponentPropsWithoutRef<"fieldset">

export function MotionInspector({ children, className, ...props }: MotionInspectorProps) {
  return (
    <fieldset data-slot="motion-inspector" className={cn("grid gap-3 border-0 p-0", className)} {...props}>
      {children ?? (<><legend className="mb-2 text-xs font-bold uppercase tracking-[0.08em]">Motion</legend><label className="grid gap-1 text-xs font-bold text-muted-foreground">Purpose<select defaultValue="explanation" className="min-h-11 rounded-[var(--radius-control)] border border-border bg-input px-3 text-sm text-foreground"><option value="explanation">Explanation</option><option value="focus">Focus</option><option value="continuity">Continuity</option><option value="feedback">Feedback</option><option value="delight">Delight</option></select></label><label className="grid gap-1 text-xs font-bold text-muted-foreground">Easing<select defaultValue="easeOut" className="min-h-11 rounded-[var(--radius-control)] border border-border bg-input px-3 text-sm text-foreground"><option>easeOut</option><option>easeInOut</option><option>linear</option><option>spring</option></select></label><label className="grid gap-1 text-xs font-bold text-muted-foreground">Transition · 420ms<input type="range" min="120" max="1800" defaultValue="420" className="min-h-11 accent-primary" /></label></>)}
    </fieldset>
  )
}
