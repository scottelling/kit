import type { Metadata } from "next"

import catalog from "@/lib/icon-catalog.json"

import { IconLibrary, type IconCatalog } from "./icon-library"
import "./icons.css"

export const metadata: Metadata = {
  title: "Icon Library",
  description: "Browse, compare, tune, and save every approved Lucide and Material Symbols Rounded icon.",
}

export default async function IconLibraryPage({ searchParams }: { searchParams: Promise<{ family?: string }> }) {
  const { family } = await searchParams
  const initialFamily = family === "lucide" || family === "material" ? family : "all"
  return <IconLibrary catalog={catalog as IconCatalog} initialFamily={initialFamily} />
}
