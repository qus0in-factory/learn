import cover from './cover.json' with { type: 'json' }

export { cover }
export const coverImage = {
  src: `/cover-${cover.widths[0]}.webp`,
  width: cover.widths[0],
  height: Math.round(cover.widths[0] * cover.intrinsic.height / cover.intrinsic.width),
  srcset: cover.widths.map((width) => `/cover-${width}.webp ${width}w`).join(', '),
}
