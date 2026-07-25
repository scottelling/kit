---
name: prove-release
description: Audit, test, deploy, and prove a digital product release across build integrity, visual quality, accessibility, responsiveness, interactions, distribution, and live production. Use before calling a product finished, after a large frontend change, for registry or package releases, or when the user asks for deployment with nothing broken.
---

# Prove Release

Treat “done” as a claim that requires receipts.

## Release sequence

1. Read the project’s required check and deployment paths. Preserve its source-of-truth branch and release conventions.
2. Run the full local validation suite. Include schema or registry validation, generated-output drift checks, lint, types, tests, and production build when the project defines them.
3. Start the production-shaped app and exercise every critical journey with real browser interaction, not markup inspection alone.
4. Check 320, 375, 414, 768, and desktop widths for overflow, wrapped actions, broken density, unreachable controls, and visual hierarchy.
5. Check keyboard navigation, visible focus, labels, touch targets, contrast, reduced motion, dialog behavior, loading, empty, error, success, disabled, and recovery states.
6. Inspect console and network failures. Confirm important public routes and assets return successful responses.
7. When the product distributes components or templates, install a representative live item into a clean throwaway consumer and record every changed file.
8. Commit only the intended project changes, deploy through the established path, and repeat critical checks on the production domain.
9. Record the release in the project ledger with the deployment identifier, commit, checks, viewports, journeys, live endpoints, downstream proof, and remaining loops.

## Reporting

Lead with the live outcome. Use plain language. Name exactly what was checked and what changed. Do not hide a failure behind a partial-success summary, and do not call a release complete while a required check remains open.
