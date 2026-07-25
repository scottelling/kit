# Project Brain — kit

## Mission

Make Purple Rain installable, inspectable, and easy to judge against a polished third-party shadcn system.

## Canonical decisions

- Studio Purple Rain `2.0.0-rc.1` is the design authority.
- Dark mode preserves the exact Studio foundation values.
- Light mode preserves the same plum/orchid hue relationships while reversing lightness; it is a maintained registry extension because Studio 2.0 did not define light tokens.
- Registry tokens are published as OKLCH CSS variables.
- The tokens item also carries Studio’s exact maintained typography, measure, base/section spacing, 44px control, weight, and motion foundation values as `--pr-*` theme variables.
- Components are source-owned shadcn components, not package wrappers.
- The tokens item includes both schema-native `cssVars` and equivalent trailing CSS rules. This is intentional: shadcn v4 overwrites variables for a directly installed theme, but preserves existing semantic variables when that theme arrives as a transitive registry dependency. The trailing rules make automatic token delivery complete in both paths.
- Origin UI comparison uses the verified legacy namespace `@originui` mapped to its maintained source registry because it is no longer present in the current built-in directory index.
- The public registry is unauthenticated in v1.

## Product truth

Purple Rain is not violet wallpaper. Accent marks selection, focus, progress, and the primary decision. Tonal planes and directional depth carry hierarchy. The current object and next action stay obvious.

## Forbidden

- Glass or backdrop blur
- Translucent decorative surfaces
- Glow or shadow blooms
- Decorative gradients or ambient blobs
- Floating-card hover lift
- Looping resting motion
- Tiny touch targets
