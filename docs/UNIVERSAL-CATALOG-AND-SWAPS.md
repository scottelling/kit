# Universal catalog and safe kit swaps

## The plain-language model

Kit separates three things that must never be confused:

1. Everyday interface pieces are the controls most products need: buttons, fields, navigation, dialogs, tables, feedback, and common product patterns.
2. Specialist patterns are useful structures such as a timeline, canvas inspector, desktop window, dock, or command bar. Every visual kit can style them, but none is installed unless the product asks for it.
3. Product-owned work is the target product's pages, routes, data, content, workflows, and business behavior. A kit swap does not replace any of it.

The current universal catalog contains 175 individually installable interface pieces: 138 everyday pieces and 37 specialist patterns. Purple Rain, JADE, OS, and Animation Studio expose the same names and behavior. Their foundations change how those pieces look and feel.

## Adding a new reusable piece

A new component is accepted into the universal catalog only when:

- its purpose is useful beyond one product;
- product data, routes, and business behavior have been removed;
- it uses semantic visual roles that every kit can express;
- keyboard, touch, responsive, loading, empty, error, success, disabled, and reduced-motion behavior are complete;
- it has a working specimen and a public installation file;
- it installs with only the chosen visual system's foundations.

If those conditions are not true, the work stays in the product. This prevents Cabinet, Animation Studio, or any future product from becoming the accidental template for everything else.

## Approved icons

- Lucide is the primary interface family for familiar controls, actions, and navigation.
- Material Symbols Rounded is the secondary family for broader objects and specialist concepts.
- Verified company and product marks remain separate brand assets.
- A custom interface icon is created only when neither approved family communicates the concept.

The complete searchable catalog and locally served visual assets live at `/studio/icons`. Provenance and license material are kept with the project.

## Approved fonts

The font library keeps approved families and tested role pairings visible at `/studio/fonts`. A project chooses only the reading, display, and technical roles it genuinely needs. The finished product loads only the selected families and weights.

## Swap contract

Every kit swap follows the public contract at `/r/adoption-contract.json` and the visual workspace at `/studio/swap`:

1. Protect the current product and capture the same populated screens.
2. Repair overlap, overflow, touch, keyboard, and scroll problems before appearance changes hide them.
3. Map existing controls to the universal catalog and promote a genuinely reusable missing piece once.
4. Apply the selected kit's foundations and component expression without importing unrelated layouts.
5. Prove the same screens, actions, states, and widths before and after.
6. Keep one isolated appearance switch so the previous visual system can be restored without undoing product work.

Cabinet remains outside this repository. No Cabinet source is changed while Kit prepares or proves this contract.
