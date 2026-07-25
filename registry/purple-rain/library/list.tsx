import * as React from "react"

import { cn } from "@/lib/utils"

export type ListProps = React.ComponentPropsWithoutRef<"ul">

export function List({ className, ...props }: ListProps) {
  return (
    <ul data-slot="list" className={cn("divide-y divide-border", className)} {...props}>{["Approve the release", "Check the notes", "Invite reviewers"].slice(0, 3).map((label) => <li key={label} className="flex min-h-11 items-center justify-between gap-3 text-sm"><span>{label}</span><span aria-hidden="true">→</span></li>)}</ul>
  )
}
