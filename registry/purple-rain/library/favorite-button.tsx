"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type FavoriteButtonProps = React.ComponentPropsWithoutRef<"button">

export function FavoriteButton({ className, ...props }: FavoriteButtonProps) {
  const [pressed, setPressed] = React.useState(false)
  return (
    <button data-slot="favorite-button" type="button" aria-pressed={pressed} onClick={() => setPressed((value) => !value)} className={cn("rounded-[var(--radius-control)] border border-border bg-card text-card-foreground shadow-[var(--shadow-control)] min-h-11 px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", pressed && "bg-primary text-primary-foreground", className)} {...props}>{pressed ? "Selected" : "Favorite Button"}</button>
  )
}
