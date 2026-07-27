import * as React from "react"

import { cn } from "@/lib/utils"

function EditorToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="editor-toolbar" role="toolbar" className={cn("flex min-h-11 flex-wrap items-center gap-1 rounded-[var(--radius-card)] bg-[var(--plane-2)] p-1", className)} {...props} />
}

type EditorToolbarButtonProps = React.ComponentProps<"button"> & { active?: boolean }

function EditorToolbarButton({ active = false, className, ...props }: EditorToolbarButtonProps) {
  return (
    <button
      type="button"
      data-slot="editor-toolbar-button"
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] px-3 text-sm font-semibold text-muted-foreground outline-none transition-[background-color,color,transform] duration-[var(--dur-micro)] hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px aria-pressed:bg-primary aria-pressed:text-primary-foreground motion-reduce:transition-none motion-reduce:active:translate-y-0",
        className,
      )}
      {...props}
    />
  )
}

export { EditorToolbar, EditorToolbarButton }
