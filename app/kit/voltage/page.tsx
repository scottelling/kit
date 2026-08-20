import type { Metadata } from "next"

import library from "@/lib/universal-library.json"

import { type LibraryItem } from "../component-preview"
import { KitExperience } from "../kit-experience"
import "../kit.css"
import "./voltage.css"

export const metadata: Metadata = {
  title: "Explore the complete Voltage kit",
  description: "A complete vivid desktop interface system with solid color blocking, tactile object geometry, and every shared and specialist Kit piece.",
}

export default function VoltagePage() {
  return <KitExperience library={library as LibraryItem[]} system="voltage" />
}
