"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const rooms = [
  ["/build", "Build"],
  ["/projects", "Projects"],
  ["/templates", "Templates"],
  ["/labs", "Labs"],
  ["/studio/motion", "Motion"],
  ["/quality", "Quality"],
]

export function StudioNav() {
  const pathname = usePathname()
  return (
    <nav className="studio-room-nav" aria-label="Build rooms">
      <span>Build</span>
      <div>
        {rooms.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
      </div>
    </nav>
  )
}
