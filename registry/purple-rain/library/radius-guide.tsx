import * as React from "react"

import { cn } from "@/lib/utils"

export type RadiusGuideProps = React.ComponentPropsWithoutRef<"div">

export function RadiusGuide({ children, className, ...props }: RadiusGuideProps) {
  if (children !== undefined) {
    return (<div data-slot="radius-guide" className={cn("min-w-0", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="radius-guide" className={cn("flex flex-wrap gap-4", className)} {...props}><span className="size-16 rounded-[var(--radius-control)] bg-muted" /><span className="size-16 rounded-[var(--radius-card)] bg-muted" /><span className="size-16 rounded-[var(--radius-sheet)] bg-muted" /></div>
  )
}
