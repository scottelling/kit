# Project Brain — kit

## Mission

Make Purple Rain installable behind the scenes and effortless to see, touch, and judge in public.

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
- The human-facing site is a plain-language showroom. Commands, source links, file formats, and registry language stay off the public pages.
- `/kit` is the canonical visual inventory: colors, type, buttons, cards, fields, labels, and dialogs, all live in light and dark.
- The global finder accepts ordinary phrases and takes visitors directly to the matching visual group.
- `/demo` keeps Purple Rain and Origin on the same task, but asks visitors to judge the felt decision path rather than implementation details.

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
