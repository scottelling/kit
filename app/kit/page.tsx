import type { Metadata } from "next"

import library from "@/lib/purple-rain-library.json"

import { type LibraryItem } from "./component-preview"
import { KitExperience } from "./kit-experience"
import "./kit.css"

export const metadata: Metadata = {
  title: "Explore Purple Rain",
  description: "A hands-on showroom for every piece in the Purple Rain interface kit.",
}

export default function KitPage() {
  return <KitExperience library={library as LibraryItem[]} />
}
