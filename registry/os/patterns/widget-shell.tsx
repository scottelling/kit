import * as React from "react"

import { cn } from "@/lib/utils"

type WidgetShellProps = React.ComponentProps<"article"> & {
  title: string
  meta?: string
  action?: React.ReactNode
}

function WidgetShell({ title, meta, action, className, children, ...props }: WidgetShellProps) {
  return (
    <article data-slot="widget-shell" className={cn("grid min-h-40 min-w-0 content-start gap-3 overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-3 text-card-foreground", className)} {...props}>
      <header className="flex min-h-11 min-w-0 items-center gap-2">
        <div className="min-w-0 flex-1"><strong className="block truncate text-sm">{title}</strong>{meta ? <span className="block truncate text-xs text-muted-foreground">{meta}</span> : null}</div>
        {action}
      </header>
      <div className="min-h-0 min-w-0">{children}</div>
    </article>
  )
}

export { WidgetShell }
