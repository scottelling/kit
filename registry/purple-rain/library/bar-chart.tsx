import * as React from "react"

import { cn } from "@/lib/utils"

export type BarChartProps = React.ComponentPropsWithoutRef<"figure">

export function BarChart({ children, className, ...props }: BarChartProps) {
  if (children !== undefined) {
    return (<figure data-slot="bar-chart" className={cn("min-w-0", className)} {...props}>{children}</figure>)
  }

  return (
    <figure data-slot="bar-chart" className={cn("flex h-40 items-end justify-center gap-3", className)} {...props}>{["h-1/3", "h-3/4", "h-1/2", "h-full"].map((height) => <span key={height} className={cn("w-10 rounded-t-[var(--radius-control)] bg-primary", height)} />)}<figcaption className="sr-only">Bar Chart</figcaption></figure>
  )
}
