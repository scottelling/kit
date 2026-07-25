import * as React from "react"

import { cn } from "@/lib/utils"

export type SurfaceProps = React.ComponentPropsWithoutRef<"div">

export function Surface({ className, ...props }: SurfaceProps) {
  return (
    <div data-slot="surface" className={cn("flex items-end gap-3", className)} {...props}><span className="grid size-20 place-items-center rounded-[var(--radius-control)] bg-plane-1">1</span><span className="grid size-20 -translate-y-2 place-items-center rounded-[var(--radius-control)] bg-plane-2">2</span><span className="grid size-20 -translate-y-4 place-items-center rounded-[var(--radius-control)] bg-plane-3">3</span></div>
  )
}
