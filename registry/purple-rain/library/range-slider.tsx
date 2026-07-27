import * as React from "react"

import { cn } from "@/lib/utils"

export type RangeSliderProps = React.ComponentPropsWithoutRef<"label">

export function RangeSlider({ children, className, ...props }: RangeSliderProps) {
  if (children !== undefined) {
    return (<label data-slot="range-slider" className={cn("grid min-w-0 gap-2", className)} {...props}>{children}</label>)
  }

  return (
    <label data-slot="range-slider" className={cn("grid gap-3 text-sm font-semibold", className)} {...props}>Range Slider<input type="range" min="0" max="100" defaultValue="64" className="h-11 w-full accent-primary" /><span className="font-normal text-muted-foreground">64 of 100</span></label>
  )
}
