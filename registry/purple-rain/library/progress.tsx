import * as React from "react"

import { cn } from "@/lib/utils"

export type ProgressProps = React.ComponentPropsWithoutRef<"label">

export function Progress({ children, className, ...props }: ProgressProps) {
  if (children !== undefined) {
    return (<label data-slot="progress" className={cn("grid min-w-0 gap-2", className)} {...props}>{children}</label>)
  }

  return (
    <label data-slot="progress" className={cn("grid gap-3 text-sm font-semibold", className)} {...props}>Progress<input type="range" min="0" max="100" defaultValue="64" className="h-11 w-full accent-primary" /><span className="font-normal text-muted-foreground">64 of 100</span></label>
  )
}
