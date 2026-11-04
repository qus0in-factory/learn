import { stat, statement } from './variety-emphasis.mjs';
import { compare, rows } from './variety-list.mjs';
import { split, steps } from './variety-process.mjs';
export const variety = s => ({ stat, statement, compare, rows, split, steps }[s.type]?.(s));
