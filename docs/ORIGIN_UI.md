# Origin UI comparison provenance

Checked on 2026-07-25 before installation.

- The current shadcn community registry directory does not list Origin UI among its active namespace entries.
- The project’s established namespace is `@originui`.
- The historical hosted endpoint now returns a website document rather than registry JSON, so this project maps `@originui` to the maintained upstream repository’s built JSON:
  `https://raw.githubusercontent.com/shadcn/originui/main/public/r/{name}.json`.
- The comparison controls were installed with:
  `npx shadcn@latest add @originui/button @originui/input @originui/badge @originui/dialog --overwrite --yes`.

The comparison page labels Origin UI as a community reference and does not imply that it remains listed in the live directory.
