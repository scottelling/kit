"use client"

import { ArrowLeft, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { ProjectCanvas } from "@/components/project-canvas"
import { getTemplateFamily, type StudioProject } from "@/lib/project-studio"
import type { StudioAsset } from "@/lib/studio-library"

export function PreviewExperience({ assets, project }: { assets: StudioAsset[]; project: StudioProject }) {
  const family = getTemplateFamily(project.templateId)
  const [page, setPage] = useState(family.pages[0])
  const [dark, setDark] = useState(false)
  return <main className={`published-preview${dark ? " dark" : ""}`}><header className="published-preview__bar"><Link href={`/build?project=${project.id}`}><ArrowLeft aria-hidden="true" /> Back to Build</Link><span>Live preview</span><div role="group" aria-label="Choose light or dark"><button type="button" aria-pressed={!dark} onClick={() => setDark(false)}><Sun aria-hidden="true" /> Light</button><button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon aria-hidden="true" /> Dark</button></div></header><div className="published-preview__stage"><ProjectCanvas project={project} assets={assets} page={page} onPageChange={setPage} mode={dark ? "dark" : "light"} /></div></main>
}
