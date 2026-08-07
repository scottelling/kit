import * as React from "react"

import { cn } from "@/lib/utils"

export type CommandSuggestionListProps = React.ComponentPropsWithoutRef<"div">

export function CommandSuggestionList({ children, className, ...props }: CommandSuggestionListProps) {
  return (
    <div data-slot="command-suggestion-list" className={cn("grid gap-1 rounded-[var(--radius-card)] border border-border bg-popover p-2 shadow-[var(--shadow-panel)]", className)} {...props}>
      {children ?? (["Make the entrance calmer", "Hold the title longer", "Use feedback motion for the tap"].map((suggestion) => <button key={suggestion} type="button" className="min-h-11 rounded-[var(--radius-control)] px-3 text-left text-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{suggestion}</button>))}
    </div>
  )
}
