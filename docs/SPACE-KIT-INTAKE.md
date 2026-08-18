# Space Kit intake record

First kit onboarded through `docs/KIT-INTAKE.md`. Class: **sourced kit** —
preserved as authored, bridged, not converted.

## Source authority

- Product: spacefs.com (cloud filesystem living inside Finder)
- Audit: 2026-08-11, live DOM computed-styles audit and stylesheet inspection
- Hand-off: single-file UI kit authored by Scott, received 2026-08-11
- Archive (verbatim, never edited): `sources/space/space-ui-kit.html`
- The source file's own provenance labeling (EXTRACTED vs DERIVED) is carried
  through every published artifact.

## Class decision

Sourced kit, not a rebuild. The hand-off already is a complete, coherent
system with its own governing rules; its differences from kit law (density,
token format, motion timing) are identity, not defects. A rebuild would have
destroyed exactly what Scott asked to keep.

## What was preserved (the quirks)

- RGB-channel color tokens (`--background:255 255 255`) consumed as
  `rgb(var(--x) / alpha)` — alpha composition is the feature
- `[data-theme]` as the native theme mechanism
- 48px standard controls with 30px Finder-density menu/sidebar rows
- Hairline-only structure, flat-unless-floating shadow policy
- 400–500 weight range, grey body copy, mono-for-metadata
- Pills for controls / 6–8px for surfaces, never crossed
- Blue as a functional color only (focus, streaming)
- 150ms/500ms two-duration motion with a single ease-out curve

## What kit added (all recorded as derived in provenance)

- Additive dark-mode selector aliases (`.dark`,
  `[data-kit-appearance="dark"]`) alongside `[data-theme="dark"]`
- `color-scheme` moved from the `html` element rule to `:root` scope
- sp-scoped box-sizing/font/margin shims so pieces install into pages that
  never ran Space's global resets
- sp-scoped reduced-motion rule replacing the source's global `*` rule
- Chrome/system split: `.k-*` documentation shell excluded from `kit.css`,
  preserved in the showroom

## Doctrine deltas (declared, not silent)

1. 44px minimum: Space runs 48px standard controls but 36/30/26/24px dense
   elements — Finder-adjacent desktop density is the identity. Legal inside
   Space territory only.
2. Looping resting motion ban: `sp-skel` pulses while loading — functional,
   stops on content, freezes under reduced motion.

## Bridge stance

`/r/space/bridge.json` maps 26 tokens; 9 map to universal roles cleanly, the
rest are partial or `null` (warning, surface, border-strong, mono font, and
the pill vocabulary have no universal counterpart). Notable: the bridge
exposed a real gap on the universal side — no `--font-mono` role exists across
the complete systems.

## Published

- `/r/space/registry.json` — 36 pieces with per-piece provenance
- `/r/space/tokens.css` + `/r/space/kit.css` — the installable system
- `/r/space/provenance.json` + `/r/space/bridge.json`
- `/kit/space` — the full single-file showroom, essentially verbatim

## Open cautions (from the source, unresolved by design)

Google Sans licensing (substitute Geist/Inter/Instrument Sans before a real
product ships), inferred statement clamp, no data-viz language, dark mode
unvalidated against white-designed imagery, focus ring clearance in 30px rows,
no responsive precedent for the browser shell.
