import * as React from "react"

import { cn } from "@/lib/utils"

function TaskRail({ className, ...props }: React.ComponentProps<"aside">) {
  return <aside data-slot="task-rail" className={cn("grid w-full max-w-sm content-start gap-2 bg-[var(--plane-1)] p-3", className)} {...props} />
}

function TaskRailItem({ active = false, className, ...props }: React.ComponentProps<"button"> & { active?: boolean }) {
  return <button type="button" data-slot="task-rail-item" aria-current={active ? "true" : undefined} className={cn("min-h-11 rounded-[var(--radius-control)] px-3 text-start text-sm font-semibold text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=true]:bg-primary aria-[current=true]:text-primary-foreground", className)} {...props} />
}

export { TaskRail, TaskRailItem }
