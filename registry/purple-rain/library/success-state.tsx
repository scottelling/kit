import * as React from "react"

import { cn } from "@/lib/utils"

export type SuccessStateProps = React.ComponentPropsWithoutRef<"section">

export function SuccessState({ className, ...props }: SuccessStateProps) {
  return (
    <section data-slot="success-state" role="status" className={cn("grid justify-items-start gap-2", className)} {...props}><strong>Changes saved</strong><p className="text-sm text-muted-foreground">Everything is up to date.</p></section>
  )
}
