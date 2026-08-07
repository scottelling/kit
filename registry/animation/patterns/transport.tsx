"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TransportProps = React.ComponentPropsWithoutRef<"div"> & { time?: string; onPrevious?: () => void; onNext?: () => void }

export function Transport({ time = "00:00:86 / 00:02:72", onPrevious, onNext, className, ...props }: TransportProps) {
  const [playing, setPlaying] = React.useState(false)
  return <div data-slot="transport" className={cn("grid min-h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 border-y border-border bg-sidebar px-3", className)} {...props}><span className="font-mono text-[10px] text-muted-foreground">{time}</span><div className="flex items-center gap-1"><button type="button" onClick={onPrevious} className="size-11 rounded-[var(--radius-control)]" aria-label="Previous scene">‹</button><button type="button" aria-pressed={playing} onClick={() => setPlaying((value) => !value)} className="size-11 rounded-full bg-primary font-bold text-primary-foreground" aria-label={playing ? "Pause" : "Play"}>{playing ? "Ⅱ" : "▶"}</button><button type="button" onClick={onNext} className="size-11 rounded-[var(--radius-control)]" aria-label="Next scene">›</button></div><span className="justify-self-end font-mono text-[10px] text-muted-foreground">{playing ? "playing" : "ready"}</span></div>
}
