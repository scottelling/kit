import * as React from "react"

import { cn } from "@/lib/utils"

export type FocusRingProps = React.ComponentPropsWithoutRef<"div">

export function FocusRing({ className, ...props }: FocusRingProps) {
  return (
    <div data-slot="focus-ring" className={cn("grid place-items-center", className)} {...props}><button type="button" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Press Tab to find me</button></div>
  )
}
