import * as React from "react"

import { cn } from "@/lib/utils"

export type CodePanelProps = React.ComponentPropsWithoutRef<"section">

export function CodePanel({ children, className, ...props }: CodePanelProps) {
  return (
    <section data-slot="code-panel" className={cn("overflow-hidden rounded-[var(--radius-card)] border border-border bg-plane-pressed", className)} {...props}>
      {children ?? (<><header className="flex min-h-11 items-center justify-between border-b border-border px-3"><span className="font-mono text-[10px] text-muted-foreground">scene.motion.ts</span><button type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-xs font-bold">Copy</button></header><pre className="m-0 overflow-x-auto p-4 font-mono text-xs leading-6 text-foreground"><code>{'purpose: "explanation"\neasing: "easeOut"\nduration: 420\nreducedMotion: "fade"'}</code></pre></>)}
    </section>
  )
}
