import type { Metadata } from "next"

import { JadeExperience } from "../jade-experience"
import "../jade.css"

export const metadata: Metadata = {
  title: "Compare JADE and Purple Rain",
  description: "The same working launch review rendered in JADE and Purple Rain.",
}

export default function JadeComparePage() {
  return <JadeExperience />
}
