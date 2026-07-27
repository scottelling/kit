import * as React from "react"

import { cn } from "@/lib/utils"

export type StackProps = React.ComponentPropsWithoutRef<"div">

export function Stack({ children, className, ...props }: StackProps) {
  if (children !== undefined) {
    return (<div data-slot="stack" className={cn("min-w-0", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="stack" className={cn("grid gap-3", className)} {...props}>{[1,2,3].map((row) => <span key={row} className="h-10 rounded-[var(--radius-control)] bg-muted" />)}</div>
  )
}
