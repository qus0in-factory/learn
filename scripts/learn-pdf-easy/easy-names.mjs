// Deck file names (stepNN.json) and PDF file names, per design section 1.
export const names = [
  '21-what-is-github', '22-ai-and-github', '23-what-is-git-cli', '24-git-principle',
  '25-gh-signup-and-repo', '26-gh-markdown', '27-gh-til', '28-gh-chatgpt-connection',
  '29-git-install', '30-init-commit', '31-remote-connect', '32-branch-merge',
]

export const stepName = name => `step${name.slice(0, 2)}`
