import * as React from "react"

import { cn } from "@/lib/utils"

export type RenderStatusProps = React.ComponentPropsWithoutRef<"div"> & { value?: number; state?: "queued" | "rendering" | "complete" | "failed" }

export function RenderStatus({ value = 48, state = "rendering", className, ...props }: RenderStatusProps) {
  return <div data-slot="render-status" role="status" className={cn("grid gap-2 rounded-[var(--radius-card)] border border-border bg-card p-4", className)} {...props}><div className="flex justify-between gap-3 text-sm"><strong className="capitalize">{state}</strong><span className="font-mono text-xs text-muted-foreground">{value}%</span></div><progress max="100" value={value} className="h-2 w-full accent-primary" /><p className="m-0 text-xs text-muted-foreground">Preview and final output use the same scene timing.</p></div>
}
