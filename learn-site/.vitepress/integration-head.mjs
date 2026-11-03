import settings from './integrations.json' with { type: 'json' }
import { ga4Head } from './ga4-head.mjs'

export function integrationHead(config = settings) {
  const head = []
  const verification = config.googleSiteVerification.trim()
  if (verification) head.push(['meta', { name: 'google-site-verification', content: verification }])
  const id = config.ga4MeasurementId.trim()
  if (config.analyticsEnabled && id) head.push(...ga4Head(id))
  return head
}
