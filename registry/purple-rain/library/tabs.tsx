"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TabsProps = React.ComponentPropsWithoutRef<"nav">

export function Tabs({ className, ...props }: TabsProps) {
  const [active, setActive] = React.useState("Overview")
  return (
    <nav data-slot="tabs" aria-label="Tabs" className={cn("flex flex-wrap gap-1", className)} {...props}>{["Overview", "Details", "Notes"].map((label) => <button key={label} type="button" onClick={() => setActive(label)} aria-current={active === label ? "page" : undefined} className="min-h-11 rounded-[var(--radius-control)] px-3 text-sm font-semibold aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground">{label}</button>)}</nav>
  )
}
