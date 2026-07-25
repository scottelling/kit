import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] border border-transparent px-4 text-sm font-semibold tracking-[-0.008em] shadow-[var(--shadow-control)] outline-none transition-[background-color,color,border-color,transform,opacity] [transition-duration:var(--dur-micro)] [transition-timing-function:var(--ease-standard)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:text-destructive data-[loading=true]:cursor-wait data-[loading=true]:opacity-70 data-[status=success]:border-positive data-[status=error]:border-destructive motion-reduce:transition-none motion-reduce:active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_8%)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)]",
        outline: "border-border bg-background text-foreground shadow-none hover:bg-muted",
        ghost: "bg-transparent text-foreground shadow-none hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground hover:bg-[color-mix(in_oklch,var(--destructive),var(--foreground)_8%)]",
        link: "min-h-0 rounded-none bg-transparent p-0 text-primary shadow-none underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11",
        sm: "h-11 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    status?: "idle" | "error" | "success"
    loadingLabel?: string
  }

function Button({
  className,
  variant,
  size,
  loading = false,
  status = "idle",
  loadingLabel = "Working…",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      data-loading={loading}
      data-status={status}
      aria-busy={loading}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? loadingLabel : children}
    </button>
  )
}

export { Button, buttonVariants }
