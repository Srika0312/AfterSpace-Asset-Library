import { P } from '../lib/palette.js';

export default {
  key: 'composting-unit',
  name: 'Composting Unit',
  category: 'agriculture',
  blurb: 'Rotary bioreactor composter for rapid organic waste degradation, featuring cylindrical drum and input hopper.',
  what: 'a composting unit',
  footprint: [1.8, 1.4],
  height: 1.45,
  tags: ['agriculture', 'compost', 'recycling', 'soil', 'organic'],
  refs: ['AF-AGR-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base cradle support stanchions
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.25, h: 0.24, c: P.steelDark });

    // rotating cylindrical decomposition drum
    g.cyl({ x: 0, y: 0, z: 0.65, r: 0.45, h: 1.45, axis: 'x', c: P.canopy, segments: 14 });

    // organic mulch input hopper chute
    g.box({ x: -0.45, y: 0, z: 0.95, w: 0.45, d: 0.5, h: 0.4, c: P.steel });

    // humus discharge extraction gate
    g.box({ x: 0.45, y: 0, z: 0.24, w: 0.45, d: 0.5, h: 0.42, c: P.offWhite });

    // aerobic aeration sensor disc
    g.circle({ x: -0.45, y: 0.26, z: 1.15, r: 0.08, c: P.offWhite, bias: 0.55 });
  },
};
