import { P } from '../lib/palette.js';

export default {
  key: 'research-satellite',
  name: 'Research Satellite',
  category: 'science',
  blurb: 'Orbital scientific instrument bus with deployable solar collector wings and magnetometer boom.',
  what: 'a research satellite',
  footprint: [2.2, 1.8],
  height: 1.4,
  tags: ['science', 'satellite', 'orbital', 'space', 'probe'],
  refs: ['AF-SCI-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // cubic satellite avionics bus
    g.box({ x: 0, y: 0, z: 0.35, w: 0.85, d: 0.85, h: 0.75, c: P.offWhite });

    // port solar collector wing
    g.box({ x: -0.9, y: 0, z: 0.65, w: 0.85, d: 1.4, h: 0.08, c: P.teal });

    // starboard solar collector wing
    g.box({ x: 0.9, y: 0, z: 0.65, w: 0.85, d: 1.4, h: 0.08, c: P.teal });

    // magnetometer science boom mast
    g.cyl({ x: 0, y: 0, z: 1.1, r: 0.06, h: 0.45, c: P.steel, segments: 8 });

    // thruster attitude control base ring
    g.cyl({ x: 0, y: 0, z: 0.15, r: 0.28, h: 0.2, c: P.steelDark, segments: 10 });
  },
};
