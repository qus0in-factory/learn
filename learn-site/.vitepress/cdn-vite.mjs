import { cdnUrl } from './cdn-url.mjs'

export const cdnVite = {
  experimental: {
    renderBuiltUrl(filename) {
      const local = `/${filename}`
      const url = cdnUrl(local, process.env.VITE_ASSET_CDN_BASE_URL)
      if (url !== local) return url
    },
  },
}
