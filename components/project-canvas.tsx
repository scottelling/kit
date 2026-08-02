"use client"

import { Check } from "lucide-react"
import type { CSSProperties } from "react"
import { useState } from "react"

import { getPalette, getTemplateFamily, projectPreviewCopy, type StudioProject } from "@/lib/project-studio"
import type { StudioAsset } from "@/lib/studio-library"
import { themeColorString, themeDepthShadow, themeFontStack, type WorkshopMode } from "@/lib/theme-workshop"

type ProjectCanvasProps = {
  project: StudioProject
  assets: StudioAsset[]
  page: string
  onPageChange?: (page: string) => void
  compact?: boolean
  mode?: WorkshopMode
}

export function ProjectCanvas({ project, assets, page, onPageChange, compact = false, mode = "light" }: ProjectCanvasProps) {
  const [acted, setActed] = useState(false)
  const family = getTemplateFamily(project.templateId)
  const palette = getPalette(assets, project.paletteId)
  const copy = projectPreviewCopy(project, page)
  const variant = project.themeVariant?.applied ? project.themeVariant : null
  const theme = variant?.[mode]
  const style = {
    "--canvas-paper": theme ? themeColorString(theme.canvas) : palette?.colors?.[0] ?? "var(--background)",
    "--canvas-plane": theme ? themeColorString(theme.raised) : palette?.colors?.[1] ?? "var(--plane-1)",
    "--canvas-accent": theme ? themeColorString(theme.action) : palette?.colors?.[2] ?? "var(--primary)",
    "--canvas-muted": theme ? themeColorString(theme.mutedInk) : palette?.colors?.[3] ?? "var(--muted-foreground)",
    "--canvas-ink": theme ? themeColorString(theme.ink) : palette?.colors?.[4] ?? "var(--foreground)",
    "--canvas-accent-ink": theme ? themeColorString(theme.actionInk) : palette?.accentInk ?? palette?.colors?.[0] ?? "var(--primary-foreground)",
    "--canvas-border": theme ? themeColorString(theme.line) : palette?.colors?.[3] ?? "var(--border)",
    "--canvas-radius": variant ? `${variant.radius + 6}px` : "var(--radius-card)",
    "--canvas-density": variant?.density ?? 1,
    "--canvas-shadow": variant ? themeDepthShadow(variant, mode) : "var(--shadow-panel)",
    "--canvas-font": variant ? themeFontStack(variant.typeStyle) : "var(--font-relay-sans)",
  } as CSSProperties

  return (
    <section className={`project-canvas${compact ? " project-canvas--compact" : ""}`} data-family={family.id} data-theme-copy={variant ? "applied" : "original"} style={style} aria-label={`${project.name} preview`}>
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
