"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CopyButtonProps = React.ComponentPropsWithoutRef<"button">

export function CopyButton({ children, className, ...props }: CopyButtonProps) {
  const [pressed, setPressed] = React.useState(false)
  if (children !== undefined) {
    return (<button type="button" data-slot="copy-button" className={cn("inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props}>{children}</button>)
  }

  return (
    <button data-slot="copy-button" type="button" onClick={() => setPressed((value) => !value)} className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px", className)} {...props}>{pressed ? "Copied" : "Copy Button"}</button>
  )
}
