const APPENDIX = /^(?:lecture|git)\/appendix\//

// Step and appendix pages share one header (title, subtitle, tags, date, buttons).
export function stepHeaderFlag(page) {
  if (page.frontmatter.pdf || APPENDIX.test(page.relativePath)) page.frontmatter.stepHeader = true
}
