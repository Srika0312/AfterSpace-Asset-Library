import { P } from '../lib/palette.js';

export default {
  key: 'exterior-pipes',
  name: 'Exterior Pipes',
  category: 'environmental',
  blurb: 'Exposed dual habitat utility conduit pipes with saddle pedestals, flange coupler, and valve wheel.',
  what: 'exterior pipes',
  footprint: [1.8, 0.9],
  height: 1.1,
  tags: ['environmental', 'pipes', 'conduit', 'plumbing', 'infrastructure'],
  refs: ['AF-PRP-023'],
  hero: 0,
  status: 'review',
  draw(g) {
    // structural pipe saddle pedestals
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 0.6, h: 0.18, c: P.steelDark });

    // lower heavy utility supply pipe
    g.cyl({ x: 0, y: -0.15, z: 0.45, r: 0.18, h: 1.7, axis: 'x', c: P.steel, segments: 12 });

    // upper coolant return line pipe
    g.cyl({ x: 0, y: 0.15, z: 0.75, r: 0.12, h: 1.7, axis: 'x', c: P.teal, segments: 10 });

    // bolted flange connector coupling
    g.cyl({ x: 0.25, y: -0.15, z: 0.45, r: 0.24, h: 0.16, axis: 'x', c: P.offWhite, segments: 12 });

    // manual valve actuator wheel
    g.cyl({ x: -0.3, y: 0.15, z: 0.95, r: 0.14, h: 0.06, axis: 'z', c: P.offWhite, segments: 10 });
  },
};
