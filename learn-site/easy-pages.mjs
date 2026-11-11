const names = ['01-what-is-github', '02-ai-and-github', '04-what-is-git-cli', '05-git-principle']
export const ghPractice = ['01-signup-and-repo', '02-markdown', '03-til', '04-chatgpt-connection']
  .map(name => `git-easy/github-practice/${name}.html`)
export const gitPractice = ['01-git-install', '02-init-commit', '03-remote-connect', '04-branch-merge']
  .map(name => `git-easy/git-practice/${name}.html`)

export const easyPages = ['git-easy/index.html', ...names.map(name => `git-easy/${name}.html`),
  ...ghPractice, ...gitPractice]
