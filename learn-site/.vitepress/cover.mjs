import cover from './cover.json' with { type: 'json' }
import { coverPicture } from './cover-picture.mjs'

export { cover }
const sources = coverPicture(cover)
export const coverImage = sources.image
export const coverAvif = sources.avif
export const shareCover = sources.share
