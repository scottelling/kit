# Workspace Error Boundary

A real recovery boundary that protects the rest of the creative workspace.

## Use it when

- One complex workspace must fail safely without taking down the rest of the product.

## Do not use it when

- The error can be handled at the individual request or field.

## Workflow states

- ready
- selected
- editing
- playing
- working
- complete
- failed

## Interaction conditions

- default
- hover
- focus
- disabled

## Named events

- `FAIL`
- `REPORT`
- `RELOAD`
- `RECOVER`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- The project model, media, timing data, rendering, persistence, and delivery policy.
- Which states and events are actually legal for this product and user.

## Accessibility

- Use native semantics first and expose the current state without relying on color alone.
- Keep every action reachable by keyboard with a visible focus indicator and an understandable name.
- Announce asynchronous success or failure when the changed object does not make the outcome obvious.

## Phone behavior

- Contain the complete task at 320 pixels without hiding the primary action behind sideways scrolling.
- Recompose dense layouts for touch instead of shrinking controls or text.

## Proof before release

- Exercise every declared state and every legal event, including failure and recovery.
- Verify keyboard order, focus return where focus moves, touch targets, and reduced motion.
- Check 320, 375, 414, 768, and desktop widths with no page overflow or unreachable action.

## Plain-English project request

> Use Kit's Workspace Error Boundary for this product. One complex workspace must fail safely without taking down the rest of the product. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model FAIL, REPORT, RELOAD, RECOVER as named events; render ready, selected, editing, playing, working, complete, failed as workflow states and default, hover, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#workspace-error-boundary)
- [Purple Rain](https://kit.scottelling.com/kit#workspace-error-boundary)
- [JADE](https://kit.scottelling.com/kit/jade#workspace-error-boundary)
- [OS](https://kit.scottelling.com/kit/os#workspace-error-boundary)
- [Animation Studio](https://kit.scottelling.com/kit/animation#workspace-error-boundary)
- [Voltage](https://kit.scottelling.com/kit/voltage#workspace-error-boundary)
