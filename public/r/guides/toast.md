# Toast

Toast makes the current state visible at a glance.

## Use it when

- A short-lived outcome needs acknowledgement without interrupting the current task.

## Do not use it when

- The condition persists, requires action, or is the only record of failure.

## Workflow states

- idle
- working
- success
- warning
- failed
- dismissed

## Interaction conditions

- default
- focus
- disabled

## Named events

- `SHOW`
- `DISMISS`
- `EXPIRE`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- The true status, source of truth, error cause, recovery action, and timing.
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

> Use Kit's Toast for this product. A short-lived outcome needs acknowledgement without interrupting the current task. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model SHOW, DISMISS, EXPIRE as named events; render idle, working, success, warning, failed, dismissed as workflow states and default, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#toast)
- [Purple Rain](https://kit.scottelling.com/kit#toast)
- [JADE](https://kit.scottelling.com/kit/jade#toast)
- [OS](https://kit.scottelling.com/kit/os#toast)
- [Animation Studio](https://kit.scottelling.com/kit/animation#toast)
- [Voltage](https://kit.scottelling.com/kit/voltage#toast)
- [Calm Desktop](https://kit.scottelling.com/kit/calm#toast)
