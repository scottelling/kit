import * as React from "react"

import { cn } from "@/lib/utils"

export type SelectProps = React.ComponentPropsWithoutRef<"label">

export function Select({ children, className, ...props }: SelectProps) {
  if (children !== undefined) {
    return (<label data-slot="select" className={cn("grid min-w-0 gap-2", className)} {...props}>{children}</label>)
  }

  return (
    <label data-slot="select" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>Status<select className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-11 px-3 font-normal"><option>Ready</option><option>Waiting</option><option>Blocked</option></select></label>
  )
}
