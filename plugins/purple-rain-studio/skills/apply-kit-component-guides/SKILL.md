---
name: apply-kit-component-guides
description: Select, build, review, or repair a reusable Kit interface component using its maintained purpose, named events, visible states, ownership boundary, accessibility behavior, phone behavior, and release proof. Use when adding a Kit component to a product, filling a shared component gap, or replacing tangled UI flags with an explicit interaction flow. Do not use to replace product routes, content, data, permissions, or business rules.
---

# Apply Kit Component Guides

Use one maintained operating guide to keep the visible component, agent decisions, project handoff, and release proof aligned.

## Workflow

1. Find the component in [the complete guide catalog](references/component-guides.md). If no guide matches, classify the need before building: existing piece, composition, reusable Kit gap, or product-owned work.
2. Confirm the component belongs in the product. Do not install specialist workspaces merely because they exist.
3. Inspect the product's current routes, adapters, permissions, privacy, persistence, logging, and side-effect rules that the guide leaves product-owned. Record the existing behavior before implementation rather than assuming it.
4. Preserve the guide's ownership boundary. Kit owns visual and interaction expression; the product owns routes, content, data, permissions, business rules, and side effects.
5. Model the interaction with the guide's named events and workflow states. Keep focus, hover, pressed, and disabled as separate interaction conditions rather than mutually exclusive workflow states. Keep durable records as data rather than turning them into overlapping mode flags.
6. Use a reducer for a tiny local interaction. Use a state machine when four or more states, delayed transitions, invalid moves, or retry paths overlap. No state-machine dependency is required by this skill.
7. Render every declared state, including loading, empty, failure, retry, success, disabled, and recovery where the guide lists them.
8. Verify the guide's keyboard, focus, touch, phone, reduced-motion, and responsive requirements through the real component interface.

## Hard boundaries

- Preserve the active Kit's palette, type, spacing, shape, borders, depth, and motion character.
- Keep controls at least 44 pixels, focus visible, surfaces solid, and phone actions reachable without sideways page scrolling.
- Do not add glass, translucent decoration, glow, decorative gradients, ambient blobs, or resting loops.
- Do not add a dependency because a reference implementation used one. Add a dependency only with the user's approval and a product-level reason.
- Do not turn the entire app into one machine. One flow owner should cover one coherent interaction.

## Public fallback

If the local reference is unavailable, load `https://kit.scottelling.com/r/guides/catalog.json` and select the exact component by `name`.
