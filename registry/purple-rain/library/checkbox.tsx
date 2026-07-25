import * as React from "react"

import { cn } from "@/lib/utils"

export type CheckboxProps = React.ComponentPropsWithoutRef<"fieldset">

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <fieldset data-slot="checkbox" className={cn("grid gap-3 text-sm", className)} {...props}><legend className="mb-2 font-semibold">Checkbox</legend>{["Keep me posted", "Send a copy"].map((label, index) => <label key={label} className="flex min-h-11 items-center gap-3"><input type="checkbox" name="checkbox" defaultChecked={index === 0} className="size-5 accent-primary" />{label}</label>)}</fieldset>
  )
}
