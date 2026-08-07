import * as React from "react"

import { cn } from "@/lib/utils"

export type DeviceFrameProps = React.ComponentPropsWithoutRef<"div"> & { device?: "phone" | "desktop" | "browser" | "canvas" }

export function DeviceFrame({ device = "desktop", children, className, ...props }: DeviceFrameProps) {
  return <div data-slot="device-frame" data-device={device} className={cn("mx-auto grid aspect-video w-full max-w-2xl place-items-center overflow-hidden rounded-[var(--radius-card)] border-[8px] border-card bg-plane-pressed data-[device=phone]:aspect-[9/16] data-[device=phone]:max-w-48 data-[device=canvas]:rounded-none data-[device=canvas]:border-0", className)} {...props}>{children ?? <span className="font-mono text-xs text-muted-foreground">{device}</span>}</div>
}
