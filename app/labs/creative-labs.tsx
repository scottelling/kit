"use client"

import { Check, Play } from "lucide-react"
import type { CSSProperties } from "react"
import { useEffect, useState } from "react"

import { ProjectCanvas } from "@/components/project-canvas"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StudioNav } from "@/components/studio-nav"
import { getAsset, getTemplateFamily, type StudioProject } from "@/lib/project-studio"
import type { StudioAsset, StudioCategory } from "@/lib/studio-library"
import { useStudioProjects } from "@/lib/use-studio-projects"

import { ThemeWorkshop } from "./theme-workshop"

const labs = ["Theme", "Brand", "Type", "Color", "Text", "Motion"] as const
type Lab = (typeof labs)[number]

const brandTraits = ["Clear", "Tactile", "Exact", "Warm", "Bold", "Quiet", "Playful", "Editorial", "Technical", "Luxurious"]
const signatures = ["Project receipt", "Structural rule", "Labeled frame", "Decision underline", "Numbered path"]

export function CreativeLabs({ assets }: { assets: StudioAsset[] }) {
  const { projects, ready, createProject, saveProject } = useStudioProjects()
  const project = projects.find((item) => item.status !== "archived") ?? null
  const [lab, setLab] = useState<Lab>("Theme")
  const [motionRun, setMotionRun] = useState(0)
  const page = project ? getTemplateFamily(project.templateId).pages[0] : "Overview"

  useEffect(() => {
    if (ready && !project) createProject({ name: "Theme Workshop", type: "Product app", status: "built" })
  }, [createProject, project, ready])

  function update(patch: Record<string, unknown>) {
    if (project) saveProject({ ...project, ...patch, status: project.status === "approved" ? "built" : project.status })
  }

  function toggleTrait(trait: string) {
    if (!project) return
    const next = project.brandTraits.includes(trait) ? project.brandTraits.filter((item) => item !== trait) : [...project.brandTraits, trait].slice(-4)
    update({ brandTraits: next })
  }

  if (!ready) return <div className="suite-shell labs-shell"><SiteHeader /><StudioNav /><main className="suite-loading"><strong>Opening Theme Workshop.</strong><p>Your latest project choices are coming with it.</p></main><SiteFooter /></div>

  if (!project) return <div className="suite-shell labs-shell"><SiteHeader /><StudioNav /><main className="suite-loading"><strong>Preparing Theme Workshop.</strong><p>A safe Purple Rain copy is being attached to a real project surface.</p></main><SiteFooter /></div>

  const font = getAsset(assets, project.fontId)
  const palette = getAsset(assets, project.paletteId)
  const text = getAsset(assets, project.textId)
  const motion = getAsset(assets, project.motionId)

  return (
    <div className="suite-shell labs-shell">
      <SiteHeader />
      <StudioNav />
      <main className={`labs-main labs-main--${lab.toLowerCase()}`}>
        <header className="labs-opening">
          <div><p>{lab === "Theme" ? "Theme Workshop" : "Creative Labs"}</p><h1>{lab === "Theme" ? "Shape a copy. Keep the original safe." : "Change the system. Watch the project follow."}</h1></div>
          <div><span>{project.name}</span><strong>{project.brandTraits.join(" · ")}</strong></div>
        </header>

        <div className="labs-tabs" role="tablist" aria-label="Creative labs">
          {labs.map((item) => <button key={item} type="button" role="tab" aria-selected={lab === item} onClick={() => setLab(item)}>{item}</button>)}
        </div>

        <section className={`lab-workspace${lab === "Theme" ? " lab-workspace--theme" : ""}`}>
          {lab === "Theme" ? <ThemeWorkshop project={project} update={update} /> : <>
            <div className="lab-controls">
              {lab === "Brand" ? <BrandLab project={project} toggleTrait={toggleTrait} update={update} /> : null}
              {lab === "Type" ? <AssetLab title="Type pairings" category="Fonts" selectedId={project.fontId} assets={assets} onChoose={(id) => update({ fontId: id })} /> : null}
              {lab === "Color" ? <AssetLab title="Color systems" category="Palettes" selectedId={project.paletteId} assets={assets} onChoose={(id) => update({ paletteId: id })} /> : null}
              {lab === "Text" ? <AssetLab title="Text treatments" category="Text" selectedId={project.textId} assets={assets} onChoose={(id) => update({ textId: id })} /> : null}
              {lab === "Motion" ? <AssetLab title="Movement recipes" category="Motion" selectedId={project.motionId} assets={assets} onChoose={(id) => update({ motionId: id })} /> : null}
            </div>

            <div className="lab-specimen">
              {lab === "Brand" ? <div className="brand-specimen"><span>{project.brandTraits.join(" · ")}</span><h2>{project.name}</h2><p>{project.brief}</p><i>{project.signature}</i></div> : null}
              {lab === "Type" ? <div className="type-specimen"><span>{font?.summary}</span><h2>The current object and next action stay obvious.</h2><p>Clear at a glance. Calm under pressure. Complete in every state.</p><i>{font?.source}</i></div> : null}
              {lab === "Color" && palette?.colors ? <div className="color-specimen"><div>{palette.colors.map((color) => <i key={color} style={{ "--lab-color": color } as CSSProperties} />)}</div><h2>{palette.name}</h2><p>{palette.detail}</p></div> : null}
              {lab === "Text" ? <div className={`text-specimen text-specimen--${text?.id}`}><span>{text?.name}</span><h2>{text?.sample ?? "Make the next move obvious."}</h2><p>{text?.detail}</p></div> : null}
              {lab === "Motion" ? <div className="motion-specimen"><span>{motion?.name}</span><div key={motionRun} data-motion={motion?.motion}><i /></div><p>{motion?.detail}</p><button type="button" onClick={() => setMotionRun((value) => value + 1)}><Play aria-hidden="true" /> Play once</button></div> : null}
              <ProjectCanvas project={project} assets={assets} page={page} compact />
            </div>
          </>}
        </section>
      </main>
      <SiteFooter note="Every lab choice returns to the same saved project." />
    </div>
  )
}

function BrandLab({ project, toggleTrait, update }: { project: StudioProject; toggleTrait: (trait: string) => void; update: (patch: Record<string, unknown>) => void }) {
  return <div className="brand-lab"><h2>Brand foundation</h2><fieldset><legend>Choose up to four traits</legend><div>{brandTraits.map((trait) => <button key={trait} type="button" aria-pressed={project.brandTraits.includes(trait)} onClick={() => toggleTrait(trait)}>{project.brandTraits.includes(trait) ? <Check aria-hidden="true" /> : null}{trait}</button>)}</div></fieldset><label>Voice: direct <input type="range" min="0" max="100" value={project.voiceLevel} onChange={(event) => update({ voiceLevel: Number(event.target.value) })} /> expressive</label><fieldset><legend>Signature detail</legend><div>{signatures.map((signature) => <button key={signature} type="button" aria-pressed={project.signature === signature} onClick={() => update({ signature })}>{signature}</button>)}</div></fieldset></div>
}

function AssetLab({ title, category, selectedId, assets, onChoose }: { title: string; category: StudioCategory; selectedId: string; assets: StudioAsset[]; onChoose: (id: string) => void }) {
  return <div className="asset-lab"><h2>{title}</h2><div>{assets.filter((asset) => asset.category === category).map((asset) => <button key={asset.id} type="button" aria-pressed={selectedId === asset.id} onClick={() => onChoose(asset.id)}><strong>{asset.name}</strong><span>{asset.summary}</span>{selectedId === asset.id ? <Check aria-hidden="true" /> : null}</button>)}</div></div>
}
