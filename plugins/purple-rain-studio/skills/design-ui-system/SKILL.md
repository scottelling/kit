---
name: design-ui-system
description: Design, build, expand, or repair a production interface system with tokens, components, patterns, interaction states, accessibility, responsive behavior, documentation, and a tactile visual showroom. Use for React and shadcn systems, component registries, product-wide UI consistency, design engineering standards, or large component-library expansions.
---

# Design UI System

Build the system from real product work, then make every part visible and reusable.

## Workflow

1. Inventory the product’s actual jobs, screens, data shapes, controls, and repeated patterns. Do not chase a component count disconnected from workflows.
2. Extract the existing authority for palette, type, spacing, shape, borders, depth, motion, voice, accessibility, and responsive behavior. Stop rather than inventing missing locked values.
3. Define source tokens before component styles. Use named semantic roles and OKLCH color values. Keep the delivery format and public showroom driven by one counted inventory.
4. Organize the library into foundations, actions, forms, navigation, overlays, feedback, data, and complete patterns.
5. Complete every relevant state: default, hover, focus, active, disabled, loading, error, and success. Keep field geometry stable and focus visible.
6. Compose primitives into real patterns—authentication, settings, search, checkout, forms, navigation shells, tables, calendars, dashboards, and recovery flows.
7. Build a plain-language visual showroom where every piece can be touched in light and dark. Keep commands, formats, and package language out of the human-facing experience unless requested.
8. Validate the registry or package schema, rebuild generated output, reject drift, run lint and production build, and prove at least one downstream installation when distribution is in scope.
9. Test 320, 375, 414, 768, and desktop widths in a real browser. Fix overflow, wrapped controls, keyboard gaps, contrast, console errors, and incomplete states.

## Purple Rain interface rules

- Instant legibility wins over atmosphere.
- The current object and next action remain obvious.
- Controls are at least 44 pixels tall and button and input heights match.
- Accent marks action and state; tonal planes carry hierarchy.
- Use solid surfaces and crisp boundaries. No glass, translucent decoration, glow, decorative gradients, ambient blobs, or resting loops.
- Motion is limited to press feedback, visible state change, origin-aware open and close, and functional progress. Respect reduced motion.
- Preserve public accessibility and downstream installation as release requirements, not documentation promises.
