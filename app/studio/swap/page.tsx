import type { Metadata } from "next"

import contract from "@/lib/adoption-contract.json"
import assessment from "@/lib/adoption-assessment.json"
import catalog from "@/lib/system-catalog.json"

import { SwapStudio } from "./swap-studio"
import "./swap.css"

export const metadata: Metadata = {
  title: "Kit Swap Studio",
  description: "Prepare a reversible visual-system swap that keeps the product intact and repairs interface problems along the way.",
}

export default function SwapStudioPage() {
  return <SwapStudio contract={contract} assessment={assessment} systems={catalog.systems} layers={catalog.layers} />
}
