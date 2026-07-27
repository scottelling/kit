import * as React from "react"

import { cn } from "@/lib/utils"

export type ContainerProps = React.ComponentPropsWithoutRef<"div">

export function Container({ children, className, ...props }: ContainerProps) {
  if (children !== undefined) {
    return (<div data-slot="container" className={cn("min-w-0", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="container" className={cn("border border-dashed border-border p-4", className)} {...props}><div className="min-h-20 rounded-[var(--radius-control)] bg-muted" /></div>
  )
}
