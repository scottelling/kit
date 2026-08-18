"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type VisibilityValue = "private" | "draft" | "unlisted" | "public" | "inherited"
export type VisibilitySaveState = "idle" | "saving" | "saved" | "error"

export type VisibilityOption = {
  value: VisibilityValue
  label: string
  description: string
}

const defaultOptions: VisibilityOption[] = [
  { value: "private", label: "Private", description: "Only people with permission can open it." },
  { value: "draft", label: "Draft", description: "Keep working without making it available." },
  { value: "unlisted", label: "Unlisted", description: "Anyone with the link can open it." },
  { value: "public", label: "Public", description: "Make it available wherever your product publishes it." },
  { value: "inherited", label: "Use parent setting", description: "Follow the visibility chosen for the containing project." },
]

export type VisibilityPublicationControlProps = Omit<React.ComponentPropsWithoutRef<"section">, "onChange"> & {
  value?: VisibilityValue
  defaultValue?: VisibilityValue
  onValueChange?: (value: VisibilityValue) => void
  options?: VisibilityOption[]
  saveState?: VisibilitySaveState
  destination?: string
  sensitive?: boolean
  disabled?: boolean
  onPreview?: () => void
}

const saveMessages: Record<VisibilitySaveState, string> = {
  idle: "Choose who can open this item.",
  saving: "Saving visibility…",
  saved: "Visibility saved.",
  error: "Visibility was not saved. Your previous setting is still active.",
}

export function VisibilityPublicationControl({
  value,
  defaultValue = "private",
  onValueChange,
  options = defaultOptions,
  saveState = "idle",
  destination,
  sensitive = false,
  disabled = false,
  onPreview,
  className,
  ...props
}: VisibilityPublicationControlProps) {
  const [localValue, setLocalValue] = React.useState<VisibilityValue>(defaultValue)
  const groupName = React.useId()
  const selected = value ?? localValue
  const selectedOption = options.find((option) => option.value === selected)

  function choose(next: VisibilityValue) {
    if (value === undefined) setLocalValue(next)
    onValueChange?.(next)
  }

  return (
    <section
      data-slot="visibility-publication-control"
      data-state={saveState}
      className={cn("grid gap-4 rounded-[var(--radius-card)] border border-border bg-card p-4 text-card-foreground", className)}
      {...props}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <strong className="text-base">Visibility</strong>
          <span className="text-sm text-muted-foreground">{selectedOption?.description}</span>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {selectedOption?.label ?? "Choose"}
        </span>
      </header>

      {sensitive ? (
        <p role="note" className="m-0 rounded-[var(--radius-control)] border border-border bg-muted p-3 text-sm text-muted-foreground">
          This item may contain sensitive information. Review the public preview before sharing it.
        </p>
      ) : null}

      <fieldset disabled={disabled || saveState === "saving"} className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">Choose visibility</legend>
        {options.map((option) => (
          <label
            key={option.value}
            className="grid min-h-14 cursor-pointer grid-cols-[1.25rem_1fr] items-start gap-3 rounded-[var(--radius-control)] border border-border p-3 has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-card has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50"
          >
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={selected === option.value}
              onChange={() => choose(option.value)}
              className="mt-0.5 size-5 accent-primary outline-none"
            />
            <span className="grid gap-1">
              <strong className="text-sm">{option.label}</strong>
              <span className="text-xs leading-5 text-muted-foreground">{option.description}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <footer className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-1 text-sm">
          <span aria-live="polite" className={cn(saveState === "error" ? "text-destructive" : "text-muted-foreground")}>
            {saveMessages[saveState]}
          </span>
          {destination ? <span className="break-all text-xs text-muted-foreground">Destination: {destination}</span> : null}
        </div>
        {onPreview ? (
          <button
            type="button"
            onClick={onPreview}
            disabled={disabled || saveState === "saving"}
            className="min-h-11 rounded-[var(--radius-control)] border border-border bg-background px-4 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card active:translate-y-px disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:translate-y-0"
          >
            Preview
          </button>
        ) : null}
      </footer>
    </section>
  )
}
