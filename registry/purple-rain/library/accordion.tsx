import * as React from "react"

import { cn } from "@/lib/utils"

export type AccordionProps = React.ComponentPropsWithoutRef<"details">

export function Accordion({ children, className, ...props }: AccordionProps) {
  if (children !== undefined) {
    return (<details data-slot="accordion" className={cn("min-w-0", className)} {...props}>{children}</details>)
  }

  return (
    <details data-slot="accordion" className={cn("border-b border-border py-2", className)} open {...props}><summary className="min-h-11 cursor-pointer py-3 font-semibold">Accordion</summary><p className="pb-3 text-sm text-muted-foreground">The useful detail appears exactly where it is needed.</p></details>
  )
}
