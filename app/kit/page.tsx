import type { Metadata } from "next"

import { KitExperience } from "./kit-experience"
import "./kit.css"

export const metadata: Metadata = {
  title: "Explore Purple Rain",
  description: "A hands-on showroom for every piece in the Purple Rain interface kit.",
}

export default function KitPage() {
  return <KitExperience />
}
