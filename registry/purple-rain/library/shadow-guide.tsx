import * as React from "react"

import { cn } from "@/lib/utils"

export type ShadowGuideProps = React.ComponentPropsWithoutRef<"div">

export function ShadowGuide({ className, ...props }: ShadowGuideProps) {
  return (
    <div data-slot="shadow-guide" className={cn("flex flex-wrap gap-5", className)} {...props}><span className="size-24 rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-control)]" /><span className="size-24 rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-panel)]" /></div>
  )
}
