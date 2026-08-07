"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const presets = ["Rise", "Top", "Left", "Right", "Pop", "Fade", "Exit"]

export function MotionPresetPicker({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [active, setActive] = React.useState("Rise")
  return <div data-slot="motion-preset-picker" role="group" aria-label="Motion preset" className={cn("grid grid-cols-2 gap-1 sm:grid-cols-4", className)} {...props}>{presets.map((preset) => <button key={preset} type="button" aria-pressed={active === preset} onClick={() => setActive(preset)} className="min-h-11 rounded-[var(--radius-control)] border border-border px-3 text-xs font-bold aria-pressed:border-primary aria-pressed:bg-secondary">{preset}</button>)}</div>
}
