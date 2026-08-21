# Stack

See how Stack shapes every screen.

## Use it when

- You need one shared rule to shape many screens consistently.

## Do not use it when

- The value is local content or a one-off product decision.

## Workflow states

- documented
- applied
- reviewed

## Interaction conditions

- default

## Named events

- `APPLY`
- `REVIEW`
- `RESET`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- The product's content hierarchy and exceptional constraints.
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

> Use Kit's Stack for this product. You need one shared rule to shape many screens consistently. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model APPLY, REVIEW, RESET as named events; render documented, applied, reviewed as workflow states and default as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#stack)
- [Purple Rain](https://kit.scottelling.com/kit#stack)
- [JADE](https://kit.scottelling.com/kit/jade#stack)
- [OS](https://kit.scottelling.com/kit/os#stack)
- [Animation Studio](https://kit.scottelling.com/kit/animation#stack)
- [Voltage](https://kit.scottelling.com/kit/voltage#stack)
