import * as React from "react"

import { cn } from "@/lib/utils"

export type AvatarGroupProps = React.ComponentPropsWithoutRef<"div">

export function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return (
    <div data-slot="avatar-group" className={cn("flex -space-x-3", className)} {...props}>{["MR", "ST", "EO"].slice(0, 3).map((person) => <span key={person} className="grid size-12 place-items-center rounded-full border-2 border-background bg-primary text-sm font-bold text-primary-foreground">{person}</span>)}</div>
  )
}
