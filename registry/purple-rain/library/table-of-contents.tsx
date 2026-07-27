import * as React from "react"

import { cn } from "@/lib/utils"

export type TableOfContentsProps = React.ComponentPropsWithoutRef<"nav">

export function TableOfContents({ children, className, ...props }: TableOfContentsProps) {
  if (children !== undefined) {
    return (<nav data-slot="table-of-contents" className={cn("flex min-w-0 flex-wrap items-center gap-2", className)} {...props}>{children}</nav>)
  }

  return (
    <nav data-slot="table-of-contents" aria-label="Table Of Contents" className={cn("flex flex-wrap items-center gap-2 text-sm", className)} {...props}><a className="min-h-11 rounded-[var(--radius-control)] px-3 py-3 font-semibold hover:bg-muted" href="#">Home</a><span aria-hidden="true">/</span><a className="min-h-11 rounded-[var(--radius-control)] px-3 py-3 font-semibold hover:bg-muted" href="#">Library</a><span aria-current="page" className="px-3 text-muted-foreground">Table Of Contents</span></nav>
  )
}
