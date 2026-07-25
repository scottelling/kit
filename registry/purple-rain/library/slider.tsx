import * as React from "react"

import { cn } from "@/lib/utils"

export type SliderProps = React.ComponentPropsWithoutRef<"label">

export function Slider({ className, ...props }: SliderProps) {
  return (
    <label data-slot="slider" className={cn("grid gap-3 text-sm font-semibold", className)} {...props}>Slider<input type="range" min="0" max="100" defaultValue="64" className="h-11 w-full accent-primary" /><span className="font-normal text-muted-foreground">64 of 100</span></label>
  )
}
