import * as React from "react"

import { cn } from "@/lib/utils"

export type OTPInputProps = React.ComponentPropsWithoutRef<"label">

export function OTPInput({ children, className, ...props }: OTPInputProps) {
  if (children !== undefined) {
    return (<label data-slot="otp-input" className={cn("grid min-w-0 gap-2", className)} {...props}>{children}</label>)
  }

  return (
    <label data-slot="otp-input" className={cn("grid gap-2 text-sm font-semibold", className)} {...props}>OTP Input<input type="text" defaultValue={"Purple Rain"} placeholder="Type here" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-11 px-3 font-normal" /></label>
  )
}
