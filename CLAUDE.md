# kit — the Purple Rain registry

Tier: Ship
Design System: Purple Rain 2.0
Modules: ScottAI workspace conventions, deployment source of truth

## What It Is

A public shadcn registry and comparison site that distributes Purple Rain tokens and components through `npx shadcn add`.

## Origin

- Created: 2026-07-25
- Source specification: Studio Purple Rain `2.0.0-rc.1`
- Status: production build

## Subdomain

- URL: `https://kit.scottelling.com`
- Repo: `https://github.com/scottelling/kit`

## What Ships

- Registry items: `tokens`, `button`, `card`, `input`, `badge`, `dialog`
- Foundation kits: Shadow (`smooth-shadow`) under `/r/shadow/`
- Static registry output: `public/r/*.json`
- Product page: `/`
- Side-by-side comparison: `/demo`

## Design System

Purple Rain is a focused product system: plum canvas, stepped aubergine surfaces, restrained orchid decision signals, seated controls, 44px targets, visible focus, and short property-specific motion. No glass, translucency, glow, or ethereal decoration.

Shadow is a compatible elevation foundation, not a replacement visual identity. It supplies six stacked depths in ringless and integrated-hairline forms while preserving the active kit's color, type, spacing, and shape.

## Deploy

Run `./ship.sh` from this project root. See `docs/DEPLOYMENT.md` for the complete contract.

@AGENTS.md
