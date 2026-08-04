"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type DockItem = { id: string; label: string; shortLabel?: string }

type DockProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  items?: DockItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const defaultItems: DockItem[] = [
  { id: "home", label: "Home", shortLabel: "H" },
  { id: "work", label: "Work", shortLabel: "W" },
  { id: "search", label: "Search", shortLabel: "S" },
]

function Dock({ items = defaultItems, value, defaultValue = items[0]?.id ?? "", onValueChange, className, ...props }: DockProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const selected = value ?? internal

  function select(next: string) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  return (
    <nav data-slot="dock" aria-label="Applications" className={cn("flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-[var(--radius-card)] border border-border bg-card p-2 shadow-[var(--shadow-panel)]", className)} {...props}>
      {items.map((item) => (
        <button key={item.id} type="button" aria-current={selected === item.id ? "page" : undefined} onClick={() => select(item.id)} className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-control)] border border-border bg-secondary text-sm font-bold text-secondary-foreground transition-[background-color,color,transform] duration-[var(--dur-micro)] ease-[var(--ease-standard)] hover:bg-muted active:translate-y-px aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={item.label}>
          {item.shortLabel ?? item.label.slice(0, 1)}
        </button>
      ))}
    </nav>
  )
}

export { Dock }
