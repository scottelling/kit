import * as React from "react"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentPropsWithoutRef<"section">

export function Calendar({ children, className, ...props }: CalendarProps) {
  if (children !== undefined) {
    return (<section data-slot="calendar" className={cn("min-w-0", className)} {...props}>{children}</section>)
  }

  return (
    <section data-slot="calendar" className={cn("grid gap-3", className)} {...props}><header className="flex items-center justify-between"><button className="size-11" type="button">‹</button><strong>July</strong><button className="size-11" type="button">›</button></header><div className="grid grid-cols-4">{[20,21,22,23,24,25,26,27].map((day) => <button key={day} type="button" className="size-11 rounded-[var(--radius-control)] hover:bg-muted">{day}</button>)}</div></section>
  )
}
