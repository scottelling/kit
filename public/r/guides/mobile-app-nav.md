# Mobile App Nav

Mobile App Nav assembles related pieces into a complete task.

## Use it when

- Several related pieces must complete one recognizable product task.

## Do not use it when

- The product needs only one primitive or already owns a better task composition.

## Workflow states

- ready
- editing
- working
- success
- failed
- recovery

## Interaction conditions

- default
- hover
- focus
- disabled

## Named events

- `START`
- `CHANGE`
- `SUBMIT`
- `SUCCEED`
- `FAIL`
- `RETRY`
- `RESET`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- The journey, content, data, permissions, business rules, and side effects.
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

> Use Kit's Mobile App Nav for this product. Several related pieces must complete one recognizable product task. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model START, CHANGE, SUBMIT, SUCCEED, FAIL, RETRY, RESET as named events; render ready, editing, working, success, failed, recovery as workflow states and default, hover, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#mobile-app-nav)
- [Purple Rain](https://kit.scottelling.com/kit#mobile-app-nav)
- [JADE](https://kit.scottelling.com/kit/jade#mobile-app-nav)
- [OS](https://kit.scottelling.com/kit/os#mobile-app-nav)
- [Animation Studio](https://kit.scottelling.com/kit/animation#mobile-app-nav)
- [Voltage](https://kit.scottelling.com/kit/voltage#mobile-app-nav)
