import { labels } from './labels.mjs'

export function stepLabel(index) {
  return `${labels.step} ${String(index + 1).padStart(labels.stepDigits, labels.stepPad)}`
}
