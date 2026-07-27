import * as React from "react"

import { cn } from "@/lib/utils"

function ViewerShell({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="viewer-shell" className={cn("flex min-h-72 min-w-0 flex-col overflow-hidden bg-[var(--plane-1)]", className)} {...props} />
}

function ViewerToolbar({ className, ...props }: React.ComponentProps<"header">) {
  return <header data-slot="viewer-toolbar" className={cn("flex min-h-11 min-w-0 items-center justify-between gap-2 px-3 text-sm", className)} {...props} />
}

function ViewerBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="viewer-body" className={cn("min-h-0 min-w-0 flex-1 overflow-auto rounded-[var(--radius-card)] bg-background p-4 shadow-[var(--shadow-panel)]", className)} {...props} />
}

export { ViewerBody, ViewerShell, ViewerToolbar }
