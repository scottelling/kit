# Dropzone

Add drag-and-drop file selection without removing the native file picker.

## Use it when

- Drag-and-drop materially helps repeated desktop file selection and a normal picker remains available.

## Do not use it when

- A standard file chooser is enough or the product has no upload policy.

## Workflow states

- empty
- dragging
- selected
- invalid
- disabled

## Interaction conditions

- default
- hover
- focus
- disabled

## Named events

- `DRAG_ENTER`
- `DRAG_LEAVE`
- `DROP_FILES`
- `OPEN_PICKER`
- `VALIDATE`
- `CLEAR`

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

> Use Kit's Dropzone for this product. Drag-and-drop materially helps repeated desktop file selection and a normal picker remains available. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model DRAG_ENTER, DRAG_LEAVE, DROP_FILES, OPEN_PICKER, VALIDATE, CLEAR as named events; render empty, dragging, selected, invalid, disabled as workflow states and default, hover, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#dropzone)
- [Purple Rain](https://kit.scottelling.com/kit#dropzone)
- [JADE](https://kit.scottelling.com/kit/jade#dropzone)
- [OS](https://kit.scottelling.com/kit/os#dropzone)
- [Animation Studio](https://kit.scottelling.com/kit/animation#dropzone)
- [Voltage](https://kit.scottelling.com/kit/voltage#dropzone)
- [Calm Desktop](https://kit.scottelling.com/kit/calm#dropzone)
