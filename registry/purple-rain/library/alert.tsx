import * as React from "react"

import { cn } from "@/lib/utils"

export type AlertProps = React.ComponentPropsWithoutRef<"div">

export function Alert({ children, className, ...props }: AlertProps) {
  if (children !== undefined) {
    return (<div data-slot="alert" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="alert" role="status" className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] flex min-h-16 items-center gap-3 p-4 text-sm", className)} {...props}><span className="size-3 shrink-0 rounded-full bg-primary" aria-hidden="true" /><div><strong>Alert</strong><p className="mt-1 text-muted-foreground">The current state is visible and ready to act on.</p></div></div>
  )
}
