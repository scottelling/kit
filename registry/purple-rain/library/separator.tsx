import * as React from "react"

import { cn } from "@/lib/utils"

export type SeparatorProps = React.ComponentPropsWithoutRef<"div">

export function Separator({ children, className, ...props }: SeparatorProps) {
  if (children !== undefined) {
    return (<div data-slot="separator" className={cn("min-w-0", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="separator" className={cn("grid gap-4 text-sm text-muted-foreground", className)} {...props}><span>Before</span><hr className="border-border" /><span>After</span></div>
  )
}
