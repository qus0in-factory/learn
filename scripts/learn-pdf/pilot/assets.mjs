import { readFile } from 'node:fs/promises';
import { diagramSize } from './diagram-size.mjs';
import { subject } from './subject.mjs';
import { loadImage } from './media.mjs';
import { contract } from './contract.mjs';
export async function assets(deck) {
  await contract(deck);
  await subject(deck);
  const uri = async path => 'data:image/svg+xml;base64,' +
    (await readFile(new URL(path, import.meta.url))).toString('base64');
  for (const slide of deck) {
    await loadImage(slide);
    if (slide.diagram) slide.diagramSvg = diagramSize(await readFile(new URL(slide.diagram, import.meta.url), 'utf8'));
    if (!slide.iconMeaning) delete slide.icons;
    if (slide.icons) slide.icons = await Promise.all(slide.icons.map(uri));
  }
  return deck;
}
