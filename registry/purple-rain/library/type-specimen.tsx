import * as React from "react"

import { cn } from "@/lib/utils"

export type TypeSpecimenProps = React.ComponentPropsWithoutRef<"div">

export function TypeSpecimen({ children, className, ...props }: TypeSpecimenProps) {
  if (children !== undefined) {
    return (<div data-slot="type-specimen" className={cn("min-w-0", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="type-specimen" className={cn("grid gap-2", className)} {...props}><strong className="text-6xl font-bold tracking-[-0.06em]">Aa</strong><span className="text-sm text-muted-foreground">Clear first. Beautiful second.</span></div>
  )
}
