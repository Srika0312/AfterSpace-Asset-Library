import { P } from '../lib/palette.js';

export default {
  key: 'power-cable-junction',
  name: 'Power Cable Junction',
  category: 'energy',
  blurb: 'Subsurface cable splice vault with heavy access hatch and lateral conduit stubs.',
  what: 'a power cable junction',
  footprint: [1.1, 1.1],
  height: 0.75,
  tags: ['energy', 'conduit', 'junction', 'cables', 'underground'],
  refs: ['AF-ENG-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // precast concrete vault foundation
    g.box({ x: 0, y: 0, z: 0, w: 0.95, d: 0.95, h: 0.35, c: P.sand });

    // heavy cast-iron circular access cover
    g.cyl({ x: 0, y: 0, z: 0.35, r: 0.35, h: 0.08, c: P.steelDark, segments: 10 });

    // lateral conduit entrance pipe
    g.cyl({ x: 0.48, y: 0, z: 0.18, r: 0.09, h: 0.22, c: P.steel, axis: 'x', segments: 8 });

    // transverse conduit entrance pipe
    g.cyl({ x: 0, y: 0.48, z: 0.18, r: 0.09, h: 0.22, c: P.steel, axis: 'y', segments: 8 });

    // high voltage warning indicator disc
    g.circle({ x: 0, y: 0, z: 0.45, r: 0.1, c: P.amber, bias: 0.6 });
  },
};
