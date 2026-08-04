import type { Metadata } from "next"

import { studioAssets } from "@/lib/studio-library"

import { CreativeLabs } from "./creative-labs"
import "./theme-workshop.css"

export const metadata: Metadata = {
  title: "Theme Workshop",
  description: "Shape a safe copy of Purple Rain, JADE, or OS in plain language, prove it on a real project, publish it, and restore the source kit exactly.",
}

export default function LabsPage() {
  return <CreativeLabs assets={studioAssets} />
}
