# Banner

Banner makes the current state visible at a glance.

## Use it when

- The interface must make progress, status, success, failure, or recovery obvious.

## Do not use it when

- The same information is already clear from the changed object itself.

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

- `START`
- `UPDATE`
- `SUCCEED`
- `WARN`
- `FAIL`
- `DISMISS`
- `RETRY`

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

> Use Kit's Banner for this product. The interface must make progress, status, success, failure, or recovery obvious. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model START, UPDATE, SUCCEED, WARN, FAIL, DISMISS, RETRY as named events; render idle, working, success, warning, failed, dismissed as workflow states and default, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#banner)
- [Purple Rain](https://kit.scottelling.com/kit#banner)
- [JADE](https://kit.scottelling.com/kit/jade#banner)
- [OS](https://kit.scottelling.com/kit/os#banner)
- [Animation Studio](https://kit.scottelling.com/kit/animation#banner)
- [Voltage](https://kit.scottelling.com/kit/voltage#banner)
- [Calm Desktop](https://kit.scottelling.com/kit/calm#banner)
