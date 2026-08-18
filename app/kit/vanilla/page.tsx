import type { Metadata } from "next"

import library from "@/lib/universal-library.json"

import { type LibraryItem } from "../component-preview"
import { KitExperience } from "../kit-experience"
import "../kit.css"

export const metadata: Metadata = {
  title: "Explore the complete Vanilla kit",
  description: "The neutral, swap-ready starting system for new products, with every shared and specialist Kit piece in light and dark.",
}

export default function VanillaKitPage() {
  return <KitExperience library={library as LibraryItem[]} system="vanilla" />
}
