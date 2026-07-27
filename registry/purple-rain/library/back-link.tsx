import * as React from "react"

import { cn } from "@/lib/utils"

export type BackLinkProps = React.ComponentPropsWithoutRef<"nav">

export function BackLink({ children, className, ...props }: BackLinkProps) {
  if (children !== undefined) {
    return (<nav data-slot="back-link" className={cn("flex min-w-0 flex-wrap items-center gap-2", className)} {...props}>{children}</nav>)
  }

  return (
    <nav data-slot="back-link" aria-label="Back Link" className={cn("flex flex-wrap items-center gap-2 text-sm", className)} {...props}><a className="min-h-11 rounded-[var(--radius-control)] px-3 py-3 font-semibold hover:bg-muted" href="#">Home</a><span aria-hidden="true">/</span><a className="min-h-11 rounded-[var(--radius-control)] px-3 py-3 font-semibold hover:bg-muted" href="#">Library</a><span aria-current="page" className="px-3 text-muted-foreground">Back Link</span></nav>
  )
}
