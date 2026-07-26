"use client"

import { useCallback, useSyncExternalStore } from "react"

import { createStudioProject, type StudioProject } from "@/lib/project-studio"

const STORAGE_KEY = "purple-rain-studio-projects-v1"
const CURRENT_KEY = "purple-rain-studio-current-v1"
const MAX_PROJECTS = 50
const EMPTY: StudioProject[] = []
const listeners = new Set<() => void>()
let lastRaw = ""
let cachedProjects: StudioProject[] = EMPTY
let persistenceBlocked = false

function readStoredValue(key: string) {
  for (const storage of [window.localStorage, window.sessionStorage]) {
    try {
      const value = storage.getItem(key)
      if (value !== null) return value
    } catch {
      // Try the next browser-owned storage surface.
    }
  }
  return null
}

function writeStoredValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    try {
      window.localStorage.removeItem(key)
      window.localStorage.setItem(key, value)
      return true
    } catch {
      try {
        window.sessionStorage.setItem(key, value)
        return true
      } catch {
        return false
      }
    }
  }
}

function readProjects(): StudioProject[] {
  if (typeof window === "undefined") return EMPTY
  if (persistenceBlocked) return cachedProjects
  let raw = lastRaw || "[]"
  raw = readStoredValue(STORAGE_KEY) ?? "[]"
  if (raw === lastRaw) return cachedProjects
  lastRaw = raw
  try {
    const parsed = JSON.parse(raw)
    cachedProjects = Array.isArray(parsed) ? parsed.slice(0, MAX_PROJECTS).map((project) => createStudioProject(project)) : EMPTY
    const normalizedRaw = JSON.stringify(cachedProjects)
    if (normalizedRaw !== raw) window.queueMicrotask(() => writeStoredValue(STORAGE_KEY, normalizedRaw))
  } catch {
    cachedProjects = EMPTY
  }
  return cachedProjects
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      lastRaw = ""
      listener()
    }
  }
  window.addEventListener("storage", handleStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

function subscribeReady() {
  return () => undefined
}

function getClientReady() {
  return true
}

function getServerReady() {
  return false
}

function writeProjects(projects: StudioProject[]) {
  const next = projects.slice(0, MAX_PROJECTS)
  const raw = JSON.stringify(next)
  lastRaw = raw
  cachedProjects = next
  persistenceBlocked = !writeStoredValue(STORAGE_KEY, raw)
  listeners.forEach((listener) => listener())
}

function rememberCurrent(id: string) {
  writeStoredValue(CURRENT_KEY, id)
}

export function useStudioProjects() {
  const projects = useSyncExternalStore(subscribe, readProjects, () => EMPTY)
  const ready = useSyncExternalStore(subscribeReady, getClientReady, getServerReady)

  const createProject = useCallback((overrides: Partial<StudioProject> = {}) => {
    const project = createStudioProject(overrides)
    writeProjects([project, ...readProjects()])
    rememberCurrent(project.id)
    return project
  }, [])

  const saveProject = useCallback((project: StudioProject) => {
    const updated = { ...project, updatedAt: new Date().toISOString() }
    const existing = readProjects()
    const found = existing.some((item) => item.id === updated.id)
    writeProjects(found ? existing.map((item) => item.id === updated.id ? updated : item) : [updated, ...existing])
    rememberCurrent(updated.id)
    return updated
  }, [])

  const duplicateProject = useCallback((id: string) => {
    const source = readProjects().find((project) => project.id === id)
    if (!source) return null
    return createProject({ ...source, id: undefined, name: `${source.name} copy`, status: "draft", previewPublished: false, createdAt: undefined, updatedAt: undefined })
  }, [createProject])

  const archiveProject = useCallback((id: string) => {
    const existing = readProjects()
    writeProjects(existing.map((project) => project.id === id ? { ...project, status: project.status === "archived" ? "draft" : "archived", updatedAt: new Date().toISOString() } : project))
  }, [])

  const getProject = useCallback((id?: string | null) => {
    const existing = readProjects()
    const current = readStoredValue(CURRENT_KEY)
    const target = id ?? current
    return existing.find((project) => project.id === target) ?? existing.find((project) => project.status !== "archived") ?? null
  }, [])

  return { projects, ready, createProject, saveProject, duplicateProject, archiveProject, getProject }
}
