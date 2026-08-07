import * as React from "react"

import { cn } from "@/lib/utils"

export type StoryboardRailProps = React.ComponentPropsWithoutRef<"aside">

export function StoryboardRail({ children, className, ...props }: StoryboardRailProps) {
  return (
    <aside data-slot="storyboard-rail" className={cn("flex min-h-72 w-full max-w-xs flex-col bg-sidebar", className)} {...props}>
      {children ?? (<><header className="flex min-h-11 items-center justify-between border-b border-border px-3"><strong className="text-xs uppercase tracking-[0.08em]">Storyboard</strong><span className="font-mono text-[10px] text-muted-foreground">3 scenes</span></header><div className="grid flex-1 content-start gap-1 overflow-y-auto p-2">{["Set", "Reveal", "Emphasize"].map((scene, index) => <button key={scene} type="button" aria-current={index === 1 ? "true" : undefined} className="grid min-h-16 grid-cols-[3rem_1fr_auto] items-center gap-2 rounded-[var(--radius-control)] px-2 text-left aria-[current=true]:bg-secondary"><span className="h-9 rounded-md bg-plane-pressed" /><strong className="text-sm">{scene}</strong><small className="font-mono text-[10px] text-muted-foreground">0{index + 1}</small></button>)}</div><button type="button" className="m-2 min-h-11 rounded-[var(--radius-control)] border border-border text-sm font-bold">Add scene</button></>)}
    </aside>
  )
}
