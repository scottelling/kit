"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type AiDirectorProps = Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit"> & { onApply?: (command: string) => void }

export function AiDirector({ onApply, className, ...props }: AiDirectorProps) {
  const [command, setCommand] = React.useState("")
  const [notice, setNotice] = React.useState("Describe the motion you want.")
  return <form data-slot="ai-director" className={cn("grid gap-2", className)} onSubmit={(event) => { event.preventDefault(); if (!command.trim()) return; onApply?.(command); setNotice("Direction applied. Undo remains available.") }} {...props}><label className="grid min-h-11 grid-cols-[1fr_auto] items-center rounded-[var(--radius-control)] border border-border bg-card pl-3"><span className="sr-only">AI Director command</span><input value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Describe the motion or change you want" className="min-w-0 bg-transparent text-sm outline-none" /><button type="submit" disabled={!command.trim()} className="m-1 min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground">Apply</button></label><p aria-live="polite" className="m-0 text-xs text-muted-foreground">{notice}</p></form>
}
