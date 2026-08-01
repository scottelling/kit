---
name: apply-smooth-elevation
description: Apply, review, or repair smooth stacked elevation on cards, dialogs, popovers, dropdowns, menus, tooltips, sheets, toasts, and other raised web surfaces. Use when an interface has heavy or doubled edges, when a border or ring is paired with a shadow, when selecting an elevation depth, or when installing Kit's Shadow foundation.
---

# Apply Smooth Elevation

Give each raised surface one continuous edge and the smallest shadow depth that clearly explains its position.

## Workflow

1. Confirm Kit's `smooth-shadow` registry style or an equivalent compatible implementation is present before changing classes.
2. Inventory every surface that sits above the page: cards, menus, popovers, dialogs, sheets, toasts, tooltips, and command palettes.
3. Find elements that place a persistent `border-*` or `ring-*` beside a `shadow-*` on the same raised surface.
4. Distinguish that persistent surface edge from `focus-visible:*`, error, selected, high-contrast, or disabled-state boundaries. Preserve those functional signals.
5. Replace only the doubled persistent edge with the matching `smooth-shadow-ring-{size}` treatment. Remove only the redundant border or ring from that element.
6. Use `smooth-shadow-{size}` only when the raised surface should have no visible hairline.
7. Test the result in light and dark, including focus, open, close, disabled, and reduced-motion states.

## Depth choice

- `xs`: tiny controls and nearly flat separation.
- `sm`: seated cards and compact supporting surfaces.
- `md`: ordinary raised cards, menus, and popovers. Use this when no stronger depth is justified; preserve an existing stronger depth only when the stacking order genuinely requires it.
- `lg`: toasts and focused floating tools.
- `xl`: sheets and important overlays.
- `2xl`: dialogs and singular frontmost decisions.

Do not choose depth for decoration. Use it to explain stacking order.

## Edge and color rules

- Never keep a separate border or ring on an element using `smooth-shadow-ring-*`.
- Never remove a focus-visible ring or a semantic state boundary merely because the same element has elevation.
- Let the built-in ring default to black at 5% in light mode and white at 18% in dark mode unless the surface and page colors make it disappear.
- Tint the shadow and ring independently only when the product's existing color roles justify it.
- Keep tinted shadows restrained. Do not turn elevation into glow.
- Preserve the product's existing palette, typography, radius, spacing, and interaction system. Shadow is a foundation layer, not a replacement visual identity.

## Proof

Check 320, 375, 414, 768, and desktop widths. Verify that raised surfaces remain legible, focus stays visible, dialogs retain correct focus behavior, no double edges remain, and no shadow reads as a decorative bloom.

This workflow adapts Florian Kiem's MIT-licensed Smooth Shadow system from https://shadow.floriankiem.com.
