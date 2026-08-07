import * as React from "react"

import { cn } from "@/lib/utils"

export type MotionCheckProps = React.ComponentPropsWithoutRef<"ul">

export function MotionCheck({ children, className, ...props }: MotionCheckProps) {
  return (
    <ul data-slot="motion-check" className={cn("grid gap-1", className)} {...props}>
      {children ?? ([["Purpose", "Pass"], ["Easing", "Pass"], ["Duration", "Pass"], ["Reduced motion", "Pass"]].map(([check, result]) => <li key={check} className="flex min-h-11 items-center justify-between gap-3 border-b border-border text-sm"><span>{check}</span><strong className="text-positive">{result}</strong></li>))}
    </ul>
  )
}
