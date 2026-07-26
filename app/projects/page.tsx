import type { Metadata } from "next"

import { ProjectsRoom } from "./projects-room"

export const metadata: Metadata = {
  title: "Projects",
  description: "Return to every saved Purple Rain project, direction, preview, and approval state.",
}

export default function ProjectsPage() {
  return <ProjectsRoom />
}

