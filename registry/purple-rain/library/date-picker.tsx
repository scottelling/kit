import * as React from "react"

import { cn } from "@/lib/utils"

export type DatePickerProps = React.ComponentPropsWithoutRef<"label">

export function DatePicker({ className, ...props }: DatePickerProps) {
  return (
    <label data-slot="date-picker" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>Date Picker<input type="date" defaultValue={undefined} placeholder="Type here" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-11 px-3 font-normal" /></label>
  )
}
