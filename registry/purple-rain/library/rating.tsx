"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type RatingProps = React.ComponentPropsWithoutRef<"fieldset">

export function Rating({ className, ...props }: RatingProps) {
  const [value, setValue] = React.useState("3")
  return (
    <fieldset data-slot="rating" className={cn("flex gap-1", className)} {...props}><legend className="sr-only">Rating</legend>{[1,2,3,4,5].map((number) => <button key={number} type="button" onClick={() => setValue(String(number))} aria-label={number + " stars"} className="size-11 text-xl text-primary">{number <= Number(value || 3) ? "★" : "☆"}</button>)}</fieldset>
  )
}
