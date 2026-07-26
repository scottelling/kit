import type { Metadata } from "next"

import { QualityRoom } from "./quality-room"

export const metadata: Metadata = {
  title: "Quality",
  description: "Earn Purple Rain release approval through visible product and design checks.",
}

export default function QualityPage() {
  return <QualityRoom />
}

