import * as React from "react"

import { cn } from "@/lib/utils"

export type DropzoneProps = React.ComponentPropsWithoutRef<"label">

export function Dropzone({ className, ...props }: DropzoneProps) {
  return (
    <label data-slot="dropzone" className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] grid min-h-28 cursor-pointer place-items-center border-dashed p-5 text-center text-sm font-semibold", className)} {...props}><span>Choose a file</span><input type="file" className="sr-only" /></label>
  )
}
