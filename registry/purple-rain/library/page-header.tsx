import * as React from "react"

import { cn } from "@/lib/utils"

export type PageHeaderProps = React.ComponentPropsWithoutRef<"nav">

export function PageHeader({ className, ...props }: PageHeaderProps) {
  return (
    <nav data-slot="page-header" aria-label="Page Header" className={cn("flex flex-wrap items-center gap-2 text-sm", className)} {...props}><a className="min-h-11 rounded-[var(--radius-control)] px-3 py-3 font-semibold hover:bg-muted" href="#">Home</a><span aria-hidden="true">/</span><a className="min-h-11 rounded-[var(--radius-control)] px-3 py-3 font-semibold hover:bg-muted" href="#">Library</a><span aria-current="page" className="px-3 text-muted-foreground">Page Header</span></nav>
  )
}
