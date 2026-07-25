import type { Metadata } from "next"

import { studioAssets, studioCategories, studioCounts } from "@/lib/studio-library"

import { StudioExperience } from "./studio-experience"
import "./studio.css"

export const metadata: Metadata = {
  title: "Studio",
  description: "Shape a complete project in plain English with Purple Rain’s design and delivery system.",
}

export default function StudioPage() {
  return <StudioExperience assets={studioAssets} categories={studioCategories} counts={studioCounts} />
}
