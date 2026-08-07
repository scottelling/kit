import * as React from "react"

import { cn } from "@/lib/utils"

export type PlayheadProps = React.ComponentPropsWithoutRef<"label">

export function Playhead({ children, className, ...props }: PlayheadProps) {
  return (
    <label data-slot="playhead" className={cn("grid gap-2 text-xs font-bold", className)} {...props}>
      {children ?? (<>Current time · <output>0.86s</output><input aria-label="Current time" type="range" min="0" max="272" defaultValue="86" className="min-h-11 w-full accent-primary" /></>)}
    </label>
  )
}
