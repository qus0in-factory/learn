const LINK = /\.\.\/(\d{2}-[\w-]+)\.md/g

export const parseLinks = (text) => [...new Set([...text.matchAll(LINK)].map((m) => m[1]))]
