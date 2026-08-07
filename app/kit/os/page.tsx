import type { Metadata } from "next"

import osLibrary from "@/lib/universal-library.json"

import { type LibraryItem } from "../component-preview"
import { KitExperience } from "../kit-experience"
import "../kit.css"
import "./os.css"

export const metadata: Metadata = {
  title: "Explore the OS Kit",
  description: "A complete, tactile OS interface system rebuilt with solid themes, full-size controls, and real desktop, phone, and widget patterns.",
}

export default function OsKitPage() {
  return <KitExperience library={osLibrary as LibraryItem[]} system="os" />
}
