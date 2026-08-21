# Inline Edit

Inline Edit collects a choice without hiding its state.

## Use it when

- One small value can be changed safely without opening a separate form.

## Do not use it when

- Validation is complex, the change is consequential, or several fields belong together.

## Workflow states

- empty
- filled
- invalid
- working
- success
- failed

## Interaction conditions

- default
- hover
- focus
- disabled
- read-only

## Named events

- `EDIT`
- `CHANGE`
- `SAVE`
- `SUCCEED`
- `FAIL`
- `CANCEL`

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

## Phone behavior

- Contain the complete task at 320 pixels without hiding the primary action behind sideways scrolling.
- Recompose dense layouts for touch instead of shrinking controls or text.

## Proof before release

- Exercise every declared state and every legal event, including failure and recovery.
- Verify keyboard order, focus return where focus moves, touch targets, and reduced motion.
- Check 320, 375, 414, 768, and desktop widths with no page overflow or unreachable action.

## Plain-English project request

> Use Kit's Inline Edit for this product. One small value can be changed safely without opening a separate form. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model EDIT, CHANGE, SAVE, SUCCEED, FAIL, CANCEL as named events; render empty, filled, invalid, working, success, failed as workflow states and default, hover, focus, disabled, read-only as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#inline-edit)
- [Purple Rain](https://kit.scottelling.com/kit#inline-edit)
- [JADE](https://kit.scottelling.com/kit/jade#inline-edit)
- [OS](https://kit.scottelling.com/kit/os#inline-edit)
- [Animation Studio](https://kit.scottelling.com/kit/animation#inline-edit)
- [Voltage](https://kit.scottelling.com/kit/voltage#inline-edit)
