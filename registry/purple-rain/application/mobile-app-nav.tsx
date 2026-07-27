import * as React from "react"

import { cn } from "@/lib/utils"

function MobileAppNav({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="mobile-app-nav" aria-label="Primary" className={cn("grid min-h-14 grid-flow-col auto-cols-fr items-stretch bg-[var(--plane-2)] p-1", className)} {...props} />
}

function MobileAppNavItem({ active = false, className, ...props }: React.ComponentProps<"button"> & { active?: boolean }) {
  return <button type="button" data-slot="mobile-app-nav-item" aria-current={active ? "page" : undefined} className={cn("grid min-h-11 place-items-center rounded-[var(--radius-control)] px-2 text-xs font-semibold text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground", className)} {...props} />
}

export { MobileAppNav, MobileAppNavItem }
