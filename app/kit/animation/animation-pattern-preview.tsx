"use client"

import { useState } from "react"

import { AiDirector } from "@/registry/animation/patterns/ai-director"
import { CodePanel } from "@/registry/animation/patterns/code-panel"
import { CommandSuggestionList } from "@/registry/animation/patterns/command-suggestion-list"
import { DeliveryAction } from "@/registry/animation/patterns/delivery-action"
import { DeliveryWorkspace } from "@/registry/animation/patterns/delivery-workspace"
import { DeviceFrame } from "@/registry/animation/patterns/device-frame"
import { GuidedTour } from "@/registry/animation/patterns/guided-tour"
import { InspectorPanel } from "@/registry/animation/patterns/inspector-panel"
import { LayerList } from "@/registry/animation/patterns/layer-list"
import { MotionCheck } from "@/registry/animation/patterns/motion-check"
import { MotionInspector } from "@/registry/animation/patterns/motion-inspector"
import { MotionPresetPicker } from "@/registry/animation/patterns/motion-preset-picker"
import { MotionTimeline } from "@/registry/animation/patterns/motion-timeline"
import { Playhead } from "@/registry/animation/patterns/playhead"
import { PreviewToolbar } from "@/registry/animation/patterns/preview-toolbar"
import { ProjectSwitcher } from "@/registry/animation/patterns/project-switcher"
import { RenderStatus } from "@/registry/animation/patterns/render-status"
import { SceneListItem } from "@/registry/animation/patterns/scene-list-item"
import { StageViewport } from "@/registry/animation/patterns/stage-viewport"
import { StoryboardRail } from "@/registry/animation/patterns/storyboard-rail"
import { StudioHeader } from "@/registry/animation/patterns/studio-header"
import { StudioShell } from "@/registry/animation/patterns/studio-shell"
import { StyleInspector } from "@/registry/animation/patterns/style-inspector"
import { TemplateGallery } from "@/registry/animation/patterns/template-gallery"
import { TimelineSegment } from "@/registry/animation/patterns/timeline-segment"
import { Transport } from "@/registry/animation/patterns/transport"
import { WorkspaceErrorBoundary } from "@/registry/animation/patterns/workspace-error-boundary"
import { WorkspaceSwitcher } from "@/registry/animation/patterns/workspace-switcher"

import type { LibraryItem } from "../component-preview"

type AnimationPatternPreviewProps = {
  item: LibraryItem
  expanded?: boolean
}

export function AnimationPatternPreview({ item, expanded = false }: AnimationPatternPreviewProps) {
  const [deliveryState, setDeliveryState] = useState<"idle" | "working" | "complete" | "failed">("idle")
  const previewClass = expanded ? "animation-native-preview is-expanded" : "animation-native-preview"

  let sample: React.ReactNode
  switch (item.preview) {
    case "studio-shell": sample = <StudioShell />; break
    case "studio-header": sample = <StudioHeader />; break
    case "workspace-switcher": sample = <WorkspaceSwitcher />; break
    case "project-switcher": sample = <ProjectSwitcher />; break
    case "storyboard-rail": sample = <StoryboardRail />; break
    case "scene-list-item": sample = <SceneListItem active />; break
    case "stage-viewport": sample = <StageViewport />; break
    case "device-frame": sample = <DeviceFrame><strong>Current composition</strong></DeviceFrame>; break
    case "preview-toolbar": sample = <PreviewToolbar />; break
    case "ai-director": sample = <AiDirector />; break
    case "command-suggestion-list": sample = <CommandSuggestionList />; break
    case "inspector-panel": sample = <InspectorPanel />; break
    case "layer-list": sample = <LayerList />; break
    case "style-inspector": sample = <StyleInspector />; break
    case "motion-inspector": sample = <MotionInspector />; break
    case "motion-preset-picker": sample = <MotionPresetPicker />; break
    case "transport": sample = <Transport />; break
    case "motion-timeline": sample = <MotionTimeline />; break
    case "timeline-segment": sample = <TimelineSegment active />; break
    case "playhead": sample = <Playhead />; break
    case "delivery-workspace": sample = <DeliveryWorkspace />; break
    case "delivery-action": sample = <div className="grid gap-3"><DeliveryAction state={deliveryState} onClick={() => setDeliveryState((current) => current === "idle" ? "working" : current === "working" ? "complete" : current === "complete" ? "failed" : "idle")} /><span className="text-xs text-muted-foreground">Press to see every delivery state.</span></div>; break
    case "render-status": sample = <RenderStatus />; break
    case "motion-check": sample = <MotionCheck />; break
    case "code-panel": sample = <CodePanel />; break
    case "template-gallery": sample = <TemplateGallery />; break
    case "guided-tour": sample = <GuidedTour />; break
    case "workspace-error-boundary": sample = <WorkspaceErrorBoundary><div className="grid min-h-40 place-items-center rounded-[var(--radius-card)] border border-border bg-card text-center"><div><strong className="block">Workspace protected</strong><span className="mt-2 block text-sm text-muted-foreground">A local error cannot take down the full studio.</span></div></div></WorkspaceErrorBoundary>; break
    default: sample = <div className="mini-fallback">{item.title}</div>
  }

  return <div className={previewClass}>{sample}</div>
}
