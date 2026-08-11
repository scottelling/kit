# kit — the Purple Rain registry

Tier: Ship
Design System: Purple Rain 2.0
Modules: ScottAI workspace conventions, deployment source of truth

## What It Is

A public design-engineering studio and shadcn registry that distributes complete Purple Rain, JADE, OS, and Animation Studio systems, focused foundation kits, and reversible project-specific themes.

## Origin

- Created: 2026-07-25
- Source specification: Studio Purple Rain `2.0.0-rc.1`
- Status: production build

## Subdomain

- URL: `https://kit.scottelling.com`
- Repo: `https://github.com/scottelling/kit`

## What Ships

- Registry items: complete Purple Rain, JADE, OS, and Animation Studio component systems with automatic foundations
- Universal component catalog: the same 175 individually installable pieces in every visual system; 37 specialist patterns stay optional
- Icon Library: all approved Lucide and Material Symbols Rounded icons at `/studio/icons`
- Font Library: approved families and tested pairings at `/studio/fonts`
- Kit Swap Studio: a plain-language, reversible adoption brief at `/studio/swap`
- Foundation kits: Shadow (`smooth-shadow`) under `/r/shadow/`
- Theme Workshop: safe Purple Rain/JADE/OS copies, live proof, exact restore, preview sharing, and public handoff under `/labs`
- Elements Library: live, copyable, independently installable behaviors under `/elements`; Knight Rider opens Signature Effects
- KIT format layer (`SPEC.md`): framework-free `tokens.css` + `design-tokens.json` per system, the zero-dependency vanilla dialect under `/r/vanilla/` with its `/vanilla` demo, machine doctrine at `/r/doctrine.json`, and drift detection via `/r/checksums.json` + `kit-manifest.json` + kit-doctor
- Static registry output: `public/r/*.json`
- Product page: `/`
- Side-by-side comparison: `/demo`

## Design System

Purple Rain is a focused product system: plum canvas, stepped aubergine surfaces, restrained orchid decision signals, seated controls, 44px targets, visible focus, and short property-specific motion. No glass, translucency, glow, or ethereal decoration.

Shadow is a compatible elevation foundation, not a replacement visual identity. It supplies six stacked depths in ringless and integrated-hairline forms while preserving the active kit's color, type, spacing, and shape.

Signature Effects are isolated behaviors rather than Purple Rain components. Their purpose-built visuals stay inside the effect frame; the site chrome remains Purple Rain, and motion/audio accessibility is mandatory.

OS preserves the source system's theme-wide accent, three-level text hierarchy, and desktop/phone/widget product language. Kit replaces its glass, glow, raw color values, tiny controls, and partial component set with solid OKLCH surfaces, 44-pixel controls, complete states, and public distribution.

Animation Studio preserves CUE's dark creative-workspace hierarchy, exact semantic palette, dense geometry, motion purposes, and storyboard/canvas/inspector/timeline relationship. Kit separates those interface structures from product data and rendering, translates colors to OKLCH, raises effective controls to 44 pixels, removes unsupported light-based treatments, and styles the complete 175-piece catalog in the Animation system.

Every complete visual kit exposes the same catalog. Shared controls and specialist workspace patterns are installed one at a time, so access to a timeline, window, dock, or canvas never forces that layout into an unrelated product. Product screens and behavior remain owned by the product during a visual-system swap.

## Deploy

Run `./ship.sh` from this project root. See `docs/DEPLOYMENT.md` for the complete contract.

@AGENTS.md
