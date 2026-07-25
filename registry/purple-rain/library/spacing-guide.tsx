import * as React from "react"

import { cn } from "@/lib/utils"

export type SpacingGuideProps = React.ComponentPropsWithoutRef<"div">

export function SpacingGuide({ className, ...props }: SpacingGuideProps) {
  return (
    <div data-slot="spacing-guide" className={cn("grid gap-2", className)} {...props}>{["w-1/4", "w-1/2", "w-3/4", "w-full"].map((width) => <span key={width} className={cn("h-3 rounded-full bg-primary", width)} />)}</div>
  )
}
