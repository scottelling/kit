import * as React from "react"

import { cn } from "@/lib/utils"

export type SceneListItemProps = Omit<React.ComponentPropsWithoutRef<"button">, "name"> & { name?: string; summary?: string; duration?: string; index?: number; active?: boolean }

export function SceneListItem({ name = "Reveal", summary = "Bring the next idea into focus.", duration = "1.2s", index = 2, active = false, className, ...props }: SceneListItemProps) {
  return <button data-slot="scene-list-item" type="button" aria-current={active ? "true" : undefined} className={cn("grid min-h-20 w-full grid-cols-[3.5rem_1fr_auto] items-center gap-3 rounded-[var(--radius-control)] border border-transparent px-2 text-left aria-[current=true]:border-primary aria-[current=true]:bg-secondary", className)} {...props}><span className="h-10 rounded-md bg-plane-pressed" aria-hidden="true" /><span className="min-w-0"><strong className="block truncate text-sm">{name}</strong><span className="mt-1 block truncate text-xs text-muted-foreground">{summary}</span></span><span className="grid gap-1 text-right font-mono text-[10px] text-muted-foreground"><b className="font-normal">{duration}</b><b className="font-normal">{String(index).padStart(2, "0")}</b></span></button>
}
