import { P } from '../lib/palette.js';

export default {
  key: 'communication-satellite',
  name: 'Communication Satellite',
  category: 'space',
  blurb: 'Orbital relay with twin solar wings and a dish for habitat-to-habitat comms.',
  what: 'a communications satellite',
  footprint: [2.8, 1.2],
  height: 2,
  tags: ['space', 'satellite', 'comms', 'orbital'],
  refs: ['AF-SPACE-001'],
  hero: 0,
  status: 'review',
  shadow: false,
  draw(g) {
    // central bus and two solar wings
    g.box({ x: 0, y: 0, z: 1.1, w: 0.7, d: 0.55, h: 0.5, c: P.offWhite });
    g.box({ x: -0.85, y: 0, z: 1.34, w: 1, d: 0.55, h: 0.05, c: P.teal });
    g.box({ x: 0.85, y: 0, z: 1.34, w: 1, d: 0.55, h: 0.05, c: P.teal });

    // top-mounted uplink dish
    g.circle({ x: 0, y: 0, z: 1.63, r: 0.28, c: P.steel, bias: 0.6 });
    g.circle({ x: 0, y: 0, z: 1.63, r: 0.09, c: P.brass, bias: 0.62 });
  },
};
