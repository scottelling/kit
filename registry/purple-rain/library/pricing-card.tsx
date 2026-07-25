import * as React from "react"

import { cn } from "@/lib/utils"

export type PricingCardProps = React.ComponentPropsWithoutRef<"section">

export function PricingCard({ className, ...props }: PricingCardProps) {
  return (
    <section data-slot="pricing-card" className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] grid gap-3 p-5", className)} {...props}><span className="text-sm text-muted-foreground">Studio</span><strong className="text-4xl tabular-nums">$24</strong><p className="text-sm text-muted-foreground">For one working team.</p><button type="button" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-primary text-primary-foreground">Choose Studio</button></section>
  )
}
