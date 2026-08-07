import * as React from "react"

export type WorkspaceErrorBoundaryProps = { children: React.ReactNode; fallback?: React.ReactNode }
type WorkspaceErrorBoundaryState = { failed: boolean }

export class WorkspaceErrorBoundary extends React.Component<WorkspaceErrorBoundaryProps, WorkspaceErrorBoundaryState> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    return this.props.fallback ?? <section data-slot="workspace-error-boundary" role="alert" className="grid min-h-48 content-center justify-items-start gap-3 rounded-[var(--radius-card)] border border-destructive bg-card p-5"><strong>The workspace hit a problem.</strong><p className="m-0 text-sm text-muted-foreground">Your project is still safe. Reload this work surface to continue.</p><button type="button" onClick={() => this.setState({ failed: false })} className="min-h-11 rounded-[var(--radius-control)] bg-primary px-4 font-bold text-primary-foreground">Reload workspace</button></section>
  }
}
