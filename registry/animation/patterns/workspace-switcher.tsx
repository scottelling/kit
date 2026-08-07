"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const views = ["Story", "Preview", "Code", "Inspect"] as const

export type WorkspaceSwitcherProps = Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> & { value?: typeof views[number]; onChange?: (value: typeof views[number]) => void }

export function WorkspaceSwitcher({ value, onChange, className, ...props }: WorkspaceSwitcherProps) {
  const [local, setLocal] = React.useState<typeof views[number]>(value ?? "Preview")
  const active = value ?? local
  return <nav data-slot="workspace-switcher" aria-label="Workspace view" className={cn("grid grid-cols-4 gap-1 border-b border-border bg-sidebar p-1", className)} {...props}>{views.map((view) => <button key={view} type="button" aria-current={active === view ? "page" : undefined} onClick={() => { setLocal(view); onChange?.(view) }} className="min-h-11 rounded-[var(--radius-control)] px-2 text-xs font-bold text-muted-foreground aria-[current=page]:bg-secondary aria-[current=page]:text-foreground">{view}</button>)}</nav>
}
