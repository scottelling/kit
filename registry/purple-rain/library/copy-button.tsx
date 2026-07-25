"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CopyButtonProps = React.ComponentPropsWithoutRef<"button">

export function CopyButton({ className, ...props }: CopyButtonProps) {
  const [pressed, setPressed] = React.useState(false)
  return (
    <button data-slot="copy-button" type="button" onClick={() => setPressed((value) => !value)} className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px", className)} {...props}>{pressed ? "Copied" : "Copy Button"}</button>
  )
}
