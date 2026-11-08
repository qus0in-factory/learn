import { readFileSync } from 'node:fs'

export function markdownSource(file, ancestors = []) {
  const url = file instanceof URL ? file : new URL(`../../docs/${file}`, import.meta.url)
  if (ancestors.includes(url.href)) throw new Error(`Circular include: ${url.pathname}`)
  return readFileSync(url, 'utf8').replace(/<!--@include:\s*([^>]+?)\s*-->/g,
    (_, path) => markdownSource(new URL(path, url), [...ancestors, url.href]))
    .replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
}
