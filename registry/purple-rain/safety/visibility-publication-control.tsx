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
  locallyOverridden?: boolean
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
  locallyOverridden = false,
  disabled = false,
  onPreview,
  className,
  ...props
}: VisibilityPublicationControlProps) {
  const [localValue, setLocalValue] = React.useState<VisibilityValue>(defaultValue)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const groupName = React.useId()
  const selected = value ?? localValue
  const selectedOption = options.find((option) => option.value === selected)

  function choose(next: VisibilityValue) {
    if (value === undefined) setLocalValue(next)
    onValueChange?.(next)
  }

  function openChoices() {
    dialogRef.current?.showModal()
    setMobileOpen(true)
    window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLInputElement>("input:checked")?.focus())
  }

  function closeChoices() {
    dialogRef.current?.close()
    setMobileOpen(false)
  }

  function renderOptions(context: "phone" | "desktop") {
    return (
      <fieldset disabled={disabled || saveState === "saving"} className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">Choose visibility</legend>
        {options.map((option) => (
          <label
            key={option.value}
            className="grid min-h-14 cursor-pointer grid-cols-[1.25rem_1fr] items-start gap-3 rounded-[var(--radius-control)] border border-border p-3 has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-card has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50"
          >
            <input
              type="radio"
              name={`${groupName}-${context}`}
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
    )
  }

  function renderStatus() {
    return (
      <div className="grid gap-1 text-sm">
        <span aria-live="polite" className={cn(saveState === "error" ? "text-destructive" : "text-muted-foreground")}>
          {saveMessages[saveState]}
        </span>
        {destination ? <span className="break-all text-xs text-muted-foreground">Destination: {destination}</span> : null}
      </div>
    )
  }

  return (
    <section
      data-slot="visibility-publication-control"
      data-state={saveState}
      data-inheritance={selected === "inherited" ? "inherited" : locallyOverridden ? "overridden" : "local"}
      className={cn("grid gap-3 text-card-foreground", className)}
      {...props}
    >
      <button
        type="button"
        onClick={openChoices}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={mobileOpen}
        className="grid min-h-14 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[var(--radius-card)] border border-border bg-card p-4 text-left shadow-[var(--shadow-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 sm:hidden"
      >
        <span className="grid gap-1"><strong>Visibility</strong><span className="text-sm text-muted-foreground">{selectedOption?.description}</span></span>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{locallyOverridden ? "Local override" : selectedOption?.label ?? "Choose"}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${groupName}-title`}
        onClose={() => setMobileOpen(false)}
        onCancel={() => setMobileOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) closeChoices() }}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[calc(100dvh-1rem)] w-full max-w-none overflow-y-auto rounded-t-[var(--radius-sheet)] border border-border bg-card p-5 text-card-foreground shadow-[var(--shadow-panel)] backdrop:bg-overlay sm:hidden"
      >
        <div className="grid gap-4">
          <header className="flex items-start justify-between gap-3"><div className="grid gap-1"><strong id={`${groupName}-title`} className="text-xl">Choose visibility</strong><span className="text-sm text-muted-foreground">Understand the consequence before changing access.</span></div><button type="button" onClick={closeChoices} className="min-h-11 rounded-[var(--radius-control)] border border-border px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring">Done</button></header>
          {sensitive ? <p role="note" className="m-0 rounded-[var(--radius-control)] border border-border bg-muted p-3 text-sm text-muted-foreground">This item may contain sensitive information. Review the public preview before sharing it.</p> : null}
          {locallyOverridden ? <p role="status" className="m-0 rounded-[var(--radius-control)] border border-primary p-3 text-sm">This item overrides its parent visibility setting.</p> : null}
          {renderOptions("phone")}
          <footer className="grid gap-3 border-t border-border pt-3">{renderStatus()}{onPreview ? <button type="button" onClick={onPreview} disabled={disabled || saveState === "saving"} className="min-h-11 rounded-[var(--radius-control)] border border-border bg-background px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">Preview</button> : null}</footer>
        </div>
      </dialog>

      <div className="hidden gap-4 rounded-[var(--radius-card)] border border-border bg-card p-4 sm:grid">
        <header className="flex flex-wrap items-start justify-between gap-3"><div className="grid gap-1"><strong className="text-base">Visibility</strong><span className="text-sm text-muted-foreground">{selectedOption?.description}</span></div><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{locallyOverridden ? "Local override" : selectedOption?.label ?? "Choose"}</span></header>
        {sensitive ? <p role="note" className="m-0 rounded-[var(--radius-control)] border border-border bg-muted p-3 text-sm text-muted-foreground">This item may contain sensitive information. Review the public preview before sharing it.</p> : null}
        {locallyOverridden ? <p role="status" className="m-0 rounded-[var(--radius-control)] border border-primary p-3 text-sm">This item overrides its parent visibility setting.</p> : null}
        {renderOptions("desktop")}
        <footer className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">{renderStatus()}{onPreview ? <button type="button" onClick={onPreview} disabled={disabled || saveState === "saving"} className="min-h-11 rounded-[var(--radius-control)] border border-border bg-background px-4 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card active:translate-y-px disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:translate-y-0">Preview</button> : null}</footer>
      </div>
    </section>
  )
}
