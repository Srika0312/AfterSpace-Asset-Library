import { P } from '../lib/palette.js';

export default {
  key: 'residential-capsule',
  name: 'Residential Capsule',
  category: 'residential',
  blurb: 'Compact cylindrical personal sleep pod mounted on a steel cradle with observation porthole.',
  what: 'a residential capsule',
  footprint: [1.8, 1.4],
  height: 1.45,
  tags: ['residential', 'capsule', 'sleep-pod', 'habitat', 'living'],
  refs: ['AF-RES-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // structural cradle footing
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 1.2, h: 0.24, c: P.steelDark });

    // horizontal sleeping capsule drum
    g.cyl({ x: 0, y: 0, z: 0.68, r: 0.46, h: 1.5, axis: 'x', c: P.offWhite, segments: 14 });

    // capsule endcap / access hatch rim
    g.cyl({ x: 0.76, y: 0, z: 0.68, r: 0.48, h: 0.1, axis: 'x', c: P.teal, segments: 14 });

    // circular observation port window
    g.circle({ x: 0, y: 0.47, z: 0.68, r: 0.18, c: P.teal, bias: 0.55 });

    // top utility spine conduit
    g.box({ x: 0, y: 0, z: 1.15, w: 1.3, d: 0.22, h: 0.12, c: P.steel });
  },
};
