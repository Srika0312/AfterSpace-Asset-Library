import { P } from '../lib/palette.js';

export default {
  key: 'electrical-junction-box',
  name: 'Electrical Junction Box',
  category: 'environmental',
  blurb: 'Weatherproof electrical terminal enclosure mounted on concrete pad with incoming cable conduits.',
  what: 'an electrical junction box',
  footprint: [1.0, 0.8],
  height: 1.2,
  tags: ['environmental', 'electrical', 'junction', 'box', 'power'],
  refs: ['AF-PRP-021'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete foundation footing
    g.box({ x: 0, y: 0, z: 0, w: 0.9, d: 0.7, h: 0.18, c: P.steelDark });

    // galvanized steel terminal enclosure
    g.box({ x: 0, y: 0, z: 0.18, w: 0.75, d: 0.52, h: 0.72, c: P.steel });

    // high-voltage access panel door
    g.box({ x: 0, y: 0.26, z: 0.25, w: 0.6, d: 0.05, h: 0.55, c: P.offWhite });

    // bottom incoming cable conduit
    g.cyl({ x: -0.22, y: -0.15, z: 0.1, r: 0.08, h: 0.6, axis: 'z', c: P.steelDark, segments: 8 });

    // high-voltage warning symbol disc
    g.circle({ x: 0, y: 0.29, z: 0.65, r: 0.08, c: P.amber, bias: 0.55 });
  },
};
