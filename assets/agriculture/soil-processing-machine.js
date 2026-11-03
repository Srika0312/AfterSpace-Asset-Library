import { P } from '../lib/palette.js';

export default {
  key: 'soil-processing-machine',
  name: 'Soil Processing Machine',
  category: 'agriculture',
  blurb: 'Industrial regolith conditioning machine with rotary trommel screen, intake hopper, and output conveyor.',
  what: 'a soil processing machine',
  footprint: [2.2, 1.4],
  height: 1.65,
  tags: ['agriculture', 'soil', 'regolith', 'trommel', 'processing'],
  refs: ['AF-AGR-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy machine chassis frame
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 1.25, h: 0.22, c: P.steelDark });

    // rotary trommel soil separating drum
    g.cyl({ x: -0.35, y: 0, z: 0.65, r: 0.42, h: 1.2, axis: 'x', c: P.steel, segments: 12 });

    // raw regolith intake hopper
    g.box({ x: -0.75, y: 0, z: 0.75, w: 0.45, d: 0.85, h: 0.65, c: P.steelDark });

    // enriched soil output conveyor bed
    g.box({ x: 0.48, y: 0, z: 0.22, w: 0.85, d: 0.75, h: 0.55, c: P.canopy });

    // microbial nutrient injector console
    g.box({ x: 0.48, y: 0, z: 0.77, w: 0.65, d: 0.45, h: 0.55, c: P.offWhite });
  },
};
