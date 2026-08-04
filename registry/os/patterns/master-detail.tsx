"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type MasterDetailItem = { id: string; title: string; detail: string; meta?: string }

type MasterDetailProps = React.ComponentProps<"section"> & {
  items?: MasterDetailItem[]
  initialId?: string
}

const defaultItems: MasterDetailItem[] = [
  { id: "review", title: "Review the launch", meta: "Today", detail: "Check the final page, phone flow, and release notes before approving." },
  { id: "invite", title: "Invite the team", meta: "Next", detail: "Add the people who need to make or approve the next decision." },
  { id: "publish", title: "Publish the update", meta: "Ready", detail: "Send the approved work live and keep a clear recovery path." },
]

function MasterDetail({ items = defaultItems, initialId, className, ...props }: MasterDetailProps) {
  const [selectedId, setSelectedId] = React.useState(initialId ?? items[0]?.id ?? "")
  const [phoneDetail, setPhoneDetail] = React.useState(false)
  const [notice, setNotice] = React.useState("Choose the next useful action.")
  const selected = items.find((item) => item.id === selectedId) ?? items[0]

  function choose(id: string) {
    setSelectedId(id)
    setPhoneDetail(true)
  }

  return (
    <section data-slot="master-detail" className={cn("relative grid min-h-80 overflow-hidden rounded-[var(--radius-sheet)] border border-border bg-background md:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.2fr)]", className)} {...props}>
      <aside className={cn("min-w-0 border-border bg-[var(--plane-2)] p-2 md:border-r", phoneDetail && "hidden md:block")}>
        <header className="flex min-h-11 items-center px-2"><strong>Current work</strong></header>
        <div className="grid gap-1">
          {items.map((item) => <button key={item.id} type="button" onClick={() => choose(item.id)} aria-current={selected?.id === item.id ? "true" : undefined} className="grid min-h-11 min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-[var(--radius-control)] px-3 text-left text-sm hover:bg-muted aria-[current=true]:bg-primary aria-[current=true]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="truncate font-semibold">{item.title}</span><small className="text-xs opacity-75">{item.meta}</small></button>)}
        </div>
      </aside>
      <article className={cn("min-w-0 p-4", !phoneDetail && "hidden md:block")}>
        <button type="button" onClick={() => setPhoneDetail(false)} className="mb-3 min-h-11 rounded-[var(--radius-control)] px-3 text-sm font-semibold text-primary md:hidden">← Current work</button>
        {selected ? <div className="grid max-w-[var(--kit-reading-measure)] gap-3"><span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Current decision</span><h2 className="text-xl font-bold">{selected.title}</h2><p className="text-sm leading-6 text-muted-foreground">{selected.detail}</p><button type="button" onClick={() => setNotice(`${selected.title} is ready to continue.`)} className="mt-2 min-h-11 w-fit rounded-[var(--radius-control)] bg-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Continue</button><p aria-live="polite" className="text-xs text-muted-foreground">{notice}</p></div> : <div><strong>Choose a task</strong><p className="text-sm text-muted-foreground">Select an item to see what needs to happen next.</p></div>}
      </article>
    </section>
  )
}

export { MasterDetail }
