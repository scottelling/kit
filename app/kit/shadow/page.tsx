import type { Metadata } from "next"

import { ShadowExperience } from "./shadow-experience"
import "./shadow.css"

export const metadata: Metadata = {
  title: "Explore the Shadow elevation kit",
  description: "A hands-on elevation system for cards, menus, dialogs, sheets, and every surface that floats.",
}

export default function ShadowPage() {
  return <ShadowExperience />
}
