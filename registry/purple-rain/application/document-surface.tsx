import * as React from "react"

import { cn } from "@/lib/utils"

function DocumentSurface({ className, ...props }: React.ComponentProps<"article">) {
  return <article data-slot="document-surface" className={cn("mx-auto w-full max-w-[var(--kit-reading-measure,72ch)] rounded-[var(--radius-card)] bg-background p-5 text-foreground shadow-[var(--shadow-panel)] sm:p-8", className)} {...props} />
}

function DocumentHeader({ className, ...props }: React.ComponentProps<"header">) {
  return <header data-slot="document-header" className={cn("mb-8 grid gap-3 border-b border-border pb-6", className)} {...props} />
}

function DocumentBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="document-body" className={cn("grid gap-5 text-[var(--kit-body-size,1rem)] leading-[var(--kit-leading,1.6)]", className)} {...props} />
}

export { DocumentBody, DocumentHeader, DocumentSurface }
