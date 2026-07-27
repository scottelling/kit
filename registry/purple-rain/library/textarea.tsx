import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.ComponentPropsWithoutRef<"label">

export function Textarea({ children, className, ...props }: TextareaProps) {
  if (children !== undefined) {
    return (<label data-slot="textarea" className={cn("grid min-w-0 gap-2", className)} {...props}>{children}</label>)
  }

  return (
    <label data-slot="textarea" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>Message<textarea className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-28 resize-y px-3 py-3 font-normal" defaultValue="A clear next step." /></label>
  )
}
