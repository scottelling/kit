import * as React from "react"

import { cn } from "@/lib/utils"

export type TableProps = React.ComponentPropsWithoutRef<"div">

export function Table({ className, ...props }: TableProps) {
  return (
    <div data-slot="table" className={cn("overflow-x-auto", className)} {...props}><table className="w-full min-w-80 text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3">Item</th><th className="p-3">Owner</th><th className="p-3">State</th></tr></thead><tbody><tr><td className="p-3">Release notes</td><td className="p-3">Mara</td><td className="p-3">Ready</td></tr></tbody></table></div>
  )
}
