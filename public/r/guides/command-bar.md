# Command Bar

A plain-language action entry with honest results, keyboard control, and recovery.

## Use it when

- A desktop-like work surface genuinely helps people manage dense, concurrent work.

## Do not use it when

- The product is a simple page, form, or phone-first flow that does not need desktop structure.

## Workflow states

- ready
- selected
- resized
- collapsed
- failed
- recovered

## Interaction conditions

- default
- hover
- focus
- disabled

## Named events

- `FOCUS`
- `SELECT`
- `MOVE`
- `RESIZE`
- `COLLAPSE`
- `EXPAND`
- `RECOVER`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- The windows, documents, commands, data, persistence, and workspace rules.
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

> Use Kit's Command Bar for this product. A desktop-like work surface genuinely helps people manage dense, concurrent work. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model FOCUS, SELECT, MOVE, RESIZE, COLLAPSE, EXPAND, RECOVER as named events; render ready, selected, resized, collapsed, failed, recovered as workflow states and default, hover, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#command-bar)
- [Purple Rain](https://kit.scottelling.com/kit#command-bar)
- [JADE](https://kit.scottelling.com/kit/jade#command-bar)
- [OS](https://kit.scottelling.com/kit/os#command-bar)
- [Animation Studio](https://kit.scottelling.com/kit/animation#command-bar)
- [Voltage](https://kit.scottelling.com/kit/voltage#command-bar)
- [Calm Desktop](https://kit.scottelling.com/kit/calm#command-bar)
