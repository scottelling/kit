function bullets(items) {
  return items.map((item) => `- ${item}`).join("\n")
}

export function guideMarkdown(guide) {
  return `# ${guide.title}\n\n${guide.purpose}\n\n## Use it when\n\n${bullets(guide.useWhen)}\n\n## Do not use it when\n\n${bullets(guide.avoidWhen)}\n\n## Workflow states\n\n${bullets(guide.states)}\n\n## Interaction conditions\n\n${bullets(guide.interactionStates)}\n\n## Named events\n\n${bullets(guide.events.map((event) => `\`${event}\``))}\n\n## What Kit owns\n\n${bullets(guide.kitOwns)}\n\n## What the product owns\n\n${bullets(guide.productOwns)}\n\n## Accessibility\n\n${bullets(guide.accessibility)}\n\n## Phone behavior\n\n${bullets(guide.responsive)}\n\n## Proof before release\n\n${bullets(guide.proof)}\n\n## Plain-English project request\n\n> ${guide.prompt}\n\n## Live component\n\n${guide.systems.map((system) => `- [${system.label}](${system.showroom}#${guide.name})`).join("\n")}\n`
}

export function catalogMarkdown(catalog) {
  const sections = catalog.categories.map((category) => {
    const guides = catalog.items.filter((guide) => guide.category === category.name)
    return `## ${category.name}\n\n${guides.map((guide) => `### ${guide.title}\n\n${guide.purpose}\n\nUse when: ${guide.useWhen[0]}\n\nAvoid when: ${guide.avoidWhen[0]}\n\nWorkflow states: ${guide.states.join(" · ")}\n\nInteraction conditions: ${guide.interactionStates.join(" · ")}\n\nEvents: ${guide.events.map((event) => `\`${event}\``).join(" · ")}\n\nKit owns:\n${bullets(guide.kitOwns)}\n\nProduct owns:\n${bullets(guide.productOwns)}\n\nAccessibility:\n${bullets(guide.accessibility)}\n\nPhone behavior:\n${bullets(guide.responsive)}\n\nRelease proof:\n${bullets(guide.proof)}\n\nProject request: ${guide.prompt}`).join("\n\n")}`
  }).join("\n\n")

  return `# Kit Component Guides\n\nOne agent-readable operating guide for every reusable Kit component. Product routes, content, data, permissions, and business rules remain owned by the product. The selected Kit owns visual and interaction expression.\n\n${sections}\n`
}
