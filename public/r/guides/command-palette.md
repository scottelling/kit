# Command Palette

Command Palette brings a focused task forward without losing context.

## Use it when

- A focused task needs to appear above the current context.

## Do not use it when

- The task needs a durable URL, long reading, or full-page workspace.

## Workflow states

- closed
- opening
- open
- working
- failed
- closing

## Interaction conditions

- default
- focus
- disabled

## Named events

- `OPEN`
- `CONFIRM`
- `CANCEL`
- `FAIL`
- `RETRY`
- `CLOSE`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- The decision, consequences, permission, submitted data, and return destination.
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

> Use Kit's Command Palette for this product. A focused task needs to appear above the current context. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model OPEN, CONFIRM, CANCEL, FAIL, RETRY, CLOSE as named events; render closed, opening, open, working, failed, closing as workflow states and default, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#command-palette)
- [Purple Rain](https://kit.scottelling.com/kit#command-palette)
- [JADE](https://kit.scottelling.com/kit/jade#command-palette)
- [OS](https://kit.scottelling.com/kit/os#command-palette)
- [Animation Studio](https://kit.scottelling.com/kit/animation#command-palette)
- [Voltage](https://kit.scottelling.com/kit/voltage#command-palette)
