import * as React from "react"

import { cn } from "@/lib/utils"

export type StudioHeaderProps = React.ComponentPropsWithoutRef<"header">

export function StudioHeader({ children, className, ...props }: StudioHeaderProps) {
  return (
    <header data-slot="studio-header" className={cn("flex min-h-14 flex-wrap items-center justify-between gap-2 border-b border-border bg-sidebar px-3 text-sm", className)} {...props}>
      {children ?? (<><div className="flex min-w-0 items-center gap-2"><span className="grid size-11 place-items-center rounded-[var(--radius-control)] bg-primary font-extrabold text-primary-foreground">A</span><div className="min-w-0"><strong className="block">Animation</strong><span className="block truncate font-mono text-[10px] text-muted-foreground">Launch sequence</span></div></div><nav className="flex gap-1" aria-label="Studio modes"><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-primary px-3 font-bold text-primary-foreground">Design</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-muted-foreground">Motion</button></nav><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground">New</button></>)}
    </header>
  )
}
