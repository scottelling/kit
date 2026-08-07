import * as React from "react"

import { cn } from "@/lib/utils"

export type PreviewToolbarProps = React.ComponentPropsWithoutRef<"div">

export function PreviewToolbar({ children, className, ...props }: PreviewToolbarProps) {
  return (
    <div data-slot="preview-toolbar" className={cn("flex min-h-11 flex-wrap items-center justify-between gap-2 border-b border-border bg-sidebar px-2", className)} {...props}>
      {children ?? (<><div className="flex gap-1" role="group" aria-label="Preview mode"><button type="button" className="min-h-11 rounded-[var(--radius-control)] bg-secondary px-3 text-xs font-bold">Preview</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-xs text-muted-foreground">Code</button></div><div className="flex gap-1"><button type="button" className="size-11 rounded-[var(--radius-control)]" aria-label="Fit canvas">Fit</button><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 font-mono text-[10px]">100%</button></div></>)}
    </div>
  )
}
