import * as React from "react"

import { cn } from "@/lib/utils"

export type DescriptionListProps = React.ComponentPropsWithoutRef<"dl">

export function DescriptionList({ className, ...props }: DescriptionListProps) {
  return (
    <dl data-slot="description-list" className={cn("divide-y divide-border text-sm", className)} {...props}>{[["Owner", "Mara Rivera"], ["State", "Ready"], ["Due", "Friday"]].map(([term, detail]) => <div key={term} className="grid grid-cols-2 gap-3 py-3"><dt className="text-muted-foreground">{term}</dt><dd className="font-semibold">{detail}</dd></div>)}</dl>
  )
}
