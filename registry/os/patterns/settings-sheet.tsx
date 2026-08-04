"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const tabs = ["Appearance", "Notifications", "Access"]

function SettingsSheet({ className, ...props }: React.ComponentProps<"div">) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const [tab, setTab] = React.useState(tabs[0])
  const [notice, setNotice] = React.useState("Changes stay on this device until you save.")

  return (
    <div data-slot="settings-sheet" className={cn("inline-flex", className)} {...props}>
      <button type="button" onClick={() => dialogRef.current?.showModal()} className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Open settings</button>
      <dialog ref={dialogRef} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }} className="m-auto h-fit max-h-[calc(100dvh-1rem)] w-[min(42rem,calc(100%-1rem))] overflow-hidden rounded-[var(--radius-sheet)] border border-border bg-popover p-0 text-popover-foreground shadow-[var(--shadow-panel)] backdrop:bg-[color:var(--overlay)] md:max-h-[calc(100dvh-4rem)] md:w-[min(42rem,calc(100%-3rem))]">
        <form method="dialog" className="grid max-h-[inherit] grid-rows-[auto_minmax(0,1fr)_auto]">
          <header className="flex min-h-14 items-center justify-between gap-3 border-b border-border px-4"><div><strong className="block">Project settings</strong><span className="text-xs text-muted-foreground">Adjust one clear group at a time.</span></div><button type="submit" aria-label="Close settings" className="size-11 rounded-[var(--radius-control)] text-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">×</button></header>
          <div className="grid min-h-0 overflow-auto md:grid-cols-[12rem_minmax(0,1fr)]">
            <nav aria-label="Settings sections" className="flex gap-2 overflow-x-auto border-b border-border bg-[var(--plane-2)] p-2 md:grid md:content-start md:border-b-0 md:border-r">
              {tabs.map((item) => <button key={item} type="button" aria-current={tab === item ? "page" : undefined} onClick={() => setTab(item)} className="min-h-11 shrink-0 rounded-[var(--radius-control)] px-3 text-left text-sm font-semibold hover:bg-muted aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item}</button>)}
            </nav>
            <section className="grid content-start gap-4 p-4"><span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{tab}</span><label className="grid gap-2 text-sm font-semibold">Project name<input defaultValue="Launch room" className="h-11 rounded-[var(--radius-control)] border border-border bg-input px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label><label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" defaultChecked className="size-5 accent-primary" />Keep useful status visible</label><p className="text-sm leading-6 text-muted-foreground">Every setting uses the same shared theme, focus, validation, and recovery behavior.</p></section>
          </div>
          <footer className="flex flex-col gap-2 border-t border-border p-3 sm:flex-row sm:items-center"><p aria-live="polite" className="mr-auto text-xs text-muted-foreground">{notice}</p><button type="button" onClick={() => setNotice("Original settings restored.")} className="min-h-11 rounded-[var(--radius-control)] px-4 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Restore</button><button type="button" onClick={() => setNotice("Settings saved.")} className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Save changes</button></footer>
        </form>
      </dialog>
    </div>
  )
}

export { SettingsSheet }
