import * as React from "react"

import { cn } from "@/lib/utils"

export type StackProps = React.ComponentPropsWithoutRef<"div">

export function Stack({ className, ...props }: StackProps) {
  return (
    <div data-slot="stack" className={cn("grid gap-3", className)} {...props}>{[1,2,3].map((row) => <span key={row} className="h-10 rounded-[var(--radius-control)] bg-muted" />)}</div>
  )
}
