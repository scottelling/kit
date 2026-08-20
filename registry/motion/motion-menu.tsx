"use client"

import * as React from "react"

import "./motion-menu.css"

export type MotionMenuItem = {
  label: string
  onSelect?: () => void
}

export type MotionMenuProps = {
  label?: string
  items?: MotionMenuItem[]
  align?: "left" | "right"
  className?: string
}

const defaultItems: MotionMenuItem[] = [
  { label: "Open project" },
  { label: "Make a copy" },
  { label: "Move to archive" },
]

export function MotionMenu({ label = "Project actions", items = defaultItems, align = "left", className }: MotionMenuProps) {
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const firstItemRef = React.useRef<HTMLButtonElement>(null)

  const close = React.useCallback((returnFocus = false) => {
    setOpen(false)
    if (returnFocus) window.requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  React.useEffect(() => {
    if (!open) return
    const focusFrame = window.requestAnimationFrame(() => firstItemRef.current?.focus())

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close()
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        close(true)
      }
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [close, open])

  function moveMenuFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return
    const items = [...(rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [])]
    if (!items.length) return
    event.preventDefault()
    const current = items.indexOf(document.activeElement as HTMLButtonElement)
    if (event.key === "Home") items[0].focus()
    else if (event.key === "End") items.at(-1)?.focus()
    else if (event.key === "ArrowDown") items[(current + 1 + items.length) % items.length].focus()
    else items[(current - 1 + items.length) % items.length].focus()
  }

  return (
    <div ref={rootRef} className={["kit-motion-menu", className].filter(Boolean).join(" ")} data-open={open} data-align={align}>
      <button
        ref={triggerRef}
        className="kit-motion-menu__trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {label}
        <span aria-hidden="true">⌄</span>
      </button>
      <div className="kit-motion-menu__surface" role="menu" aria-hidden={!open} onKeyDown={moveMenuFocus}>
        {items.map((item, index) => (
          <button
            ref={index === 0 ? firstItemRef : undefined}
            key={item.label}
            type="button"
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              item.onSelect?.()
              close(true)
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
