import * as React from "react"

import { cn } from "@/lib/utils"

function TaskBoard({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="task-board" className={cn("grid min-w-0 auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-3 overflow-x-auto pb-2", className)} {...props} />
}

function TaskColumn({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="task-column" className={cn("grid min-w-0 content-start gap-2 rounded-[var(--radius-card)] bg-[var(--plane-2)] p-2", className)} {...props} />
}

function TaskColumnHeader({ className, ...props }: React.ComponentProps<"header">) {
  return <header data-slot="task-column-header" className={cn("flex min-h-11 items-center justify-between gap-3 px-2 text-sm font-semibold", className)} {...props} />
}

function TaskCard({ className, ...props }: React.ComponentProps<"article">) {
  return <article data-slot="task-card" className={cn("grid gap-2 rounded-[var(--radius-card)] bg-card p-3 text-card-foreground shadow-[var(--shadow-control)]", className)} {...props} />
}

export { TaskBoard, TaskCard, TaskColumn, TaskColumnHeader }
