# File Upload

Select files and make upload progress, cancellation, failure, retry, and completion unmistakable.

## Use it when

- A product must accept one or more files and own a real upload, cancel, retry, and storage flow.

## Do not use it when

- The product only needs local file selection or has not defined privacy, retention, and upload behavior.

## Workflow states

- empty
- selected
- invalid
- uploading
- cancelled
- failed
- success

## Interaction conditions

- default
- hover
- focus
- disabled
- read-only

## Named events

- `SELECT_FILES`
- `VALIDATE`
- `START_UPLOAD`
- `UPDATE_PROGRESS`
- `CANCEL`
- `CANCELLED`
- `SUCCEED`
- `FAIL`
- `RETRY`
- `REMOVE_FILE`
- `RESET`

## What Kit owns

- Semantic visual roles, component anatomy, interaction expression, and complete visible states.
- At least 44-pixel controls, visible focus, keyboard and touch behavior, phone containment, and reduced motion.
- Solid surfaces, legible hierarchy, and compatibility with every complete Kit visual system.

## What the product owns

- Accepted file types and limits, authorization, upload and abort adapters, endpoint, encryption, storage, retention, deletion, logging, and retry idempotency.
- Whether cancellation confirms server cleanup or only stops the current request.

## Accessibility

- Use native semantics first and expose the current state without relying on color alone.
- Keep every action reachable by keyboard with a visible focus indicator and an understandable name.
- Announce asynchronous success or failure when the changed object does not make the outcome obvious.
- Keep a correctly labelled native file input available to keyboard and assistive technology.
- Expose determinate upload progress with a useful label and restrained announcements.
- Move or restore focus deliberately after validation failure, cancellation, upload failure, and completion.

## Phone behavior

- Contain the complete task at 320 pixels without hiding the primary action behind sideways scrolling.
- Recompose dense layouts for touch instead of shrinking controls or text.

## Proof before release

- Exercise every declared state and every legal event, including failure and recovery.
- Verify keyboard order, focus return where focus moves, touch targets, and reduced motion.
- Check 320, 375, 414, 768, and desktop widths with no page overflow or unreachable action.
- Inspect and record the existing upload, abort, privacy, storage, logging, and retry behavior before implementation.
- Reject retry outside failure and ignore a late completion from an aborted request.
- Prove retry cannot create an unintended duplicate and cancellation never claims deletion the server did not confirm.

## Plain-English project request

> Use Kit's File Upload for this product. A product must accept one or more files and own a real upload, cancel, retry, and storage flow. Preserve the active visual kit and the product's routes, content, data, permissions, and business rules. Model SELECT_FILES, VALIDATE, START_UPLOAD, UPDATE_PROGRESS, CANCEL, CANCELLED, SUCCEED, FAIL, RETRY, REMOVE_FILE, RESET as named events; render empty, selected, invalid, uploading, cancelled, failed, success as workflow states and default, hover, focus, disabled, read-only as separate interaction conditions where they apply. Keep 44-pixel controls, visible focus, phone containment, honest loading and failure, and reduced-motion behavior. Do not add glass, glow, decorative gradients, resting loops, or a new dependency.

## Live component

- [Vanilla](https://kit.scottelling.com/kit/vanilla#file-upload)
- [Purple Rain](https://kit.scottelling.com/kit#file-upload)
- [JADE](https://kit.scottelling.com/kit/jade#file-upload)
- [OS](https://kit.scottelling.com/kit/os#file-upload)
- [Animation Studio](https://kit.scottelling.com/kit/animation#file-upload)
- [Voltage](https://kit.scottelling.com/kit/voltage#file-upload)
