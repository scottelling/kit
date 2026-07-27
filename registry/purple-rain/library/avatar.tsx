import * as React from "react"

import { cn } from "@/lib/utils"

export type AvatarProps = React.ComponentPropsWithoutRef<"div">

export function Avatar({ children, className, ...props }: AvatarProps) {
  if (children !== undefined) {
    return (<div data-slot="avatar" className={cn("min-w-0", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="avatar" className={cn("flex -space-x-3", className)} {...props}>{["MR", "ST", "EO"].slice(0, 1).map((person) => <span key={person} className="grid size-12 place-items-center rounded-full border-2 border-background bg-primary text-sm font-bold text-primary-foreground">{person}</span>)}</div>
  )
}
