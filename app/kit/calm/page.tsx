import type { Metadata } from "next"

import library from "@/lib/universal-library.json"

import { type LibraryItem } from "../component-preview"
import { KitExperience } from "../kit-experience"
import "../kit.css"
import "./calm.css"

export const metadata: Metadata = {
  title: "Explore the complete Calm Desktop kit",
  description: "A complete dark graphite desktop interface system with quiet structure, inline editing, dense navigation, and every shared and specialist Kit piece.",
}

export default function CalmPage() {
  return <KitExperience library={library as LibraryItem[]} system="calm" />
}
