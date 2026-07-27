import * as React from "react"

import { cn } from "@/lib/utils"

export type CollapsibleProps = React.ComponentPropsWithoutRef<"details">

export function Collapsible({ children, className, ...props }: CollapsibleProps) {
  if (children !== undefined) {
    return (<details data-slot="collapsible" className={cn("min-w-0", className)} {...props}>{children}</details>)
  }

  return (
    <details data-slot="collapsible" className={cn("border-b border-border py-2", className)} open {...props}><summary className="min-h-11 cursor-pointer py-3 font-semibold">Collapsible</summary><p className="pb-3 text-sm text-muted-foreground">The useful detail appears exactly where it is needed.</p></details>
  )
}
