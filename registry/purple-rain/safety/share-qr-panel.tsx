"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ShareQrState = "draft" | "ready" | "loading" | "error" | "revoked" | "offline"
export type ShareQrCodeState = "loading" | "ready" | "error" | "revoked" | "offline" | "unavailable"

export type ShareQrPanelProps = Omit<React.ComponentPropsWithoutRef<"section">, "onCopy"> & {
  url: string
  title?: string
  qrCode?: React.ReactNode
  qrLabel?: string
  state?: ShareQrState
  qrState?: ShareQrCodeState
  onCopyLink?: (url: string) => void | Promise<void>
  onNativeShare?: (data: ShareData) => void | Promise<void>
  onRetry?: () => void
  onRetryQr?: () => void
}

const stateMessages: Record<ShareQrState, string> = {
  draft: "Publish this item before sharing it.",
  ready: "The link and QR code open the same destination.",
  loading: "Preparing the share link and QR code…",
  error: "Sharing is unavailable. Your item has not changed.",
  revoked: "This link has been revoked and no longer opens the item.",
  offline: "You are offline. Copying and sharing will return when you reconnect.",
}

export function ShareQrPanel({
  url,
  title = "Share",
  qrCode,
  qrLabel = "QR code for this link",
  state = "ready",
  qrState,
  onCopyLink,
  onNativeShare,
  onRetry,
  onRetryQr,
  className,
  ...props
}: ShareQrPanelProps) {
  const [copyState, setCopyState] = React.useState<"idle" | "copying" | "copied" | "error">("idle")
  const available = state === "ready"
  const activeQrState = qrState ?? (state === "ready" ? (qrCode ? "ready" : "unavailable") : state === "draft" ? "unavailable" : state)

  async function copyLink() {
    if (!available) return
    setCopyState("copying")
    try {
      if (onCopyLink) await onCopyLink(url)
      else await navigator.clipboard.writeText(url)
      setCopyState("copied")
    } catch {
      setCopyState("error")
    }
  }

  async function shareLink() {
    if (!available) return
    const data = { title, url }
    try {
      if (onNativeShare) await onNativeShare(data)
      else if (typeof navigator.share === "function") await navigator.share(data)
      else {
        await copyLink()
        return
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
      setCopyState("error")
    }
  }

  const copyMessage = copyState === "copying" ? "Copying link…" : copyState === "copied" ? "Link copied." : copyState === "error" ? "The link could not be copied. Select it below instead." : stateMessages[state]

  return (
    <section
      data-slot="share-qr-panel"
      data-state={state}
      data-qr-state={activeQrState}
      aria-busy={state === "loading" || activeQrState === "loading" || copyState === "copying"}
      className={cn("grid gap-5 rounded-[var(--radius-sheet)] border border-border bg-card p-5 text-card-foreground sm:grid-cols-[minmax(0,1fr)_14rem]", className)}
      {...props}
    >
      <div className="grid content-start gap-4">
        <header className="grid gap-1">
          <strong className="text-xl tracking-[-0.03em]">{title}</strong>
          <p aria-live="polite" className={cn("m-0 text-sm leading-6", copyState === "error" || state === "error" ? "text-destructive" : "text-muted-foreground")}>{copyMessage}</p>
        </header>

        <label className="grid gap-2 text-sm font-semibold">
          Link
          <input
            value={url}
            readOnly
            aria-label="Share link"
            onFocus={(event) => event.currentTarget.select()}
            className="h-11 min-w-0 rounded-[var(--radius-control)] border border-border bg-background px-3 font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          />
        </label>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={copyLink}
            disabled={!available || copyState === "copying"}
            className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-control)] outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card active:translate-y-px disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:translate-y-0"
          >
            {copyState === "copying" ? "Copying…" : copyState === "copied" ? "Copied" : "Copy link"}
          </button>
          <button
            type="button"
            onClick={shareLink}
            disabled={!available}
            className="min-h-11 rounded-[var(--radius-control)] border border-border bg-background px-4 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card active:translate-y-px disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:translate-y-0"
          >
            Share…
          </button>
          {onRetry && (state === "error" || state === "offline") ? (
            <button type="button" onClick={onRetry} className="min-h-11 rounded-[var(--radius-control)] border border-border px-4 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">Try again</button>
          ) : null}
        </div>
      </div>

      <div className="grid content-start justify-items-center gap-2">
        <div
          role="img"
          aria-label={qrLabel}
          className="grid aspect-square w-full max-w-56 place-items-center overflow-hidden rounded-[var(--radius-control)] border border-border bg-background p-3 text-center text-sm text-muted-foreground"
        >
          {activeQrState === "loading" ? "Preparing QR code…" : activeQrState === "error" ? "QR code unavailable" : activeQrState === "revoked" ? "Link revoked" : activeQrState === "offline" ? "QR code unavailable offline" : activeQrState === "unavailable" ? (state === "draft" ? "Publish to create a QR code" : "Your product supplies the QR code") : qrCode}
        </div>
        <span className="text-center text-xs text-muted-foreground">The text link always remains visible.</span>
        {onRetryQr && (activeQrState === "error" || activeQrState === "offline") ? <button type="button" onClick={onRetryQr} className="min-h-11 rounded-[var(--radius-control)] border border-border px-4 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">Retry QR code</button> : null}
      </div>
    </section>
  )
}
