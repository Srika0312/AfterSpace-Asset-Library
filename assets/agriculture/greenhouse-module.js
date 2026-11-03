import { P } from '../lib/palette.js';

export default {
  key: 'greenhouse-module',
  name: 'Greenhouse Module',
  category: 'agriculture',
  blurb: 'Pressurized botanical greenhouse bay with translucent glazed roof, raised planter beds, and climate unit.',
  what: 'a greenhouse module',
  footprint: [2.4, 2.0],
  height: 1.9,
  tags: ['agriculture', 'greenhouse', 'botanical', 'crops', 'biosphere'],
  refs: ['AF-AGR-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete perimeter foundation curb
    g.box({ x: 0, y: 0, z: 0, w: 2.3, d: 1.9, h: 0.22, c: P.steelDark });

    // interior raised soil planter beds
    g.box({ x: 0, y: 0, z: 0.22, w: 2.0, d: 1.6, h: 0.45, c: P.canopy });

    // glazed solar greenhouse envelope
    g.box({ x: 0, y: 0, z: 0.67, w: 2.1, d: 1.7, h: 0.65, c: P.teal });

    // pitched translucent atrium roof
    g.roof({ x: 0, y: 0, z: 1.32, w: 2.2, d: 1.8, h: 0.52, c: P.offWhite, gable: P.teal, ridge: 'x' });

    // exterior environmental climate unit
    g.box({ x: 0.95, y: 0, z: 0.22, w: 0.35, d: 0.65, h: 0.65, c: P.steelDark });
  },
};
