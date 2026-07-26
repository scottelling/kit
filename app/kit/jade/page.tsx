import type { Metadata } from "next"

import { JadeExperience } from "./jade-experience"
import "./jade.css"

export const metadata: Metadata = {
  title: "Explore JADE",
  description: "A hands-on pilot of JADE, rebuilt inside the Purple Rain design studio.",
}

export default function JadePage() {
  return <JadeExperience />
}
