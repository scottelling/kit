import * as React from "react"

import { cn } from "@/lib/utils"

export type ShadowGuideProps = React.ComponentPropsWithoutRef<"div">

export function ShadowGuide({ children, className, ...props }: ShadowGuideProps) {
  if (children !== undefined) {
    return (<div data-slot="shadow-guide" className={cn("min-w-0", className)} {...props}>{children}</div>)
  }

  return (
    <div data-slot="shadow-guide" className={cn("flex flex-wrap gap-5", className)} {...props}><span className="size-24 rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-control)]" /><span className="size-24 rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-panel)]" /></div>
  )
}
