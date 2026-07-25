import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  status?: "idle" | "error" | "success" | "loading"
}

function Input({ className, type, status = "idle", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-status={status}
      aria-invalid={status === "error" || props["aria-invalid"]}
      aria-busy={status === "loading"}
      className={cn(
        "flex h-11 w-full min-w-0 rounded-[var(--radius-control)] border border-input bg-background px-3.5 text-sm text-foreground shadow-[var(--shadow-control)] outline-2 outline-offset-1 outline-transparent placeholder:text-muted-foreground transition-[background-color,border-color] [transition-duration:var(--dur-micro)] [transition-timing-function:var(--ease-standard)] hover:bg-muted focus-visible:border-ring focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:outline-destructive data-[status=success]:border-positive data-[status=success]:outline-positive data-[status=loading]:cursor-wait motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
