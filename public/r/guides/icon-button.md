# Icon Button

Icon Button keeps the next move clear and touchable.

## Use it when

- A person needs to trigger or choose a clear next action.

## Do not use it when

- The object only communicates information and performs no action.

## Workflow states

- ready
- working
- success
- failed

## Interaction conditions

- default
- hover
- focus
- pressed
- disabled

## Named events

- `ACTIVATE`
- `START`
- `SUCCEED`
- `FAIL`
- `RETRY`
- `RESET`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- The action, permission, side effect, success result, and failure recovery.
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

> Use Kit's Icon Button for this product. A person needs to trigger or choose a clear next action. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model ACTIVATE, START, SUCCEED, FAIL, RETRY, RESET as named events; render ready, working, success, failed as workflow states and default, hover, focus, pressed, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#icon-button)
- [Purple Rain](https://kit.scottelling.com/kit#icon-button)
- [JADE](https://kit.scottelling.com/kit/jade#icon-button)
- [OS](https://kit.scottelling.com/kit/os#icon-button)
- [Animation Studio](https://kit.scottelling.com/kit/animation#icon-button)
- [Voltage](https://kit.scottelling.com/kit/voltage#icon-button)
- [Calm Desktop](https://kit.scottelling.com/kit/calm#icon-button)
