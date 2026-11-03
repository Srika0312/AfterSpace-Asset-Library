import { P } from '../lib/palette.js';

export default {
  key: 'crystal-rock',
  name: 'Crystal Rock',
  category: 'vegetation',
  blurb: 'Natural geological cluster of prismatic mineral crystals emerging from dark rocky bedrock.',
  what: 'a crystal rock',
  footprint: [1.4, 1.2],
  height: 1.4,
  tags: ['vegetation', 'crystal', 'mineral', 'rock', 'geology'],
  refs: ['AF-VEG-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // geological rock base plinth
    g.box({ x: 0, y: 0, z: 0, w: 1.2, d: 1.0, h: 0.2, c: P.steelDark });

    // large primary crystalline spire
    g.roof({ x: -0.15, y: -0.1, z: 0.2, w: 0.55, d: 0.55, h: 1.15, c: P.teal, gable: P.cyan, ridge: 'x' });

    // secondary crystal cluster spire
    g.roof({ x: 0.25, y: 0.15, z: 0.2, w: 0.45, d: 0.45, h: 0.85, c: P.cyan, gable: P.teal, ridge: 'y' });

    // small tertiary crystal facet
    g.roof({ x: -0.1, y: 0.25, z: 0.2, w: 0.35, d: 0.35, h: 0.55, c: P.teal, gable: P.offWhite, ridge: 'x' });

    // prismatic specular facet reflection
    g.circle({ x: -0.15, y: -0.1, z: 0.95, r: 0.08, c: P.offWhite, bias: 0.55 });
  },
};
