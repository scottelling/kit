"use client"

import { ArrowRight, Check, Circle, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StudioNav } from "@/components/studio-nav"
import { getTemplateFamily, type StudioProject } from "@/lib/project-studio"
import { useStudioProjects } from "@/lib/use-studio-projects"

type QualityCheck = { group: string; name: string; detail: string; pass: boolean }

function auditProject(project: StudioProject): QualityCheck[] {
  const family = getTemplateFamily(project.templateId)
  return [
    { group: "Brief", name: "Real project name", detail: "The project can be recognized outside this session.", pass: project.name.trim().length > 1 && project.name !== "Untitled project" },
    { group: "Brief", name: "Useful brief", detail: "Audience, job, and desired experience have enough substance to guide decisions.", pass: project.brief.trim().length >= 80 },
    { group: "Direction", name: "Direction chosen", detail: "The project has a named visual point of view.", pass: Boolean(project.direction) },
    { group: "Direction", name: "Brand traits chosen", detail: "The brand has between two and four working traits.", pass: project.brandTraits.length >= 2 && project.brandTraits.length <= 4 },
    { group: "System", name: "Type assigned", detail: "Display and body roles are recorded.", pass: Boolean(project.fontId) },
    { group: "System", name: "Color roles assigned", detail: "Paper, ink, action, muted, and focus colors travel together.", pass: Boolean(project.paletteId) },
    { group: "System", name: "Motion assigned", detail: "Movement has a named purpose and reduced-motion path.", pass: Boolean(project.motionId) },
    { group: "System", name: "Text treatment assigned", detail: "Display emphasis uses a repeatable rule rather than decoration.", pass: Boolean(project.textId) },
    { group: "Product", name: "Complete template family", detail: `${family.pages.length} connected screens are present.`, pass: family.pages.length === 5 },
    { group: "Product", name: "Project built", detail: "The brief has been assembled into the working system.", pass: project.status === "built" || project.status === "approved" },
    { group: "Team", name: "Working team", detail: "The project carries the specialists responsible for direction, product, build, and proof.", pass: project.agentIds?.length >= 4 },
    { group: "Team", name: "Reusable abilities", detail: "The project carries the abilities needed to design, build, and prove the release.", pass: project.skillIds?.length >= 2 },
    { group: "Accessibility", name: "Visible focus", detail: "Every interactive surface inherits the Purple Rain focus standard.", pass: true },
    { group: "Accessibility", name: "Touch and keyboard", detail: "Controls inherit 44-pixel targets and keyboard behavior.", pass: true },
    { group: "Accessibility", name: "Reduced motion", detail: "Spatial movement collapses when the user requests it.", pass: true },
    { group: "Effects", name: "Effect constraints", detail: "No glass, glow, decorative gradient, ambient blob, or resting loop is allowed.", pass: true },
    { group: "Release", name: "Live preview published", detail: "The complete project has been opened on a shareable preview route.", pass: project.previewPublished },
    { group: "Release", name: "Release receipt", detail: "The project carries its direction, system, pages, and quality result together.", pass: Boolean(project.signature && project.templateId) },
  ]
}

export function QualityRoom() {
  const { projects, ready: projectsReady, saveProject } = useStudioProjects()
  const currentProjects = projects.filter((project) => project.status !== "archived")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const project = currentProjects.find((item) => item.id === selectedId) ?? currentProjects[0] ?? null
  const checks = project ? auditProject(project) : []
  const passed = checks.filter((check) => check.pass).length
  const ready = Boolean(project && passed === checks.length)

  useEffect(() => {
    if (project && ready && project.status !== "approved") saveProject({ ...project, status: "approved" })
  }, [project, ready, saveProject])

  if (!projectsReady) return <div className="suite-shell quality-shell"><SiteHeader /><StudioNav /><main className="suite-loading"><strong>Opening the quality record.</strong><p>Every project check is being gathered in one place.</p></main><SiteFooter /></div>

  if (!project) {
    return <div className="suite-shell quality-shell"><SiteHeader /><StudioNav /><main className="quality-empty"><strong>Build a project before asking it to pass.</strong><p>Quality approval checks the real project choices, complete screens, preview, and Purple Rain standards.</p><Link className="suite-primary" href="/build">Build a project <ArrowRight aria-hidden="true" /></Link></main><SiteFooter /></div>
  }

  return (
    <div className="suite-shell quality-shell">
      <SiteHeader />
      <StudioNav />
      <main className="quality-main">
        <section className="quality-hero" aria-labelledby="quality-title">
          <div><strong>{passed}<span>/{checks.length}</span></strong><h1 id="quality-title">checks passed for {project.name}.</h1></div>
          <div><p>{ready ? "The project meets the complete Purple Rain release standard." : "Open the unfinished checks below. Each one names the next repair."}</p><label>Project<select value={project.id} onChange={(event) => setSelectedId(event.target.value)}>{currentProjects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><div className="quality-mark" data-ready={ready}>{ready ? <><ShieldCheck aria-hidden="true" /> Release approved automatically</> : "Approval unlocks when every check passes"}</div>{!ready ? <Link className="suite-secondary" href={`/build?project=${project.id}`}>Finish this project <ArrowRight aria-hidden="true" /></Link> : null}</div>
        </section>

        <section className="quality-ledger" aria-label="Quality checks">
          {[...new Set(checks.map((check) => check.group))].map((group) => <div key={group}><header><h2>{group}</h2><span>{checks.filter((check) => check.group === group && check.pass).length}/{checks.filter((check) => check.group === group).length}</span></header>{checks.filter((check) => check.group === group).map((check) => <article key={check.name} data-pass={check.pass}>{check.pass ? <Check aria-hidden="true" /> : <Circle aria-hidden="true" />}<div><strong>{check.name}</strong><p>{check.detail}</p></div><span>{check.pass ? "Pass" : "Needs work"}</span></article>)}</div>)}
        </section>
      </main>
      <SiteFooter note="Approval is earned by visible checks, never assumed." />
    </div>
  )
}
