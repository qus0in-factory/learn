import { seoBuild } from './seo-build.mjs'
import { adsBuild } from './ads-build.mjs'

export function siteBuild(config) {
  seoBuild(config)
  adsBuild(config)
}
