# Calm Desktop Kit Intake

## Source authority

- User handoff: `sources/calm/calm-desktop-kit.md`
- Received: 2026-08-20
- Authority: binding visual and interaction specification supplied directly by Scott
- Preservation: the handoff is archived verbatim and never edited in place

## Class decision

Calm Desktop is a **complete visual system**, not a sourced kit. The handoff is a reusable design and interaction authority rather than an existing component implementation with native class names to preserve. Scott asked for it to become a kit, and its rules are broad enough to govern the complete 179-piece universal catalog.

Calm overlaps with OS and Animation Studio in workspace density, but it is not a duplicate:

- OS owns stronger desktop/window/widget structures and multiple theme moods.
- Animation Studio owns canvas, timeline, inspector, and delivery structures.
- Calm owns quiet graphite structure, inline editing, file-style navigation, contextual utilities, and a restrained command layer.

## Maintained source values

- App `#101011`
- Sidebar `#0c0c0d`
- Panel `#141415`
- Surface `#19191a`
- Raised surface `#202022`
- Hover `#1d1d1f`
- Selection `#29292c`
- Border `#29292b`
- Text `#eeece9`
- Secondary text `#b4b1ad`
- Muted text `#777571`
- Accent `#9ea8ff`
- Accent surface `#272a3f`
- Danger `#ff9797`
- System-first Inter stack, 4-pixel spacing rhythm, 7–10-pixel everyday shape, 14–16-pixel command shape

The registry converts the exact hex colors to OKLCH without changing their appearance.

## Honest dark authority

The source defines dark mode only. Calm therefore declares one maintained appearance. The registry repeats that exact source under the installation root and dark selector so a clean project receives working values, but it does not claim or invent a light direction.

## Production compatibility decisions

These are derived expressions of source rules, not new visual directions:

- Controls use Kit's 44-pixel minimum effective target while preserving dense type and spacing.
- Positive state reuses the source accent because the handoff explicitly spends accent on progress and state; no unapproved green was introduced.
- Charts reuse the approved text, accent, and danger colors; no decorative palette was invented.
- Short motion resolves to 120, 180, and 240 milliseconds using the shared interruptible easing.
- Stable surfaces have no shadow. Only menus, command surfaces, and notices use the dedicated transient shadow.
- Inter remains system-first with durable platform fallbacks and adds no dependency.

## Structural signature

The showroom proves the source's optional three-area shell with:

- searchable and filtered file-style navigation;
- stable selected-object editing;
- collapsible and resizable navigation and utility panels;
- contextual tabs with honest content;
- a keyboard-opened command surface with preview and Apply/Cancel;
- Undo after rename;
- narrow-screen drawers and one scroll owner per pane.

This signature workspace is a demonstration, never an installation dependency. Products install only the pieces they need and keep ownership of routes, data, workflows, permissions, persistence, and side effects.

## Forbidden carryover

Calm does not add giant cards, bento dashboards, gradients, glass, ambient decoration, strong stable shadows, resting motion, fake AI, dead controls, product data, or product layouts.

## Release proof

The release must pass the complete system contract, the dedicated Calm verifier, every registry and generated-output check, 320/375/414/768/1280/1440 responsive proof, real keyboard and pointer interaction, a clean production build, live endpoint parity, and one clean outside-project install.
