import type { Metadata } from "next"

import { studioAssets } from "@/lib/studio-library"

import { CreativeLabs } from "./creative-labs"

export const metadata: Metadata = {
  title: "Labs",
  description: "Tune brand, type, color, text, and motion through live Purple Rain specimens.",
}

export default function LabsPage() {
  return <CreativeLabs assets={studioAssets} />
}

