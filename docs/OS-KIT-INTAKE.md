# OS Kit intake boundary

## Source authority

- Public specification: `https://os.scottelling.com/ui-kit.md`
- Inspected source repository: `scottelling/os`
- Inspected source commit: `2f8cc65`
- Source files: `src/os/kit.ts`, `src/os/themes.ts`, `src/index.css`, `src/apps/DesignKit.tsx`, and the mobile contract

The OS repository was inspected read-only. Kit does not copy its application shell, state stores, widget appearance engine, glass implementation, aura, or governance.

## What stays

- Theme changes are data-driven and repaint the whole interface through semantic roles.
- The user-selected accent remains the decision, selection, link, and focus signal.
- Main text, supporting text, and quiet metadata remain the complete text hierarchy.
- Default, Daylight, Hacker, Ethereal, and Paper remain recognizable theme moods.
- Window, panel, desktop, phone, and widget composition remain the system's distinctive product territory.
- Empty, error, destructive, and unavailable states remain honest and actionable.

## What Kit replaces

- Raw hex and RGB values become maintained OKLCH roles.
- Glass, backdrop blur, translucent decoration, aura, and glow become solid tonal surfaces with crisp boundaries.
- Thirty-pixel desktop and forty-pixel phone targets become one 44-pixel minimum everywhere.
- Very small interface type becomes the shared readable Kit scale.
- Theme-specific timing outside the functional motion range becomes short, property-specific state motion.
- Hardcoded component values become shared color, type, shape, spacing, depth, and motion roles.

## What Kit adds

- The complete shared inventory across foundations, actions, forms, navigation, overlays, feedback, data, and product patterns.
- OS-native desktop, window, menu bar, dock, widget, master-detail, split-view, command bar, and settings-sheet structures.
- Complete default, hover, focus, active, selected, disabled, loading, empty, error, success, and recovery coverage.
- A synchronized desktop, phone, and widget product proof.
- A counted public registry with automatic tokens and an outside-project installation test.
- Theme Workshop support that copies OS safely, preserves the source, and publishes a portable light/dark variation.

## Font boundary

The source names Inter, Outfit, and JetBrains Mono. The registry preserves those named roles with durable system fallbacks but adds no font package dependency. Projects may supply the named families locally without changing component code.
