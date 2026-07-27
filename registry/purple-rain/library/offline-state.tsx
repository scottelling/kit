import * as React from "react"

import { cn } from "@/lib/utils"

export type OfflineStateProps = React.ComponentPropsWithoutRef<"section">

export function OfflineState({ children, className, ...props }: OfflineStateProps) {
  if (children !== undefined) {
    return (<section data-slot="offline-state" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</section>)
  }

  return (
    <section data-slot="offline-state" role="status" className={cn("grid justify-items-start gap-2", className)} {...props}><strong>You’re offline</strong><p className="text-sm text-muted-foreground">Work will sync when you reconnect.</p></section>
  )
}
