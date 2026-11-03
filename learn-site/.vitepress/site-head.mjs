import { printHead } from './print.mjs'
import { faviconHead } from './favicon.mjs'
import { integrationHead } from './integration-head.mjs'

export const siteHead = [...printHead, ...faviconHead, ...integrationHead()]
