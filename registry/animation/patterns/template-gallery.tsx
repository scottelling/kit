import * as React from "react"

import { cn } from "@/lib/utils"

export type TemplateGalleryProps = React.ComponentPropsWithoutRef<"div">

export function TemplateGallery({ children, className, ...props }: TemplateGalleryProps) {
  return (
    <div data-slot="template-gallery" className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)} {...props}>
      {children ?? ([["Product reveal", "Desktop · 8s"], ["Feature tour", "Phone · 12s"], ["Launch statement", "Canvas · 6s"]].map(([title, meta], index) => <button key={title} type="button" aria-pressed={index === 0} className="grid min-h-36 content-end gap-1 rounded-[var(--radius-card)] border border-border bg-card p-3 text-left aria-pressed:border-primary"><span className="mb-auto h-14 rounded-md bg-plane-pressed" /><strong>{title}</strong><small className="font-mono text-[10px] text-muted-foreground">{meta}</small></button>))}
    </div>
  )
}
