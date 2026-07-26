import type { Metadata } from "next"

import { studioAssets } from "@/lib/studio-library"

import { TemplateFoundry } from "./template-foundry"

export const metadata: Metadata = {
  title: "Templates",
  description: "Eight complete Purple Rain project systems spanning forty working screens.",
}

export default function TemplatesPage() {
  return <TemplateFoundry assets={studioAssets} />
}

