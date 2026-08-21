# Progress

Show determinate progress for work whose completion can be measured.

## Use it when

- Ongoing work has a trustworthy current value and known maximum.

## Do not use it when

- The value is chosen by the user, measures capacity rather than progress, or completion cannot be estimated.

## Workflow states

- idle
- running
- complete
- failed

## Interaction conditions

- default

## Named events

- `START`
- `UPDATE_PROGRESS`
- `COMPLETE`
- `FAIL`
- `RESET`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- Field meaning, validation rules, privacy, persistence, and submission side effects.
- Which states and events are actually legal for this product and user.

## Accessibility

- Use native semantics first and expose the current state without relying on color alone.
- Keep every action reachable by keyboard with a visible focus indicator and an understandable name.
- Announce asynchronous success or failure when the changed object does not make the outcome obvious.
- Expose the current value, minimum, maximum, and an understandable progress label.
- Announce meaningful milestones without speaking every small percentage change.

## Phone behavior

- Contain the complete task at 320 pixels without hiding the primary action behind sideways scrolling.
- Recompose dense layouts for touch instead of shrinking controls or text.

## Proof before release

- Exercise every declared state and every legal event, including failure and recovery.
- Verify keyboard order, focus return where focus moves, touch targets, and reduced motion.
- Check 320, 375, 414, 768, and desktop widths with no page overflow or unreachable action.

## Plain-English project request

> Use Kit's Progress for this product. Ongoing work has a trustworthy current value and known maximum. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model START, UPDATE_PROGRESS, COMPLETE, FAIL, RESET as named events; render idle, running, complete, failed as workflow states and default as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#progress)
- [Purple Rain](https://kit.scottelling.com/kit#progress)
- [JADE](https://kit.scottelling.com/kit/jade#progress)
- [OS](https://kit.scottelling.com/kit/os#progress)
- [Animation Studio](https://kit.scottelling.com/kit/animation#progress)
- [Voltage](https://kit.scottelling.com/kit/voltage#progress)
