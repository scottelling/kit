import type { Metadata } from "next"

import library from "@/lib/purple-rain-library.json"

import { type LibraryItem } from "../component-preview"
import { KitExperience } from "../kit-experience"
import "../kit.css"
import "./jade-library.css"

export const metadata: Metadata = {
  title: "Explore the complete JADE kit",
  description: "A hands-on showroom for every production piece in the JADE interface system.",
}

export default function JadePage() {
  return <KitExperience library={library as LibraryItem[]} system="jade" />
}
