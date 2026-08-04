"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type MenuBarProps = React.ComponentProps<"nav"> & {
  current?: string
  items?: string[]
  status?: React.ReactNode
  onItemSelect?: (item: string) => void
}

function MenuBar({ current = "Workspace", items = ["File", "Edit", "View"], status, onItemSelect, className, ...props }: MenuBarProps) {
  const [active, setActive] = React.useState("")

  function select(item: string) {
    setActive(item)
    onItemSelect?.(item)
  }

  return (
    <nav data-slot="menu-bar" aria-label="Application menu" className={cn("flex min-h-11 min-w-0 items-center gap-2 border-b border-border bg-[var(--plane-2)] px-2 text-sm", className)} {...props}>
      <strong className="min-h-11 shrink-0 content-center px-2">{current}</strong>
      <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
        {items.map((item) => <button key={item} type="button" aria-pressed={active === item} onClick={() => select(item)} className="min-h-11 shrink-0 rounded-[var(--radius-control)] px-3 text-muted-foreground hover:bg-muted hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item}</button>)}
      </div>
      <span aria-live="polite" className="ml-auto hidden shrink-0 text-xs text-muted-foreground sm:block">{status ?? (active ? `${active} selected` : "All changes saved")}</span>
    </nav>
  )
}

export { MenuBar }
