import type { Metadata } from "next"

import { createStudioProject, defaultBriefs, projectTones, projectTypes, templateFamilies, type ProjectTone, type ProjectType } from "@/lib/project-studio"
import { studioAssets, studioCategories, studioCounts } from "@/lib/studio-library"

import { StudioExperience } from "../studio/studio-experience"
import "../studio/studio.css"
import { BuildMode } from "./build-mode"

export const metadata: Metadata = {
  title: "Build",
  description: "Shape a complete project in plain English, then build it into a working product — one place, one flow.",
}

type BuildPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

// One Build. Shaping and making are two phases of the same page: arrive with no
// project and you shape one; arrive with a project (or explicit choices) and you
// work on it.
const makeParams = ["project", "name", "brief", "type", "tone", "direction", "palette", "font", "motion", "text", "template"]

export default async function BuildPage({ searchParams }: BuildPageProps) {
  const query = await searchParams
  const isMaking = makeParams.some((key) => typeof query[key] === "string")

  if (!isMaking) {
    return <StudioExperience assets={studioAssets} categories={studioCategories} counts={studioCounts} />
  }

  const typeValue = typeof query.type === "string" && projectTypes.includes(query.type as ProjectType) ? query.type as ProjectType : "Product app"
  const toneValue = typeof query.tone === "string" && projectTones.includes(query.tone as ProjectTone) ? query.tone as ProjectTone : "Precise"
  const family = templateFamilies.find((item) => item.type === typeValue) ?? templateFamilies[1]
  const initialProject = createStudioProject({
    name: typeof query.name === "string" ? query.name : "Untitled project",
    brief: typeof query.brief === "string" ? query.brief : defaultBriefs[typeValue],
    type: typeValue,
    tone: toneValue,
    direction: typeof query.direction === "string" ? query.direction : "Instant clarity",
    paletteId: typeof query.palette === "string" ? query.palette : family.accent,
    fontId: typeof query.font === "string" ? query.font : "relay-geist",
    motionId: typeof query.motion === "string" ? query.motion : "press",
    textId: typeof query.text === "string" ? query.text : "solid-display",
    templateId: typeof query.template === "string" ? query.template : family.id,
  })
  const projectId = typeof query.project === "string" ? query.project : null

  return <BuildMode assets={studioAssets} initialProject={initialProject} projectId={projectId} />
}
