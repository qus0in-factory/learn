// Deck file names (stepNN.json) and PDF file names, per design section 1.
export const names = [
  '01-what-is-github', '02-ai-and-github', '03-what-is-git-cli', '04-git-principle',
  '05-gh-signup-and-repo', '06-gh-markdown', '07-gh-til', '08-gh-chatgpt-connection',
  '09-git-install', '10-init-commit', '11-remote-connect', '12-branch-merge',
]

export const stepName = name => `step${name.slice(0, 2)}`
