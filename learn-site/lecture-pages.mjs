const lectures = ['01-environment', '02-local-repository', '03-commit-history',
  '04-amend-ignore', '05-remote', '06-pages', '07-markdown-mermaid',
  '08-profile-records', '09-issues', '10-branches-tags', '11-merge-conflicts', '12-pull-request']
const appendices = ['00-installation', '01-authentication', '02-git-options',
  '03-web-tools', '04-mermaid', '05-os-differences', '06-cli-terminal-shell', '07-git-scenarios', '08-vi-editor',
  '09-commit-message', '10-gitignore-patterns', '11-environment-secrets', '12-nvidia-nim', '13-profile-records', '14-github-collaboration', '15-hosting-vcs', '16-record-examples']

export const lecturePages = [...lectures.map(name => `git/${name}.html`),
  ...appendices.map(name => `git/appendix/${name}.html`)]
