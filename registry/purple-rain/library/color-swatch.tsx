import * as React from "react"

import { cn } from "@/lib/utils"

export type ColorSwatchProps = React.ComponentPropsWithoutRef<"div">

export function ColorSwatch({ children, className, ...props }: ColorSwatchProps) {
  if (children !== undefined) {
    return (<div data-slot="color-swatch" className={cn("min-w-0", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="color-swatch" className={cn("grid grid-cols-5 gap-2", className)} {...props}>{["bg-background", "bg-card", "bg-primary", "bg-positive", "bg-destructive"].map((tone) => <span key={tone} className={cn("min-h-20 rounded-[var(--radius-control)]", tone)} />)}</div>
  )
}
