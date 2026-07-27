"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type FilterTabsProps = React.ComponentPropsWithoutRef<"nav">

export function FilterTabs({ children, className, ...props }: FilterTabsProps) {
  const [active, setActive] = React.useState("Overview")
  if (children !== undefined) {
    return (<nav data-slot="filter-tabs" className={cn("flex min-w-0 flex-wrap items-center gap-2", className)} {...props}>{children}</nav>)
  }

  return (
    <nav data-slot="filter-tabs" aria-label="Filter Tabs" className={cn("flex flex-wrap gap-1", className)} {...props}>{["Overview", "Details", "Notes"].map((label) => <button key={label} type="button" onClick={() => setActive(label)} aria-current={active === label ? "page" : undefined} className="min-h-11 rounded-[var(--radius-control)] px-3 text-sm font-semibold aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground">{label}</button>)}</nav>
  )
}
