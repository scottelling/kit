import type { Metadata } from "next"

import guides from "@/lib/component-guides.json"

import { GuideLibrary } from "./guide-library"
import "./guides.css"

export const metadata: Metadata = {
  title: "Component Guides",
  description: "See when to use every Kit component, how it should behave, and what must be proven before release.",
}

export default function ComponentGuidesPage() {
  return <GuideLibrary catalog={guides} />
}
