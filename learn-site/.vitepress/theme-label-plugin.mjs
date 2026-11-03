import { labels } from './labels.mjs'

export function themeLabelPlugin() {
  const values = {
    'VPNavBarHamburger.vue': ['aria-label="mobile navigation"', `aria-label="${labels.mobileNavigation}"`],
    'VPNavBarExtra.vue': ['label="extra navigation"', `label="${labels.extraNavigation}"`],
  }
  return {
    name: 'localize-theme-aria',
    enforce: 'pre',
    transform(code, id) {
      const name = id.split('?')[0].split('/').at(-1)
      if (!id.includes('vitepress/dist/client/theme-default/components/')) return
      const value = values[name]
      if (value) return code.replace(value[0], value[1])
    },
  }
}
