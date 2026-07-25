import * as React from "react"

import { cn } from "@/lib/utils"

export type SpinnerProps = React.ComponentPropsWithoutRef<"div">

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div data-slot="spinner" role="status" aria-label="Loading" className={cn("flex min-h-20 items-center gap-3", className)} {...props}><span className="size-5 animate-pulse rounded-full bg-primary" /><span className="h-3 w-28 animate-pulse rounded-full bg-muted" /></div>
  )
}
