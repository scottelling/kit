import * as React from "react"

import { cn } from "@/lib/utils"

export type StyleInspectorProps = React.ComponentPropsWithoutRef<"fieldset">

export function StyleInspector({ children, className, ...props }: StyleInspectorProps) {
  return (
    <fieldset data-slot="style-inspector" className={cn("grid grid-cols-2 gap-3 border-0 p-0", className)} {...props}>
      {children ?? (<><legend className="col-span-2 mb-2 text-xs font-bold uppercase tracking-[0.08em]">Style</legend>{[["X", "120"], ["Y", "88"], ["Width", "420"], ["Scale", "100"]].map(([label, value]) => <label key={label} className="grid gap-1 text-xs font-bold text-muted-foreground">{label}<input type="number" defaultValue={value} className="min-h-11 min-w-0 rounded-[var(--radius-control)] border border-border bg-input px-3 font-mono text-xs text-foreground" /></label>)}</>)}
    </fieldset>
  )
}
