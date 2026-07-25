import * as React from "react"

import { cn } from "@/lib/utils"

export type CarouselProps = React.ComponentPropsWithoutRef<"section">

export function Carousel({ className, ...props }: CarouselProps) {
  return (
    <section data-slot="carousel" className={cn("grid grid-cols-[auto_1fr_auto] items-stretch gap-2", className)} {...props}><button className="w-11 rounded-[var(--radius-control)] bg-muted" type="button">‹</button><div className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] grid min-h-28 place-items-center p-4"><strong>First idea</strong></div><button className="w-11 rounded-[var(--radius-control)] bg-muted" type="button">›</button></section>
  )
}
