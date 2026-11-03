import { P } from '../lib/palette.js';

export default {
  key: 'outdoor-lighting-unit',
  name: 'Outdoor Lighting Unit',
  category: 'residential',
  blurb: 'Slender habitat perimeter luminaire post with solar battery cap and high-lumen floodlight.',
  what: 'an outdoor lighting unit',
  footprint: [0.8, 0.8],
  height: 2.2,
  tags: ['residential', 'lighting', 'lamp', 'bollard', 'luminaire'],
  refs: ['AF-RES-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete bollard footing
    g.box({ x: 0, y: 0, z: 0, w: 0.65, d: 0.65, h: 0.2, c: P.steelDark });

    // slender tubular luminaire pole
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.08, h: 1.7, c: P.steel, segments: 8 });

    // cantilevered luminaire head housing
    g.box({ x: 0.15, y: 0, z: 1.85, w: 0.42, d: 0.26, h: 0.12, c: P.offWhite });

    // downward LED emitter lens
    g.circle({ x: 0.2, y: 0, z: 1.84, r: 0.1, c: P.amber, bias: 0.55 });

    // top solar charger cap
    g.cyl({ x: 0.15, y: 0, z: 1.97, r: 0.16, h: 0.06, c: P.steelDark, segments: 10 });
  },
};
