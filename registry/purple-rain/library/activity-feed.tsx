import * as React from "react"

import { cn } from "@/lib/utils"

export type ActivityFeedProps = React.ComponentPropsWithoutRef<"ol">

export function ActivityFeed({ className, ...props }: ActivityFeedProps) {
  return (
    <ol data-slot="activity-feed" className={cn("grid gap-3", className)} {...props}>{["09:00 Review copy", "11:30 Approve page", "14:00 Share notes"].map((label) => <li key={label} className="flex min-h-11 items-center gap-3 text-sm"><span className="size-3 rounded-full bg-primary" /><span>{label}</span></li>)}</ol>
  )
}
