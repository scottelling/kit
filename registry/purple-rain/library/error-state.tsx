import * as React from "react"

import { cn } from "@/lib/utils"

export type ErrorStateProps = React.ComponentPropsWithoutRef<"section">

export function ErrorState({ className, ...props }: ErrorStateProps) {
  return (
    <section data-slot="error-state" role="status" className={cn("grid justify-items-start gap-2", className)} {...props}><strong>Couldn’t save</strong><p className="text-sm text-muted-foreground">Try again when you’re ready.</p></section>
  )
}
