"use client"

import {
  ArrowRight,
  Check,
  ChevronRight,
  Moon,
  Play,
  Search,
  Sun,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import type { CSSProperties } from "react"
import { useMemo, useRef, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { createStudioProject, templateFamilies, type ProjectTone, type ProjectType } from "@/lib/project-studio"
import type { StudioAsset, StudioCategory } from "@/lib/studio-library"
import { useStudioProjects } from "@/lib/use-studio-projects"

type StudioExperienceProps = {
  assets: StudioAsset[]
  categories: { name: StudioCategory; plain: string }[]
  counts: Record<StudioCategory, number>
}

const projectTypes = ["Landing page", "Product app", "Online store", "Publication", "Portfolio", "Documentation", "Marketplace", "Campaign"]
const tones = ["Precise", "Warm", "Bold", "Quiet", "Playful", "Editorial", "Technical", "Luxurious"]

const directions = [
  {
    name: "Instant clarity",
    note: "Direct, tactile, and easy to trust at first glance.",
    font: "relay-geist",
    palette: "purple-rain",
    motion: "press",
    text: "solid-display",
  },
  {
    name: "Editorial confidence",
    note: "More voice and reading rhythm, with the actions still obvious.",
    font: "relay-newsreader",
    palette: "mulberry-paper",
    motion: "quiet-enter",
    text: "editorial-lead",
  },
  {
    name: "Technical character",
    note: "Sharper structure, compact language, and fast state changes.",
    font: "space-relay",
    palette: "ink-orchid",
    motion: "state-swap",
    text: "mono-receipt",
  },
]

const defaultBrief = "A calm planning product for small creative teams. It should make today’s work obvious, keep decisions together, and feel considered without feeling precious."

function assetById(assets: StudioAsset[], id: string) {
  return assets.find((asset) => asset.id === id) ?? assets[0]
}

function projectCopy(type: string) {
  const copy: Record<string, { label: string; title: string; body: string; action: string }> = {
    "Landing page": { label: "A clear first meeting", title: "The work, understood in one visit.", body: "A focused story connects the offer, the proof, and the next decision without making the visitor hunt.", action: "See the full story" },
    "Product app": { label: "Today’s workspace", title: "Three decisions need you.", body: "Everything else can wait. Review the open work, make the call, and keep the team moving.", action: "Review decisions" },
    "Online store": { label: "New collection", title: "Objects worth keeping.", body: "Materials, dimensions, delivery, and the reason each piece exists—together before the buying decision.", action: "Explore the collection" },
    Publication: { label: "Saturday edition", title: "What changed while you were working.", body: "A considered reading surface for the stories, analysis, and references worth keeping close.", action: "Read this edition" },
    Portfolio: { label: "Selected work", title: "The decisions behind the surface.", body: "Projects lead. Roles, constraints, collaboration, and outcomes remain close enough to make the work credible.", action: "Open the case study" },
    Documentation: { label: "Start here", title: "Find the answer. Keep your place.", body: "Task-led guidance, useful examples, and recovery paths make the product learnable without a separate course.", action: "Find a guide" },
    Marketplace: { label: "Available this week", title: "Find the right fit without guessing.", body: "Quality, availability, experience, and terms are comparable before either side commits.", action: "Browse matches" },
    Campaign: { label: "One clear idea", title: "Make the moment count.", body: "A single timely action, carried by a distinct point of view and enough proof to make the decision feel grounded.", action: "Join the release" },
  }
  return copy[type] ?? copy["Product app"]
}

export function StudioExperience({ assets, categories, counts }: StudioExperienceProps) {
  const router = useRouter()
  const { createProject } = useStudioProjects()
  const [dark, setDark] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [brief, setBrief] = useState(defaultBrief)
  const [projectType, setProjectType] = useState("Product app")
  const [tone, setTone] = useState("Precise")
  const [direction, setDirection] = useState(0)
  const [fontId, setFontId] = useState(directions[0].font)
  const [paletteId, setPaletteId] = useState(directions[0].palette)
  const [motionId, setMotionId] = useState(directions[0].motion)
  const [textId, setTextId] = useState(directions[0].text)
  const [templateId, setTemplateId] = useState("app-dashboard")
  const [brandIds, setBrandIds] = useState<string[]>(["brand-brief", "voice-system", "signature"])
  const [teamIds, setTeamIds] = useState<string[]>(["agent-director", "agent-product", "agent-engineer", "agent-qa"])
  const [skillIds, setSkillIds] = useState<string[]>(["skill-design-ship", "skill-release-audit"])
  const [category, setCategory] = useState<"All" | StudioCategory>("All")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<StudioAsset | null>(null)
  const [previewTab, setPreviewTab] = useState("Overview")
  const [previewAction, setPreviewAction] = useState(false)
  const [motionRun, setMotionRun] = useState(0)
  const detailRef = useRef<HTMLDialogElement>(null)

  const palette = assetById(assets, paletteId)
  const font = assetById(assets, fontId)
  const motion = assetById(assets, motionId)
  const text = assetById(assets, textId)
  const template = assetById(assets, templateId)
  const project = projectCopy(projectType)

  const visibleAssets = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return assets.filter((asset) => {
      const inCategory = category === "All" || asset.category === category
      const matches = !needle || `${asset.name} ${asset.summary} ${asset.bestFor} ${asset.detail}`.toLowerCase().includes(needle)
      return inCategory && matches
    })
  }, [assets, category, query])

  const groupedAssets = useMemo(() => categories.map(({ name }) => ({
    name,
    items: visibleAssets.filter((asset) => asset.category === name),
  })).filter((group) => group.items.length), [categories, visibleAssets])

  const previewStyle = {
    "--studio-preview-paper": palette.colors?.[0] ?? "var(--background)",
    "--studio-preview-plane": palette.colors?.[1] ?? "var(--plane-2)",
    "--studio-preview-accent": palette.colors?.[2] ?? "var(--primary)",
    "--studio-preview-accent-ink": palette.accentInk ?? palette.colors?.[0] ?? "var(--primary-foreground)",
    "--studio-preview-muted": palette.colors?.[3] ?? "var(--muted-foreground)",
    "--studio-preview-ink": palette.colors?.[4] ?? "var(--foreground)",
  } as CSSProperties

  function chooseDirection(index: number) {
    const choice = directions[index]
    setDirection(index)
    setFontId(choice.font)
    setPaletteId(choice.palette)
    setMotionId(choice.motion)
    setTextId(choice.text)
  }

  function openAsset(asset: StudioAsset) {
    setSelected(asset)
    setMotionRun(0)
    window.requestAnimationFrame(() => detailRef.current?.showModal())
  }

  function closeAsset() {
    detailRef.current?.close()
    setSelected(null)
  }

  function toggleInList(id: string, list: string[], update: (value: string[]) => void) {
    update(list.includes(id) ? list.filter((value) => value !== id) : [...list, id])
  }

  function applyAsset(asset: StudioAsset) {
    if (asset.category === "Fonts") setFontId(asset.id)
    if (asset.category === "Palettes") setPaletteId(asset.id)
    if (asset.category === "Motion") setMotionId(asset.id)
    if (asset.category === "Text") setTextId(asset.id)
    if (asset.category === "Brand") toggleInList(asset.id, brandIds, setBrandIds)
    if (asset.category === "Templates") {
      setTemplateId(asset.id)
      if (asset.id.startsWith("shop")) setProjectType("Online store")
      else if (["publication-home", "article"].includes(asset.id)) setProjectType("Publication")
      else if (["portfolio", "case-study"].includes(asset.id)) setProjectType("Portfolio")
      else if (asset.id === "docs") setProjectType("Documentation")
      else if (asset.id === "marketplace") setProjectType("Marketplace")
      else if (asset.id === "campaign") setProjectType("Campaign")
      else if (asset.id.startsWith("app")) setProjectType("Product app")
      else setProjectType("Landing page")
    }
    if (asset.category === "Prompts" && asset.prompt) {
      setBrief(`${asset.prompt}\n\n${brief}`)
      window.setTimeout(() => document.getElementById("brief")?.scrollIntoView({ behavior: "smooth" }), 0)
    }
    if (asset.category === "Skills") toggleInList(asset.id, skillIds, setSkillIds)
    if (asset.category === "Agents") toggleInList(asset.id, teamIds, setTeamIds)
    closeAsset()
  }

  function assetAction(asset: StudioAsset) {
    if (asset.category === "Prompts") return "Start with this prompt"
    if (asset.category === "Agents") return teamIds.includes(asset.id) ? "Remove from team" : "Add to team"
    if (asset.category === "Skills") return skillIds.includes(asset.id) ? "Remove skill" : "Add skill"
    if (asset.category === "Brand") return brandIds.includes(asset.id) ? "Remove brand tool" : "Add brand tool"
    if (asset.category === "Templates") return "Use this starting point"
    return `Use this ${asset.category.toLowerCase().replace(/s$/, "")}`
  }

  function buildProject() {
    const type = projectType as ProjectType
    const family = templateFamilies.find((item) => item.type === type) ?? templateFamilies[1]
    const created = createProject(createStudioProject({
      name: projectName.trim() || `${projectType} project`,
      brief,
      type,
      tone: tone as ProjectTone,
      direction: directions[direction].name,
      fontId,
      paletteId,
      motionId,
      textId,
      templateId: family.id,
      brandToolIds: brandIds,
      skillIds,
      agentIds: teamIds,
    }))
    router.push(`/build?project=${created.id}`)
  }

  return (
    <div className={`studio-shell${dark ? " dark" : ""}`}>
      <SiteHeader />
      <main>
        <section className="studio-opening" id="brief" aria-labelledby="studio-title">
          <div className="studio-opening__intro">
            <p>Describe the project. Shape the system. Take it live.</p>
            <h1 id="studio-title">The whole design studio, in one place.</h1>
            <p>Start in plain English. Purple Rain turns the idea into a coherent direction, complete interface system, working team, and release plan.</p>
            <div className="studio-proof" aria-label="Studio inventory">
              <span><strong>{assets.length}</strong> studio tools</span>
              <span><strong>128</strong> interface pieces</span>
              <span><strong>1</strong> joined-up system</span>
            </div>
          </div>

          <div className="brief-workbench">
            <label htmlFor="project-name">Project name</label>
            <input id="project-name" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder={`${projectType} project`} />
            <label htmlFor="project-brief">What are you making?</label>
            <textarea id="project-brief" value={brief} onChange={(event) => setBrief(event.target.value)} />
            <div className="brief-choice">
              <span>What kind of project?</span>
              <div role="group" aria-label="Choose a project type">
                {projectTypes.map((type) => <button key={type} type="button" aria-pressed={projectType === type} onClick={() => setProjectType(type)}>{type}</button>)}
              </div>
            </div>
            <div className="brief-choice">
              <span>How should it feel?</span>
              <div role="group" aria-label="Choose a tone">
                {tones.map((item) => <button key={item} type="button" aria-pressed={tone === item} onClick={() => setTone(item)}>{item}</button>)}
              </div>
            </div>
            <a className="studio-primary" href="#direction">Shape this project <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <nav className="stage-rail" aria-label="Project stages">
          {[
            ["01", "Brief", "brief"],
            ["02", "Direction", "direction"],
            ["03", "System", "system"],
            ["04", "Library", "library"],
            ["05", "Team", "team"],
            ["06", "Ship", "ship"],
          ].map(([number, label, href]) => <a key={href} href={`#${href}`}><span>{number}</span>{label}</a>)}
        </nav>

        <section className="studio-stage studio-stage--direction" id="direction" aria-labelledby="direction-title">
          <header className="stage-heading">
            <span>02 · Direction</span>
            <h2 id="direction-title">Choose the point of view.</h2>
            <p>These routes change the system, not just the mood. Pick one, then tune every part below.</p>
          </header>
          <div className="direction-workspace">
            <div className="direction-list" role="radiogroup" aria-label="Choose a visual direction">
              {directions.map((item, index) => (
                <button key={item.name} type="button" role="radio" aria-checked={direction === index} onClick={() => chooseDirection(index)}>
                  <span>0{index + 1}</span>
                  <strong>{item.name}</strong>
                  <small>{item.note}</small>
                  <i>{direction === index ? "Chosen" : "Try this"}</i>
                </button>
              ))}
            </div>

            <div className="project-preview" style={previewStyle}>
              <div className="project-preview__bar">
                <strong>{projectType}</strong>
                <div className="mood-picker" role="group" aria-label="Choose light or dark">
                  <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}><Sun aria-hidden="true" /> Light</button>
                  <button type="button" aria-pressed={dark} onClick={() => setDark(true)}><Moon aria-hidden="true" /> Dark</button>
                </div>
              </div>
              <div className="project-preview__nav" role="tablist" aria-label="Preview screens">
                {["Overview", "Work", "Activity"].map((tab) => <button key={tab} type="button" role="tab" aria-selected={previewTab === tab} onClick={() => setPreviewTab(tab)}>{tab}</button>)}
              </div>
              <div className="project-preview__body" key={`${previewTab}-${direction}`}>
                <span>{project.label}</span>
                <h3>{previewTab === "Overview" ? project.title : previewTab === "Work" ? "The important work stays close." : "Every change has a clear owner."}</h3>
                <p>{previewTab === "Overview" ? project.body : previewTab === "Work" ? "A focused view keeps decisions, supporting context, and the next action in the same place." : "Recent decisions are readable without turning the product into a wall of notifications."}</p>
                <button type="button" onClick={() => setPreviewAction((value) => !value)}>{previewAction ? <><Check aria-hidden="true" /> Added to the plan</> : project.action}</button>
              </div>
              <div className="project-preview__receipt">
                <span>{font.name}</span><span>{palette.name}</span><span>{motion.name}</span><span>{tone}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="studio-stage studio-stage--system" id="system" aria-labelledby="system-title">
          <header className="stage-heading">
            <span>03 · System</span>
            <h2 id="system-title">One direction, carried through.</h2>
            <p>These are the live decisions in your project. Open any part to replace it from the full library.</p>
          </header>
          <div className="system-receipt">
            {[
              ["Type", font],
              ["Color", palette],
              ["Motion", motion],
              ["Text", text],
              ["Starting point", template],
            ].map(([label, value]) => {
              const item = value as StudioAsset
              return <button key={label as string} type="button" onClick={() => openAsset(item)}><span>{label as string}</span><strong>{item.name}</strong><small>{item.summary}</small><ChevronRight aria-hidden="true" /></button>
            })}
          </div>
        </section>

        <section className="studio-stage studio-stage--library" id="library" aria-labelledby="library-title">
          <header className="stage-heading stage-heading--library">
            <div>
              <span>04 · Library</span>
              <h2 id="library-title">Everything the studio can reach for.</h2>
              <p>Search by the thing you are making or the feeling you need. Every result can join the live project above.</p>
            </div>
            <label className="studio-search">
              <Search aria-hidden="true" />
              <span className="sr-only">Search studio tools</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “commerce” or “quiet”" />
              {query ? <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X aria-hidden="true" /></button> : null}
            </label>
          </header>
          <div className="studio-category-rail" role="group" aria-label="Choose a studio area">
            <button type="button" aria-pressed={category === "All"} onClick={() => { setCategory("All"); setQuery("") }}>Everything <span>{assets.length}</span></button>
            {categories.map((item) => <button key={item.name} type="button" aria-pressed={category === item.name} onClick={() => { setCategory(item.name); setQuery("") }}>{item.plain} <span>{counts[item.name]}</span></button>)}
          </div>
          <p className="studio-results" aria-live="polite">Showing {visibleAssets.length} {visibleAssets.length === 1 ? "tool" : "tools"}</p>
          <div className="asset-ledger">
            {groupedAssets.map((group) => (
              <section key={group.name} aria-labelledby={`studio-${group.name.toLowerCase()}`}>
                <header><h3 id={`studio-${group.name.toLowerCase()}`}>{categories.find((item) => item.name === group.name)?.plain}</h3><span>{group.items.length}</span></header>
                <div>
                  {group.items.map((asset) => (
                    <button key={asset.id} type="button" onClick={() => openAsset(asset)}>
                      <strong>{asset.name}</strong><span>{asset.summary}</span><small>{asset.bestFor}</small><ChevronRight aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </section>
            ))}
            {visibleAssets.length === 0 ? <div className="studio-empty"><strong>No tools matched “{query}”.</strong><p>Try a shorter phrase, or return to the complete studio.</p><button type="button" onClick={() => { setQuery(""); setCategory("All") }}>Show all {assets.length} tools</button></div> : null}
          </div>
        </section>

        <section className="studio-stage studio-stage--team" id="team" aria-labelledby="team-title">
          <header className="stage-heading">
            <span>05 · Team</span>
            <h2 id="team-title">A specialist for every hard part.</h2>
            <p>The Design Director holds the whole. Add or remove specialists; the handoff updates with you.</p>
          </header>
          <div className="team-board">
            {assets.filter((asset) => asset.category === "Agents").map((agent, index) => (
              <button className={index === 0 ? "team-card team-card--lead" : "team-card"} key={agent.id} type="button" aria-pressed={teamIds.includes(agent.id)} onClick={() => toggleInList(agent.id, teamIds, setTeamIds)}>
                <span>{teamIds.includes(agent.id) ? <Check aria-hidden="true" /> : `0${index + 1}`}</span>
                <strong>{agent.name}</strong>
                <small>{agent.summary}</small>
                <i>{teamIds.includes(agent.id) ? "On the project" : "Add to project"}</i>
              </button>
            ))}
          </div>
        </section>

        <section className="studio-stage studio-stage--ship" id="ship" aria-labelledby="ship-title">
          <div className="ship-copy">
            <span>06 · Ship</span>
            <h2 id="ship-title">Take this system straight into Build Mode.</h2>
            <p>Your brief, direction, system, starting point, skills, and team stay together as a saved project. Open it, see all five screens, and keep working visually.</p>
            <button className="studio-primary" type="button" onClick={buildProject}>Build this project <ArrowRight aria-hidden="true" /></button>
          </div>
          <div className="project-receipt" aria-label="Complete project receipt">
            <header><strong>{projectType}</strong><span>{tone}</span></header>
            <dl>
              <div><dt>Direction</dt><dd>{directions[direction].name}</dd></div>
              <div><dt>Type</dt><dd>{font.name}</dd></div>
              <div><dt>Color</dt><dd>{palette.name}</dd></div>
              <div><dt>Motion</dt><dd>{motion.name}</dd></div>
              <div><dt>Starting point</dt><dd>{template.name}</dd></div>
              <div><dt>Team</dt><dd>{teamIds.length} specialists</dd></div>
              <div><dt>Release standard</dt><dd>Build · browser test · deploy · prove</dd></div>
            </dl>
            <footer><Check aria-hidden="true" /> Ready for the Studio</footer>
          </div>
        </section>
      </main>

      <dialog
        className="asset-dialog"
        ref={detailRef}
        onClose={() => setSelected(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault()
            closeAsset()
          }
        }}
        onClick={(event) => { if (event.target === event.currentTarget) closeAsset() }}
      >
        {selected ? (
          <div className="asset-dialog__panel">
            <header><div><span>{selected.category}</span><h2>{selected.name}</h2><p>{selected.summary}</p></div><button type="button" onClick={closeAsset}>Close</button></header>
            <div className="asset-dialog__preview">
              {selected.colors ? <div className="asset-palette">{selected.colors.map((color) => <i key={color} style={{ "--asset-color": color } as CSSProperties} />)}</div> : null}
              {selected.sample ? <p className={`asset-type asset-type--${selected.id}`}>{selected.sample}</p> : null}
              {selected.motion ? <div className={`asset-motion asset-motion--${selected.motion}`} key={motionRun}><i /><button type="button" onClick={() => setMotionRun((value) => value + 1)}><Play aria-hidden="true" /> Play once</button></div> : null}
              {!selected.colors && !selected.sample && !selected.motion ? <p className="asset-statement">{selected.category === "Agents" ? `Bring in the ${selected.name}.` : selected.category === "Skills" ? `Give the Studio the ability to ${selected.summary.toLowerCase()}.` : selected.category === "Prompts" ? selected.prompt : selected.detail}</p> : null}
            </div>
            <div className="asset-dialog__detail"><p>{selected.detail}</p><dl><div><dt>Best for</dt><dd>{selected.bestFor}</dd></div>{selected.source ? <div><dt>Source</dt><dd>{selected.source}</dd></div> : null}{selected.status ? <div><dt>Status</dt><dd>{selected.status}</dd></div> : null}</dl></div>
            <footer><button className="studio-primary" type="button" onClick={() => applyAsset(selected)}>{assetAction(selected)}</button></footer>
          </div>
        ) : null}
      </dialog>
      <SiteFooter note="One brief. One system. All the way to live." />
    </div>
  )
}
