import { P } from '../lib/palette.js';

export default {
  key: 'habitat-connection-tunnel',
  name: 'Habitat Connection Tunnel',
  category: 'residential',
  blurb: 'Pressurized umbilical walkway tube connecting habitat structures with structural expansion rib.',
  what: 'a habitat connection tunnel',
  footprint: [2.2, 1.2],
  height: 1.15,
  tags: ['residential', 'tunnel', 'connector', 'walkway', 'umbilical'],
  refs: ['AF-RES-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // cradle support foundation piers
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 0.85, h: 0.18, c: P.steelDark });

    // cylindrical pressurized walkway tube
    g.cyl({ x: 0, y: 0, z: 0.52, r: 0.44, h: 2.1, axis: 'x', c: P.offWhite, segments: 14 });

    // central structural expansion rib collar
    g.cyl({ x: 0, y: 0, z: 0.52, r: 0.52, h: 0.28, axis: 'x', c: P.steel, segments: 14 });

    // longitudinal observation window stripe
    g.box({ x: 0, y: 0.42, z: 0.52, w: 1.6, d: 0.08, h: 0.18, c: P.teal });

    // overhead utility conduit spine
    g.box({ x: 0, y: 0, z: 0.96, w: 2.1, d: 0.18, h: 0.12, c: P.steelDark });
  },
};
