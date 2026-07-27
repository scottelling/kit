import * as React from "react"

import { cn } from "@/lib/utils"

export type TimelineProps = React.ComponentPropsWithoutRef<"ol">

export function Timeline({ children, className, ...props }: TimelineProps) {
  if (children !== undefined) {
    return (<ol data-slot="timeline" className={cn("min-w-0", className)} {...props}>{children}</ol>)
  }

  return (
    <ol data-slot="timeline" className={cn("grid gap-3", className)} {...props}>{["09:00 Review copy", "11:30 Approve page", "14:00 Share notes"].map((label) => <li key={label} className="flex min-h-11 items-center gap-3 text-sm"><span className="size-3 rounded-full bg-primary" /><span>{label}</span></li>)}</ol>
  )
}
