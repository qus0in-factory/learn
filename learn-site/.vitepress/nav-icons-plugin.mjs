import { readFileSync } from 'node:fs'
import icons from './nav-icons.json'

const ID = 'virtual:nav-icons.css'
const dir = new URL('./theme/icons/nav/', import.meta.url)
const dataUri = (name) => {
  const svg = readFileSync(new URL(`${name}.svg`, dir), 'utf8').replace(/\s+/g, ' ').replace(/"/g, "'")
  return `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27')}")`
}

// One rule per sidebar link: the mapping lives in nav-icons.json, the drawing in theme/icons/nav.
export function navIcons() {
  return {
    name: 'nav-icons',
    resolveId: (id) => (id === ID ? `\0${ID}` : undefined),
    load(id) {
      if (id !== `\0${ID}`) return
      return Object.entries(icons)
        .map(([slug, name]) => `.VPSidebarItem .link[href="${slug.startsWith('/') ? slug : '/git/' + slug}"] { --nav-icon-image: ${dataUri(name)}; --nav-icon-display: block; }`)
        .join('\n')
    },
  }
}
