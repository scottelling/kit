"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const rooms = [
  ["/build", "Build"],
  ["/projects", "Projects"],
  ["/templates", "Templates"],
  ["/labs", "Labs"],
  ["/quality", "Quality"],
]

export function StudioNav() {
  const pathname = usePathname()
  return (
    <nav className="studio-room-nav" aria-label="Studio rooms">
      <span>Project Studio</span>
      <div>
        {rooms.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
      </div>
    </nav>
  )
}

