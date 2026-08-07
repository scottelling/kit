import * as React from "react"

import { cn } from "@/lib/utils"

export type DeliveryActionProps = React.ComponentPropsWithoutRef<"button"> & { state?: "idle" | "working" | "complete" | "failed" }

export function DeliveryAction({ state = "idle", className, ...props }: DeliveryActionProps) {
  const labels = { idle: "Render MP4", working: "Rendering 48%", complete: "Download MP4", failed: "Try render again" }
  return <button data-slot="delivery-action" type="button" data-state={state} className={cn("min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground data-[state=failed]:bg-destructive data-[state=complete]:bg-positive", className)} {...props}>{labels[state]}</button>
}
