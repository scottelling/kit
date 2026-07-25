import * as React from "react"

import { cn } from "@/lib/utils"

export type TimeInputProps = React.ComponentPropsWithoutRef<"label">

export function TimeInput({ className, ...props }: TimeInputProps) {
  return (
    <label data-slot="time-input" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>Time Input<input type="time" defaultValue={undefined} placeholder="Type here" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-11 px-3 font-normal" /></label>
  )
}
