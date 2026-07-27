import * as React from "react"

import { cn } from "@/lib/utils"

function StatusBar({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer data-slot="status-bar" role="status" className={cn("flex min-h-11 min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-[var(--plane-1)] px-3 text-xs text-muted-foreground", className)} {...props} />
}

function StatusItem({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="status-item" className={cn("inline-flex min-h-11 items-center gap-2", className)} {...props} />
}

export { StatusBar, StatusItem }
