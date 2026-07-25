import * as React from "react"

import { cn } from "@/lib/utils"

export type RadioGroupProps = React.ComponentPropsWithoutRef<"fieldset">

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <fieldset data-slot="radio-group" className={cn("grid gap-3 text-sm", className)} {...props}><legend className="mb-2 font-semibold">Radio Group</legend>{["Keep me posted", "Send a copy"].map((label, index) => <label key={label} className="flex min-h-11 items-center gap-3"><input type="radio" name="radio-group" defaultChecked={index === 0} className="size-5 accent-primary" />{label}</label>)}</fieldset>
  )
}
