import type { Metadata } from "next"

import { createStudioProject, projectTones, projectTypes, templateFamilies, type ProjectTone, type ProjectType } from "@/lib/project-studio"
import { studioAssets } from "@/lib/studio-library"
import { parseThemeVariant } from "@/lib/theme-workshop"

import { PreviewExperience } from "./preview-experience"

export const metadata: Metadata = {
  title: "Live Preview",
  description: "A live Purple Rain project preview.",
}

type PreviewPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const query = await searchParams
  const type = typeof query.type === "string" && projectTypes.includes(query.type as ProjectType) ? query.type as ProjectType : "Product app"
  const tone = typeof query.tone === "string" && projectTones.includes(query.tone as ProjectTone) ? query.tone as ProjectTone : "Precise"
  const family = templateFamilies.find((item) => item.id === query.template) ?? templateFamilies.find((item) => item.type === type) ?? templateFamilies[1]
  const project = createStudioProject({
    id: typeof query.id === "string" ? query.id : undefined,
    name: typeof query.name === "string" ? query.name : family.name,
    brief: typeof query.brief === "string" ? query.brief : undefined,
    type,
    tone,
    direction: typeof query.direction === "string" ? query.direction : "Instant clarity",
    paletteId: typeof query.palette === "string" ? query.palette : family.accent,
    fontId: typeof query.font === "string" ? query.font : "relay-geist",
    motionId: typeof query.motion === "string" ? query.motion : "press",
    textId: typeof query.text === "string" ? query.text : "solid-display",
    templateId: family.id,
    signature: typeof query.signature === "string" ? query.signature : "Project receipt",
    themeVariant: typeof query.theme === "string" ? parseThemeVariant(query.theme) : null,
    status: "built",
    previewPublished: true,
  })
  return <PreviewExperience assets={studioAssets} project={project} />
}
