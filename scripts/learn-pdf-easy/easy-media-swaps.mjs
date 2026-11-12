// Keep the pilot image loader and markup, without easy slide captions.
export const mediaSwaps = (root, pilot) => [
  ['new URL(s.image, import.meta.url)',
    `(s.image.startsWith('docs/') ? new URL(s.image, ${JSON.stringify(root.href)}) : new URL(s.image, ${pilot}))`],
  ['!mime || !s.caption', '!mime'],
  ['<figcaption>${escape(s.caption)}</figcaption>', ''],
  ['alt="${escape(s.caption)}"', 'alt=""'],
]
