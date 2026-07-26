"use client"

import { Check } from "lucide-react"
import type { CSSProperties } from "react"
import { useState } from "react"

import { getPalette, getTemplateFamily, projectPreviewCopy, type StudioProject } from "@/lib/project-studio"
import type { StudioAsset } from "@/lib/studio-library"

type ProjectCanvasProps = {
  project: StudioProject
  assets: StudioAsset[]
  page: string
  onPageChange?: (page: string) => void
  compact?: boolean
}

export function ProjectCanvas({ project, assets, page, onPageChange, compact = false }: ProjectCanvasProps) {
  const [acted, setActed] = useState(false)
  const family = getTemplateFamily(project.templateId)
  const palette = getPalette(assets, project.paletteId)
  const copy = projectPreviewCopy(project, page)
  const style = {
    "--canvas-paper": palette?.colors?.[0] ?? "var(--background)",
    "--canvas-plane": palette?.colors?.[1] ?? "var(--plane-1)",
    "--canvas-accent": palette?.colors?.[2] ?? "var(--primary)",
    "--canvas-muted": palette?.colors?.[3] ?? "var(--muted-foreground)",
    "--canvas-ink": palette?.colors?.[4] ?? "var(--foreground)",
    "--canvas-accent-ink": palette?.accentInk ?? palette?.colors?.[0] ?? "var(--primary-foreground)",
  } as CSSProperties

  return (
    <section className={`project-canvas${compact ? " project-canvas--compact" : ""}`} data-family={family.id} style={style} aria-label={`${project.name} preview`}>
      <header className="project-canvas__header">
        <strong>{project.name || "Untitled project"}</strong>
        <span>{project.tone} · {project.direction}</span>
      </header>
      <nav className="project-canvas__pages" aria-label="Preview pages">
        {family.pages.map((item) => (
          <button key={item} type="button" aria-pressed={page === item} onClick={() => { setActed(false); onPageChange?.(item) }}>{item}</button>
        ))}
      </nav>
      <div className="project-canvas__body">
        <span>{copy.label}</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
        <button type="button" onClick={() => setActed(true)}>{acted ? <><Check aria-hidden="true" /> Action recorded</> : copy.action}</button>
      </div>
      <footer className="project-canvas__footer">
        <span>{family.name}</span>
        <span>{project.signature}</span>
      </footer>
    </section>
  )
}
