"use client"

import { Archive, ArrowRight, Copy, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StudioNav } from "@/components/studio-nav"
import type { ProjectStatus } from "@/lib/project-studio"
import { useStudioProjects } from "@/lib/use-studio-projects"

const filters: ("all" | ProjectStatus)[] = ["all", "draft", "built", "approved", "archived"]

export function ProjectsRoom() {
  const router = useRouter()
  const { projects, ready, createProject, duplicateProject, archiveProject } = useStudioProjects()
  const [filter, setFilter] = useState<(typeof filters)[number]>("all")
  const visible = projects.filter((project) => filter === "all" ? project.status !== "archived" : project.status === filter)

  function startProject() {
    const project = createProject()
    router.push(`/build?project=${project.id}`)
  }

  function duplicate(id: string) {
    const project = duplicateProject(id)
    if (project) router.push(`/build?project=${project.id}`)
  }

  if (!ready) return <div className="suite-shell projects-shell"><SiteHeader /><StudioNav /><main className="suite-loading"><strong>Opening saved projects.</strong><p>Drafts, built work, approvals, and archives are staying together.</p></main><SiteFooter /></div>

  return (
    <div className="suite-shell projects-shell">
      <SiteHeader />
      <StudioNav />
      <main className="projects-main">
        <header className="projects-opening">
          <div><p>Saved work</p><h1>Projects, with their decisions intact.</h1></div>
          <button className="suite-primary" type="button" onClick={startProject}>Start a project <ArrowRight aria-hidden="true" /></button>
        </header>

        <div className="projects-filter" role="group" aria-label="Filter projects">
          {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === "all" ? "Current" : item[0].toUpperCase() + item.slice(1)} <span>{item === "all" ? projects.filter((project) => project.status !== "archived").length : projects.filter((project) => project.status === item).length}</span></button>)}
        </div>

        <section className="project-index" aria-label="Saved projects">
          {visible.map((project) => (
            <article key={project.id}>
              <Link href={`/build?project=${project.id}`}>
                <span>{project.type}</span>
                <strong>{project.name}</strong>
                <small>{project.tone} · {project.direction} · {project.status}</small>
                <ArrowRight aria-hidden="true" />
              </Link>
              <div>
                <button type="button" onClick={() => duplicate(project.id)}><Copy aria-hidden="true" /> Duplicate</button>
                <button type="button" onClick={() => archiveProject(project.id)}>{project.status === "archived" ? <RotateCcw aria-hidden="true" /> : <Archive aria-hidden="true" />}{project.status === "archived" ? "Restore" : "Archive"}</button>
              </div>
            </article>
          ))}
          {visible.length === 0 ? <div className="projects-empty"><strong>{projects.length ? "No projects in this view." : "No projects yet."}</strong><p>{projects.length ? "Choose another project state, or start something new." : "Build Mode will keep every direction and visual choice together here."}</p><button className="suite-primary" type="button" onClick={startProject}>Start the first project</button></div> : null}
        </section>
      </main>
      <SiteFooter note="Drafts, built work, approvals, and archives stay together." />
    </div>
  )
}
