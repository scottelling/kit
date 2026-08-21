# Evidence Source Block

Verification, uncertainty, sources, limitations, and review dates kept together.

## Use it when

- A claim needs provenance, confidence, freshness, limitations, or conflicting evidence.

## Do not use it when

- The content is ordinary product copy with no source claim.

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

> Use Kit's Evidence Source Block for this product. A claim needs provenance, confidence, freshness, limitations, or conflicting evidence. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model START, CHANGE, SUBMIT, SUCCEED, FAIL, RETRY, RESET as named events; render ready, editing, working, success, failed, recovery as workflow states and default, hover, focus, disabled as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#evidence-source-block)
- [Purple Rain](https://kit.scottelling.com/kit#evidence-source-block)
- [JADE](https://kit.scottelling.com/kit/jade#evidence-source-block)
- [OS](https://kit.scottelling.com/kit/os#evidence-source-block)
- [Animation Studio](https://kit.scottelling.com/kit/animation#evidence-source-block)
- [Voltage](https://kit.scottelling.com/kit/voltage#evidence-source-block)
- [Calm Desktop](https://kit.scottelling.com/kit/calm#evidence-source-block)
