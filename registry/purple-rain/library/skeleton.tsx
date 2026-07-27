import * as React from "react"

import { cn } from "@/lib/utils"

export type SkeletonProps = React.ComponentPropsWithoutRef<"div">

export function Skeleton({ children, className, ...props }: SkeletonProps) {
  if (children !== undefined) {
    return (<div data-slot="skeleton" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="skeleton" role="status" aria-label="Loading" className={cn("flex min-h-20 items-center gap-3", className)} {...props}><span className="size-5 animate-pulse rounded-full bg-primary" /><span className="h-3 w-28 animate-pulse rounded-full bg-muted" /></div>
  )
}
