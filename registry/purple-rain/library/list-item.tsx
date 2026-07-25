import * as React from "react"

import { cn } from "@/lib/utils"

export type ListItemProps = React.ComponentPropsWithoutRef<"ul">

export function ListItem({ className, ...props }: ListItemProps) {
  return (
    <ul data-slot="list-item" className={cn("divide-y divide-border", className)} {...props}>{["Approve the release", "Check the notes", "Invite reviewers"].slice(0, 1).map((label) => <li key={label} className="flex min-h-11 items-center justify-between gap-3 text-sm"><span>{label}</span><span aria-hidden="true">→</span></li>)}</ul>
  )
}
