"use client"

import { ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { ProjectCanvas } from "@/components/project-canvas"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StudioNav } from "@/components/studio-nav"
import { createStudioProject, templateFamilies, type ProjectType } from "@/lib/project-studio"
import type { StudioAsset } from "@/lib/studio-library"
import { useStudioProjects } from "@/lib/use-studio-projects"

export function TemplateFoundry({ assets }: { assets: StudioAsset[] }) {
  const router = useRouter()
  const { createProject } = useStudioProjects()
  const [filter, setFilter] = useState<"All" | ProjectType>("All")
  const visible = templateFamilies.filter((family) => filter === "All" || family.type === filter)

  function startFromTemplate(id: string) {
    const family = templateFamilies.find((item) => item.id === id) ?? templateFamilies[1]
    const project = createProject(createStudioProject({
      id: undefined,
      name: `${family.name} project`,
      type: family.type,
      templateId: family.id,
      paletteId: family.accent,
    }))
    router.push(`/build?project=${project.id}`)
  }

  return (
    <div className="suite-shell templates-shell">
      <SiteHeader />
      <StudioNav />
      <main className="templates-main">
        <header className="templates-opening">
          <p>Template Foundry</p>
          <h1>Eight complete systems. Forty working screens.</h1>
          <div><span><strong>8</strong> project families</span><span><strong>40</strong> complete screens</span><span><strong>128</strong> interface pieces underneath</span></div>
        </header>

        <div className="template-filter" role="group" aria-label="Filter template systems">
          {["All", ...templateFamilies.map((family) => family.type)].map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item as "All" | ProjectType)}>{item}</button>)}
        </div>

        <section className="template-grid" aria-label="Complete template systems">
          {visible.map((family, index) => {
            const specimen = createStudioProject({
              id: `specimen-${family.id}`,
              name: family.name,
              type: family.type,
              templateId: family.id,
              paletteId: family.accent,
            })
            return (
              <article className={index % 3 === 0 ? "template-card template-card--wide" : "template-card"} key={family.id}>
                <ProjectCanvas project={specimen} assets={assets} page={family.pages[0]} compact />
                <div className="template-card__copy">
                  <span>{family.type}</span>
                  <h2>{family.name}</h2>
                  <strong>{family.promise}</strong>
                  <p>{family.description}</p>
                  <div className="template-pages">{family.pages.map((page) => <span key={page}>{page}</span>)}</div>
                  <ul>{family.includes.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                  <button className="suite-primary" type="button" onClick={() => startFromTemplate(family.id)}>Use this system <ArrowRight aria-hidden="true" /></button>
                </div>
              </article>
            )
          })}
        </section>
      </main>
      <SiteFooter note="Each system begins complete and stays fully adjustable." />
    </div>
  )
}
