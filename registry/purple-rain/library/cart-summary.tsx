import * as React from "react"

import { cn } from "@/lib/utils"

export type CartSummaryProps = React.ComponentPropsWithoutRef<"section">

export function CartSummary({ children, className, ...props }: CartSummaryProps) {
  if (children !== undefined) {
    return (<section data-slot="cart-summary" className={cn("min-w-0 rounded-[var(--radius-card)] bg-card text-card-foreground", className)} {...props}>{children}</section>)
  }

  return (
    <section data-slot="cart-summary" className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] grid gap-3 p-5", className)} {...props}><strong className="text-lg">Cart Summary</strong>{[["Workshop seat", "$48"], ["Delivery", "$0"], ["Total", "$48"]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-border py-2 text-sm"><span>{label}</span><b>{value}</b></div>)}<button type="button" className="rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-primary text-primary-foreground">Review order</button></section>
  )
}
