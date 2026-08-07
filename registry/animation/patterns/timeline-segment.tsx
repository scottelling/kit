import * as React from "react"

import { cn } from "@/lib/utils"

export type TimelineSegmentProps = React.ComponentPropsWithoutRef<"button"> & { label?: string; duration?: string; active?: boolean }

export function TimelineSegment({ label = "Reveal", duration = "1.2s", active = false, className, ...props }: TimelineSegmentProps) {
  return <button data-slot="timeline-segment" type="button" aria-pressed={active} className={cn("flex min-h-11 min-w-32 items-center justify-between gap-3 border border-border bg-card px-3 text-left text-xs aria-pressed:border-primary aria-pressed:bg-secondary", className)} {...props}><strong>{label}</strong><span className="font-mono text-[10px] text-muted-foreground">{duration}</span></button>
}
