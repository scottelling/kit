"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type WorkspaceTreeNode = {
  id: string
  label: string
  icon?: React.ReactNode
  children?: WorkspaceTreeNode[]
  disabled?: boolean
}

type WorkspaceTreeProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  nodes: WorkspaceTreeNode[]
  value?: string
  defaultValue?: string
  onSelect?: (node: WorkspaceTreeNode) => void
}

function WorkspaceTree({ nodes, value, defaultValue, onSelect, className, ...props }: WorkspaceTreeProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [expanded, setExpanded] = React.useState<Set<string>>(
    () => new Set(nodes.filter((node) => node.children?.length).map((node) => node.id)),
  )
  const selected = value ?? internalValue

  function choose(node: WorkspaceTreeNode) {
    if (node.disabled) return
    if (value === undefined) setInternalValue(node.id)
    onSelect?.(node)
  }

  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function renderNodes(items: WorkspaceTreeNode[], level: number): React.ReactNode {
    return items.map((node) => {
      const hasChildren = Boolean(node.children?.length)
      const open = expanded.has(node.id)
      return (
        <div key={node.id} role="treeitem" aria-level={level} aria-expanded={hasChildren ? open : undefined} aria-selected={selected === node.id}>
          <div
            className={cn(
              "group flex min-h-11 items-center gap-1 rounded-[var(--radius-control)] px-1 text-sm",
              selected === node.id && "bg-primary text-primary-foreground",
              node.disabled && "opacity-45",
            )}
          >
            {hasChildren ? (
              <button
                type="button"
                className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-control)] outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`${open ? "Collapse" : "Expand"} ${node.label}`}
                onClick={() => toggle(node.id)}
              >
                <span aria-hidden="true" className={cn("transition-transform motion-reduce:transition-none", open && "rotate-90")}>›</span>
              </button>
            ) : <span className="size-11 shrink-0" aria-hidden="true" />}
            <button
              type="button"
              className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-control)] px-2 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
              disabled={node.disabled}
              onClick={() => choose(node)}
            >
              {node.icon}<span className="truncate">{node.label}</span>
            </button>
          </div>
          {hasChildren && open ? <div role="group" className="ms-5 border-s border-border ps-2">{renderNodes(node.children ?? [], level + 1)}</div> : null}
        </div>
      )
    })
  }

  return <div data-slot="workspace-tree" role="tree" className={cn("grid gap-0.5", className)} {...props}>{renderNodes(nodes, 1)}</div>
}

export { WorkspaceTree }
