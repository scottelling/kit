import * as React from "react"

import { cn } from "@/lib/utils"

function TerminalSurface({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="terminal-surface" className={cn("min-h-48 overflow-auto rounded-[var(--radius-card)] bg-[var(--plane-pressed)] p-4 font-mono text-sm leading-6 text-foreground shadow-[var(--shadow-inset,var(--shadow-control))]", className)} {...props} />
}

function TerminalPrompt({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="terminal-prompt" className={cn("m-0 flex min-w-0 gap-2", className)} {...props} />
}

export { TerminalPrompt, TerminalSurface }
