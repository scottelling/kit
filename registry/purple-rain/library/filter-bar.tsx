import * as React from "react"

import { cn } from "@/lib/utils"

export type FilterBarProps = React.ComponentPropsWithoutRef<"section">

export function FilterBar({ children, className, ...props }: FilterBarProps) {
  if (children !== undefined) {
    return (<section data-slot="filter-bar" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</section>)
  }

  return (
    <section data-slot="filter-bar" className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] grid gap-3 p-5", className)} {...props}><label className="grid gap-2 text-sm font-semibold">Find items<input type="search" placeholder="Search" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-11 px-3 font-normal" /></label>{["Button", "Card", "Dialog"].map((label) => <button key={label} type="button" className="flex min-h-11 items-center justify-between border-t border-border text-left text-sm"><span>{label}</span><b>Open</b></button>)}</section>
  )
}
