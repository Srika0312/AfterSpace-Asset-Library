// The Afterspace — scaffold a new asset module.
// Usage: node tools/foundry/new-asset.mjs <category> <name>

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, ASSET_ROOT } from './library.mjs';
import { CATEGORIES, CATEGORY_ORDER } from '../../assets/lib/palette.js';

const args = process.argv.slice(2).filter((a) => a !== '--force');
const force = process.argv.includes('--force');
const [categoryArg, ...nameParts] = args;

if (!categoryArg || !nameParts.length) {
  console.error('');
  console.error('  Usage: node tools/foundry/new-asset.mjs <category> <name>');
  console.error('');
  console.error('  Categories: ' + CATEGORY_ORDER.join(', '));
  console.error('  Example:    node tools/foundry/new-asset.mjs props "Market Stool"');
  console.error('');
  process.exit(1);
}

const category = categoryArg.toLowerCase().trim();
if (!CATEGORIES[category]) {
  console.error(`\n  Unknown category "${categoryArg}".`);
  console.error('  Use one of: ' + CATEGORY_ORDER.join(', ') + '\n');
  process.exit(1);
}

const name = nameParts.join(' ').trim().replace(/\s+/g, ' ');
const key = name
  .toLowerCase()
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!key) {
  console.error('\n  Could not make a file key from that name.\n');
  process.exit(1);
}

const dir = path.join(ASSET_ROOT, category);
const file = path.join(dir, `${key}.js`);
if (fs.existsSync(file) && !force) {
  console.error(`\n  ${path.relative(ROOT, file)} already exists. Use --force to overwrite.\n`);
  process.exit(1);
}

const template = `import { P } from '../lib/palette.js';

export default {
  key: '${key}',
  name: ${JSON.stringify(name)},
  category: '${category}',
  blurb: 'One short sentence describing what this asset is and where it is used.',
  what: ${JSON.stringify('a ' + name.toLowerCase())},
  footprint: [1, 1],
  height: 1,
  tags: ['${category}', 'new'],
  refs: [],
  hero: 0,
  status: 'review',
  draw(g) {
    // Start with one volume, then add only the shapes that survive at 32 px.
    g.box({ x: 0, y: 0, z: 0, w: 1, d: 1, h: 0.8, c: P.sand });
  },
};
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, template, 'utf8');

console.log('');
console.log('  Created ' + path.relative(ROOT, file));
console.log('  The Foundry will pick it up on the next save.');
console.log('');
console.log('  Next:');
console.log('    1. Replace the placeholder box with 3–6 primitives.');
console.log('    2. Set footprint and height to match the drawing.');
console.log('    3. Run npm run validate (or open the Guide in the UI).');
console.log('');
