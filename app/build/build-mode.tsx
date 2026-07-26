"use client"

import { ArrowRight, Check, Circle, ExternalLink, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import { ProjectCanvas } from "@/components/project-canvas"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StudioNav } from "@/components/studio-nav"
import { defaultBriefs, getTemplateFamily, projectShareQuery, projectTones, projectTypes, templateFamilies, type ProjectTone, type ProjectType, type StudioProject } from "@/lib/project-studio"
import type { StudioAsset } from "@/lib/studio-library"
import { useStudioProjects } from "@/lib/use-studio-projects"

type BuildModeProps = {
  assets: StudioAsset[]
  initialProject: StudioProject
  projectId: string | null
}

const buildSteps = ["Brief understood", "Direction locked", "System assembled", "Pages composed", "Quality checked"]

export function BuildMode({ assets, initialProject, projectId }: BuildModeProps) {
  const { projects, ready, saveProject } = useStudioProjects()
  const savedProject = projects.find((item) => item.id === projectId)
  const source = savedProject ?? initialProject

  if (projectId && !ready) return <div className="suite-shell build-shell"><SiteHeader /><StudioNav /><main className="suite-loading"><strong>Opening your project.</strong><p>Its brief, system, screens, and history are staying together.</p></main><SiteFooter /></div>

  return <BuildEditor key={source.id} assets={assets} initialProject={source} saveProject={saveProject} />
}

function BuildEditor({ assets, initialProject, saveProject }: { assets: StudioAsset[]; initialProject: StudioProject; saveProject: (project: StudioProject) => StudioProject }) {
  const router = useRouter()
  const [project, setProject] = useState(initialProject)
  const [page, setPage] = useState(() => getTemplateFamily(initialProject.templateId).pages[0])
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildStage, setBuildStage] = useState(initialProject.status === "built" || initialProject.status === "approved" ? buildSteps.length : 0)
  const [touched, setTouched] = useState(false)
  const [saved, setSaved] = useState(initialProject.status !== "draft")

  const family = getTemplateFamily(project.templateId)
  const briefError = touched && project.brief.trim().length < 40
  const nameError = touched && (project.name.trim().length < 2 || project.name === "Untitled project")
  const palettes = useMemo(() => assets.filter((asset) => asset.category === "Palettes"), [assets])

  function update(patch: Partial<StudioProject>) {
    setProject((current) => ({ ...current, ...patch, status: "draft", previewPublished: false }))
    setSaved(false)
    setBuildStage(0)
  }

  function chooseType(type: ProjectType) {
    const nextFamily = templateFamilies.find((item) => item.type === type) ?? templateFamilies[1]
    update({ type, templateId: nextFamily.id, paletteId: nextFamily.accent, brief: defaultBriefs[type] })
    setPage(nextFamily.pages[0])
  }

  async function buildProject() {
    setTouched(true)
    if (project.brief.trim().length < 40 || project.name.trim().length < 2 || project.name === "Untitled project") return
    setIsBuilding(true)
    setBuildStage(0)
    try {
      for (let index = 1; index <= buildSteps.length; index += 1) {
        await new Promise((resolve) => window.setTimeout(resolve, 180))
        setBuildStage(index)
      }
      const built = saveProject({ ...project, status: "built" })
      setProject(built)
      setSaved(true)
    } finally {
      setIsBuilding(false)
    }
  }

  function saveDraft() {
    setTouched(true)
    if (project.name.trim().length < 2 || project.name === "Untitled project") return
    const next = saveProject(project)
    setProject(next)
    setSaved(true)
  }

  function publishPreview() {
    const published = saveProject({ ...project, status: project.status === "draft" ? "built" : project.status, previewPublished: true })
    setProject(published)
    router.push(`/preview?${projectShareQuery(published)}`)
  }

  return (
    <div className="suite-shell build-shell">
      <SiteHeader />
      <StudioNav />
      <main className="build-main">
        <section className="build-intro" aria-labelledby="build-title">
          <div><p>Build Mode</p><h1 id="build-title">Describe it. Shape it. See it working.</h1></div>
          <p>The Studio turns your brief into a complete project system with five real pages, live visual choices, saved history, and a shareable preview.</p>
        </section>

        <section className="build-split" aria-label="Project builder">
          <div className="build-controls">
            <div className="build-field">
              <label htmlFor="build-name">Project name</label>
              <input id="build-name" value={project.name} aria-invalid={nameError} aria-describedby="build-name-help" onBlur={() => setTouched(true)} onChange={(event) => update({ name: event.target.value })} />
              <p id="build-name-help" className={nameError ? "is-error" : undefined}>{nameError ? "Give this project a real name so it can be saved." : "This becomes the name in Projects and the live preview."}</p>
            </div>

            <div className="build-field">
              <label htmlFor="build-brief">What are you making?</label>
              <textarea id="build-brief" value={project.brief} aria-invalid={briefError} aria-describedby="build-brief-help" onBlur={() => setTouched(true)} onChange={(event) => update({ brief: event.target.value })} />
              <p id="build-brief-help" className={briefError ? "is-error" : undefined}>{briefError ? "Add who it is for, what it should help them do, and what must feel clear." : "Use ordinary language. The Studio carries the design rules."}</p>
            </div>

            <fieldset className="build-choice">
              <legend>Project type</legend>
              <div>{projectTypes.map((type) => <button key={type} type="button" aria-pressed={project.type === type} onClick={() => chooseType(type)}>{type}</button>)}</div>
            </fieldset>

            <fieldset className="build-choice">
              <legend>Tone</legend>
              <div>{projectTones.map((tone) => <button key={tone} type="button" aria-pressed={project.tone === tone} onClick={() => update({ tone: tone as ProjectTone })}>{tone}</button>)}</div>
            </fieldset>

            <div className="build-two-up">
              <label>Color system<select value={project.paletteId} onChange={(event) => update({ paletteId: event.target.value })}>{palettes.map((palette) => <option value={palette.id} key={palette.id}>{palette.name}</option>)}</select></label>
              <label>Direction<select value={project.direction} onChange={(event) => update({ direction: event.target.value })}><option>Instant clarity</option><option>Editorial confidence</option><option>Technical character</option></select></label>
            </div>

            <div className="build-actions">
              <button className="suite-primary" type="button" disabled={isBuilding} onClick={buildProject}>{isBuilding ? "Building project" : buildStage === buildSteps.length ? "Rebuild project" : "Build project"}<ArrowRight aria-hidden="true" /></button>
              <button className="suite-secondary" type="button" onClick={saveDraft}><Save aria-hidden="true" /> {saved ? "Saved" : "Save draft"}</button>
            </div>

            <ol className="build-progress" aria-label="Build progress" aria-live="polite">
              {buildSteps.map((step, index) => <li key={step} data-complete={buildStage > index}>{buildStage > index ? <Check aria-hidden="true" /> : <Circle aria-hidden="true" />}<span>{step}</span></li>)}
            </ol>
          </div>

          <div className="build-preview">
            <div className="build-preview__heading"><div><span>Live project</span><strong>{family.name}</strong></div><span>{family.pages.length} complete screens</span></div>
            <ProjectCanvas project={project} assets={assets} page={page} onPageChange={setPage} />
            <div className="build-preview__actions">
              <button className="suite-primary" type="button" disabled={buildStage !== buildSteps.length} onClick={publishPreview}><ExternalLink aria-hidden="true" /> Open live preview</button>
              <button className="suite-secondary" type="button" onClick={() => router.push("/labs")}>Tune the system</button>
            </div>
            {buildStage !== buildSteps.length ? <p className="build-preview__note">Build the project to open its shareable preview.</p> : null}
          </div>
        </section>
      </main>
      <SiteFooter note="The project stays saved on this device." />
    </div>
  )
}
