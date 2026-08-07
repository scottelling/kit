"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const sampleLayers = ["Headline", "Supporting copy", "Background"]

export function LayerList({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [active, setActive] = React.useState(0)
  const [hidden, setHidden] = React.useState<number[]>([])
  return <div data-slot="layer-list" className={cn("grid gap-1", className)} {...props}>{sampleLayers.map((layer, index) => <div key={layer} className="grid grid-cols-[2.75rem_1fr] gap-1"><button type="button" aria-label={(hidden.includes(index) ? "Show " : "Hide ") + layer} onClick={() => setHidden((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])} className="size-11 rounded-[var(--radius-control)] border border-border text-xs">{hidden.includes(index) ? "Off" : "On"}</button><button type="button" aria-current={active === index ? "true" : undefined} onClick={() => setActive(index)} className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm aria-[current=true]:bg-secondary aria-[current=true]:font-bold">{layer}</button></div>)}</div>
}
