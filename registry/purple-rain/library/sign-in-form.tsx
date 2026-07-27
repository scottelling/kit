import * as React from "react"

import { cn } from "@/lib/utils"

export type SignInFormProps = React.ComponentPropsWithoutRef<"section">

export function SignInForm({ children, className, ...props }: SignInFormProps) {
  if (children !== undefined) {
    return (<section data-slot="sign-in-form" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</section>)
  }

  return (
    <section data-slot="sign-in-form" className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] grid gap-4 p-5", className)} {...props}><header><strong className="text-lg">Sign In Form</strong><p className="mt-1 text-sm text-muted-foreground">A complete Purple Rain task, assembled and ready.</p></header><label className="grid gap-2 text-sm font-semibold">Email address<input type="email" placeholder="you@example.com" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-11 px-3 font-normal" /></label><button type="button" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-primary text-primary-foreground">Save changes</button></section>
  )
}
