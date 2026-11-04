import { appendixLabels as text } from './appendix-labels.mjs'

export const appendixGroups = [
  { id: 'environment', text: text.environment,
    order: ['00-installation', '06-cli-terminal-shell', '05-os-differences', '01-authentication', '11-environment-secrets', '12-nvidia-nim'] },
  { id: 'git', text: text.git,
    order: ['02-git-options', '08-vi-editor', '09-commit-message', '10-gitignore-patterns', '07-git-scenarios', '14-github-collaboration', '15-hosting-vcs'] },
  { id: 'web', text: text.web, order: ['03-web-tools', '04-mermaid', '13-profile-records'] },
].map(group => ({ ...group, directory: 'appendix/', collapsed: true }))
