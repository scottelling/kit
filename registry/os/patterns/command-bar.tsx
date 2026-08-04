"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CommandBarItem = { id: string; label: string; hint: string }

type CommandBarProps = React.ComponentProps<"section"> & {
  items?: CommandBarItem[]
  onRun?: (item: CommandBarItem) => void
}

const defaultItems: CommandBarItem[] = [
  { id: "open", label: "Open current project", hint: "Return to the work already in progress" },
  { id: "create", label: "Create a project", hint: "Start from an ordinary-English brief" },
  { id: "review", label: "Review release quality", hint: "See what still needs attention" },
]

function CommandBar({ items = defaultItems, onRun, className, ...props }: CommandBarProps) {
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const [notice, setNotice] = React.useState("Type what you want to do.")
  const matches = items.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(query.trim().toLowerCase()))

  function run(item: CommandBarItem) {
    onRun?.(item)
    setNotice(`${item.label} selected.`)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!matches.length) return
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => (value + 1) % matches.length) }
    if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => (value - 1 + matches.length) % matches.length) }
    if (event.key === "Enter") { event.preventDefault(); run(matches[active] ?? matches[0]) }
  }

  return (
    <section data-slot="command-bar" className={cn("grid overflow-hidden rounded-[var(--radius-sheet)] border border-border bg-popover text-popover-foreground shadow-[var(--shadow-panel)]", className)} {...props}>
      <label className="flex min-h-14 items-center gap-3 border-b border-border px-4"><span aria-hidden="true">⌘</span><span className="sr-only">What do you want to do?</span><input value={query} onChange={(event) => { setQuery(event.target.value); setActive(0) }} onKeyDown={handleKeyDown} placeholder="What do you want to do?" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></label>
      <div role="listbox" aria-label="Matching actions" className="grid gap-1 p-2">
        {matches.map((item, index) => <button key={item.id} type="button" role="option" aria-selected={active === index} onMouseEnter={() => setActive(index)} onClick={() => run(item)} className="grid min-h-14 gap-1 rounded-[var(--radius-control)] px-3 py-2 text-left hover:bg-muted aria-selected:bg-primary aria-selected:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><strong className="text-sm">{item.label}</strong><span className="text-xs opacity-75">{item.hint}</span></button>)}
        {matches.length === 0 ? <div className="grid min-h-24 content-center gap-1 px-3"><strong>No matching action</strong><p className="text-sm text-muted-foreground">Try “open,” “create,” or “review.”</p></div> : null}
      </div>
      <p aria-live="polite" className="min-h-11 border-t border-border px-4 py-3 text-xs text-muted-foreground">{notice}</p>
    </section>
  )
}

export { CommandBar }
