import { readFileSync } from 'node:fs'
import { expandGlossary } from './easy-glossary.mjs'
export const readDeck = file => expandGlossary(JSON.parse(readFileSync(file)))
