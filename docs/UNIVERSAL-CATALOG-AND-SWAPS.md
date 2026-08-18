# Universal catalog and safe kit swaps

## The plain-language model

Kit separates three things that must never be confused:

1. Everyday interface pieces are the controls most products need: buttons, fields, navigation, dialogs, tables, feedback, and common product patterns.
2. Specialist patterns are useful structures such as a timeline, canvas inspector, desktop window, dock, or command bar. Every visual kit can style them, but none is installed unless the product asks for it.
3. Product-owned work is the target product's pages, routes, data, content, workflows, and business behavior. A kit swap does not replace any of it.

The current universal catalog contains 179 individually installable interface pieces: 142 everyday pieces and 37 specialist patterns. Vanilla, Purple Rain, JADE, OS, and Animation Studio expose the same names and behavior. Their foundations change how those pieces look and feel.

Vanilla is the neutral default for a brand-new product. `/vanilla` proves the
ownership boundary with four working starting shapes. The product owns its
pages and behavior; changing one system token source changes the visual kit.

## Adding a new reusable piece

A new component is accepted into the universal catalog only when:

- its purpose is useful beyond one product;
- product data, routes, and business behavior have been removed;
- it uses semantic visual roles that every kit can express;
- keyboard, touch, responsive, loading, empty, error, success, disabled, and reduced-motion behavior are complete;
- it has a working specimen and a public installation file;
- it installs with only the chosen visual system's foundations.

If those conditions are not true, the work stays in the product. This prevents Cabinet, Animation Studio, or any future product from becoming the accidental template for everything else.

## Shared safety patterns

Visibility and publication, evidence and sources, share and QR handoff,
destructive actions with recovery, and modal confirmation are reusable product
needs rather than Glohhh-specific screens. They therefore live once in the
universal catalog and are styled by all five complete systems.

Their boundary is strict. Kit supplies the understandable controls, full state
coverage, safe focus order, keyboard and touch behavior, responsive layout,
clear warnings, retry, progress, and recovery presentation. The adopting
product supplies real permissions, policies, data, URLs, QR generation,
destructive operations, and undo rules. A visual-system swap may restyle these
patterns but may not rewrite those product decisions.

Expanded showroom previews make the consequential states tactile instead of
hiding them in documentation. On phones, visibility is one compact status row
until someone chooses to edit it, destructive confirmation owns the full
screen, and a broken QR is shown independently from a link that still works.

## Approved icons

- Lucide is the primary interface family for familiar controls, actions, and navigation.
- Material Symbols Rounded is the secondary family for broader objects and specialist concepts.
- Verified company and product marks remain separate brand assets.
- A custom interface icon is created only when neither approved family communicates the concept.

The complete searchable catalog and locally served visual assets live at `/studio/icons`. Provenance and license material are kept with the project.

## Approved fonts

The font library keeps approved families and tested role pairings visible at `/studio/fonts`. A project chooses only the reading, display, and technical roles it genuinely needs. The finished product loads only the selected families and weights.

## Swap contract

Every kit swap follows the public contract at `/r/adoption-contract.json`, the
Kit fit classifications at `/r/adoption-assessment.json`, and the visual
workspace at `/studio/swap`:

1. Protect the current product and capture the same populated screens.
2. Repair overlap, overflow, touch, keyboard, and scroll problems before appearance changes hide them.
3. Map existing controls to the universal catalog and promote a genuinely reusable missing piece once.
4. Apply the selected kit's foundations and component expression without importing unrelated layouts.
5. Prove the same screens, actions, states, and widths before and after.
6. Keep one isolated appearance switch so the previous visual system can be restored without undoing product work.

Before approval, each real product journey is classified as already covered,
a composition of existing pieces, a reusable shared gap, or product-owned.
Unclassified journeys and reusable gaps block adoption approval. This is only
the design-system fit check; Checklist remains the full-project launch
readiness authority.

Cabinet remains outside this repository. No Cabinet source is changed while Kit prepares or proves this contract.
