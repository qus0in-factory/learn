import { printHead } from './print.mjs'
import { faviconHead } from './favicon.mjs'
import { integrationHead } from './integration-head.mjs'

const fontHead = [
  ['link', { rel: 'preload', href: '/fonts/caveat-nietzsche.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
]

export const siteHead = [...printHead, ...faviconHead, ...integrationHead(), ...fontHead]
