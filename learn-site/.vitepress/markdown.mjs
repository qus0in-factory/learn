import { render } from 'pele'

export const markdown = {
  config(md) {
    const fence = md.renderer.rules.fence
    md.renderer.rules.fence = (tokens, index, options, env, self) => {
      const token = tokens[index]
      if (token.info.trim() !== 'mermaid') return fence(tokens, index, options, env, self)
      return `<div class="mermaid-diagram">${render(token.content).svg}</div>\n`
    }
  },
}
