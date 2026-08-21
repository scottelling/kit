# Command Menu

Command Menu keeps place and direction easy to scan.

## Use it when

- A person must move, filter, change view, or understand their current place.

## Do not use it when

- The choices perform unrelated actions rather than changing place or view.

## Workflow states

- ready
- current
- collapsed
- expanded

## Interaction conditions

- default
- hover
- focus
- disabled

## Named events

- `SELECT`
- `NEXT`
- `PREVIOUS`
- `EXPAND`
- `COLLAPSE`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- Routes, labels, permissions, destination order, and preserved navigation state.
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

> Use Kit's Command Menu for this product. A person must move, filter, change view, or understand their current place. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model SELECT, NEXT, PREVIOUS, EXPAND, COLLAPSE as named events; render ready, current, collapsed, expanded as workflow states and default, hover, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#command-menu)
- [Purple Rain](https://kit.scottelling.com/kit#command-menu)
- [JADE](https://kit.scottelling.com/kit/jade#command-menu)
- [OS](https://kit.scottelling.com/kit/os#command-menu)
- [Animation Studio](https://kit.scottelling.com/kit/animation#command-menu)
- [Voltage](https://kit.scottelling.com/kit/voltage#command-menu)
- [Calm Desktop](https://kit.scottelling.com/kit/calm#command-menu)
