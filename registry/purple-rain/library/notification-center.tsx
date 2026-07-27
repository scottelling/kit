import * as React from "react"

import { cn } from "@/lib/utils"

export type NotificationCenterProps = React.ComponentPropsWithoutRef<"section">

export function NotificationCenter({ children, className, ...props }: NotificationCenterProps) {
  if (children !== undefined) {
    return (<section data-slot="notification-center" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</section>)
  }

  return (
    <section data-slot="notification-center" className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] grid gap-2 p-5", className)} {...props}><header className="flex justify-between gap-4"><strong>Notifications</strong><span className="text-xs text-primary">3 new</span></header>{["Mara approved the page", "Sam left a note", "Elena shared a file"].map((label) => <button key={label} type="button" className="min-h-11 border-t border-border text-left text-sm">{label}</button>)}</section>
  )
}
