import * as React from "react"

import { cn } from "@/lib/utils"

export type EvidenceStatus = "self-reported" | "researched" | "verified" | "unknown" | "conflicting" | "stale" | "under-review"
export type EvidenceState = "ready" | "loading" | "error"

export type EvidenceSource = {
  label: string
  href: string
  detail?: string
}

export type EvidenceSourceBlockProps = React.ComponentPropsWithoutRef<"section"> & {
  status?: EvidenceStatus
  statusLabel?: string
  summary?: string
  reviewedAt?: string
  sources?: EvidenceSource[]
  limitations?: string[]
  state?: EvidenceState
  errorMessage?: string
}

const statusLabels: Record<EvidenceStatus, string> = {
  "self-reported": "Self-reported",
  researched: "Independently researched",
  verified: "Verified",
  unknown: "Unknown",
  conflicting: "Conflicting evidence",
  stale: "Review needed",
  "under-review": "Under review",
}

export function EvidenceSourceBlock({
  status = "unknown",
  statusLabel,
  summary = "The available evidence and its limits are shown together.",
  reviewedAt,
  sources = [],
  limitations = [],
  state = "ready",
  errorMessage = "Sources could not be loaded. The summary remains visible.",
  className,
  ...props
}: EvidenceSourceBlockProps) {
  const label = statusLabel ?? statusLabels[status]

  return (
    <section
      data-slot="evidence-source-block"
      data-status={status}
      data-state={state}
      aria-busy={state === "loading"}
      className={cn("grid gap-4 rounded-[var(--radius-card)] border border-border bg-card p-4 text-card-foreground", className)}
      {...props}
    >
      <header className="grid gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <strong>Evidence and sources</strong>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{label}</span>
        </div>
        <p className="m-0 text-sm leading-6 text-muted-foreground">{summary}</p>
      </header>

      {reviewedAt ? (
        <dl className="grid grid-cols-[auto_1fr] gap-3 border-y border-border py-3 text-sm">
          <dt className="text-muted-foreground">Last reviewed</dt>
          <dd className="m-0 font-semibold"><time dateTime={reviewedAt}>{reviewedAt}</time></dd>
        </dl>
      ) : null}

      {state === "loading" ? <p role="status" className="m-0 min-h-11 content-center text-sm text-muted-foreground">Loading sources…</p> : null}
      {state === "error" ? <p role="alert" className="m-0 rounded-[var(--radius-control)] border border-destructive p-3 text-sm text-destructive">{errorMessage}</p> : null}

      {state === "ready" ? (
        <div className="grid gap-2">
          <strong className="text-sm">Sources</strong>
          {sources.length ? (
            <ul className="m-0 grid list-none gap-1 p-0">
              {sources.map((source) => (
                <li key={`${source.href}-${source.label}`}>
                  <a
                    href={source.href}
                    className="grid min-h-11 gap-1 rounded-[var(--radius-control)] px-3 py-2 text-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <span className="font-semibold underline underline-offset-4">{source.label}</span>
                    {source.detail ? <span className="text-xs leading-5 text-muted-foreground">{source.detail}</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          ) : <p className="m-0 min-h-11 content-center text-sm text-muted-foreground">No sources are available yet.</p>}
        </div>
      ) : null}

      {limitations.length ? (
        <details className="border-t border-border pt-2">
          <summary className="min-h-11 cursor-pointer content-center rounded-[var(--radius-control)] px-2 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card">
            What this does not establish
          </summary>
          <ul className="mb-0 mt-2 grid gap-2 pl-6 text-sm leading-6 text-muted-foreground">
            {limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
          </ul>
        </details>
      ) : null}
    </section>
  )
}
