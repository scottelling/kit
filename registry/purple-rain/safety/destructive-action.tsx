"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

export type DestructiveActionProps = {
  title: string
  description: string
  actionLabel: string
  triggerLabel?: string
  trigger?: React.ReactNode
  confirmationText?: string
  irreversible?: boolean
  recoveryNote?: string
  disabled?: boolean
  onConfirm: () => void | Promise<void>
  onUndo?: () => void | Promise<void>
  className?: string
}

type ActionState = "idle" | "working" | "error" | "complete" | "undoing" | "undo-error"

export function DestructiveAction({
  title,
  description,
  actionLabel,
  triggerLabel = actionLabel,
  trigger,
  confirmationText,
  irreversible = false,
  recoveryNote,
  disabled = false,
  onConfirm,
  onUndo,
  className,
}: DestructiveActionProps) {
  const [open, setOpen] = React.useState(false)
  const [typed, setTyped] = React.useState("")
  const [state, setState] = React.useState<ActionState>("idle")
  const [error, setError] = React.useState("The action did not finish. Nothing else was changed.")
  const busy = state === "working" || state === "undoing"
  const completed = state === "complete" || state === "undoing" || state === "undo-error"
  const confirmed = !confirmationText || typed === confirmationText

  function changeOpen(next: boolean) {
    if (busy) return
    setOpen(next)
    if (next) {
      setTyped("")
      setState("idle")
    }
  }

  async function confirm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (!confirmed || busy) return
    setState("working")
    try {
      await onConfirm()
      setState("complete")
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The action did not finish. Nothing else was changed.")
      setState("error")
    }
  }

  async function undo() {
    if (!onUndo || busy) return
    setState("undoing")
    try {
      await onUndo()
      setState("idle")
      setOpen(false)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Recovery did not finish. Try again.")
      setState("undo-error")
    }
  }

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={changeOpen}>
      <AlertDialogPrimitive.Trigger
        disabled={disabled}
        className="min-h-11 rounded-[var(--radius-control)] bg-destructive px-4 text-sm font-semibold text-destructive-foreground shadow-[var(--shadow-control)] outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:translate-y-0"
      >
        {trigger ?? triggerLabel}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <AlertDialogPrimitive.Content
          data-slot="destructive-action"
          data-action-state={state}
          onEscapeKeyDown={(event) => { if (busy) event.preventDefault() }}
          className={cn(
            "fixed inset-0 z-50 grid h-dvh max-h-dvh content-start gap-5 overflow-y-auto rounded-none bg-card p-5 text-card-foreground shadow-[var(--shadow-panel)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 [animation-duration:var(--dur-long)] motion-reduce:animate-none sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[var(--radius-sheet)] sm:p-6 sm:data-[state=closed]:fade-out-0 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:fade-in-0 sm:data-[state=open]:zoom-in-95",
            className,
          )}
        >
          {completed ? (
            <>
              <div className="grid gap-2">
                <AlertDialogPrimitive.Title className="text-xl font-semibold tracking-[-0.03em]">Action completed</AlertDialogPrimitive.Title>
                <AlertDialogPrimitive.Description className="text-sm leading-6 text-muted-foreground">
                  {irreversible ? "This action cannot be undone." : recoveryNote ?? "Recovery remains available."}
                </AlertDialogPrimitive.Description>
              </div>
              <div aria-live="polite" className={cn("rounded-[var(--radius-control)] border p-3 text-sm", state === "undo-error" ? "border-destructive text-destructive" : "border-border bg-muted text-muted-foreground")}>{state === "undoing" ? "Restoring…" : state === "undo-error" ? error : `${actionLabel} completed.`}</div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <AlertDialogPrimitive.Cancel autoFocus disabled={busy} className="min-h-11 rounded-[var(--radius-control)] border border-border bg-background px-4 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">Close</AlertDialogPrimitive.Cancel>
                {!irreversible && onUndo ? <button type="button" onClick={undo} disabled={busy} className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 text-sm font-semibold text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">{state === "undoing" ? "Restoring…" : state === "undo-error" ? "Try recovery again" : "Undo"}</button> : null}
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <AlertDialogPrimitive.Title className="text-xl font-semibold tracking-[-0.03em]">{title}</AlertDialogPrimitive.Title>
                <AlertDialogPrimitive.Description className="text-sm leading-6 text-muted-foreground">{description}</AlertDialogPrimitive.Description>
              </div>

              {irreversible ? <p role="note" className="m-0 rounded-[var(--radius-control)] border border-destructive p-3 text-sm text-destructive">This action is irreversible.</p> : recoveryNote ? <p role="note" className="m-0 rounded-[var(--radius-control)] border border-border bg-muted p-3 text-sm text-muted-foreground">{recoveryNote}</p> : null}

              {confirmationText ? (
                <label className="grid gap-2 text-sm font-semibold">
                  Type <span className="font-mono">{confirmationText}</span> to continue
                  <input
                    value={typed}
                    onChange={(event) => setTyped(event.target.value)}
                    disabled={busy}
                    autoComplete="off"
                    className="h-11 rounded-[var(--radius-control)] border border-border bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:opacity-50"
                  />
                </label>
              ) : null}

              <p aria-live="assertive" className={cn("m-0 min-h-6 text-sm", state === "error" ? "text-destructive" : "text-muted-foreground")}>
                {state === "working" ? "Working… Do not close this window." : state === "error" ? error : confirmed ? "Review the consequence, then confirm or cancel." : "The confirmation text does not match."}
              </p>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <AlertDialogPrimitive.Cancel autoFocus disabled={busy} className="min-h-11 rounded-[var(--radius-control)] border border-border bg-background px-4 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">Cancel</AlertDialogPrimitive.Cancel>
                <AlertDialogPrimitive.Action
                  onClick={confirm}
                  disabled={!confirmed || busy}
                  className="min-h-11 rounded-[var(--radius-control)] bg-destructive px-4 text-sm font-semibold text-destructive-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  {state === "working" ? "Working…" : actionLabel}
                </AlertDialogPrimitive.Action>
              </div>
            </>
          )}
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
