import * as React from "react"

import { cn } from "@/lib/utils"

export type PasswordInputProps = React.ComponentPropsWithoutRef<"label">

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  return (
    <label data-slot="password-input" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>Password Input<input type="password" defaultValue={undefined} placeholder="Type here" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-11 px-3 font-normal" /></label>
  )
}
