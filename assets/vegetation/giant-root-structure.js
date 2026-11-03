import { P } from '../lib/palette.js';

export default {
  key: 'giant-root-structure',
  name: 'Giant Root Structure',
  category: 'vegetation',
  blurb: 'Massive weathered buttress tree root system breaking through soil with mossy bark texture.',
  what: 'a giant root structure',
  footprint: [1.7, 1.5],
  height: 1.25,
  tags: ['vegetation', 'roots', 'tree', 'botanical', 'ancient'],
  refs: ['AF-VEG-018'],
  hero: 0,
  status: 'review',
  draw(g) {
    // cracked ground subsoil mound
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.5, h: 0.18, c: P.soil });

    // massive buttress root trunk core
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.55, r2: 0.35, h: 0.95, c: P.barkDark, segments: 12 });

    // major horizontal surface root arch
    g.cyl({ x: 0.35, y: -0.2, z: 0.35, r: 0.22, h: 1.1, axis: 'x', c: P.bark, segments: 10 });

    // secondary winding surface root
    g.cyl({ x: -0.3, y: 0.25, z: 0.25, r: 0.18, h: 0.95, axis: 'y', c: P.bark, segments: 10 });

    // moss growth patch on root bark
    g.circle({ x: 0.1, y: -0.15, z: 0.95, r: 0.16, c: P.canopy, bias: 0.55 });
  },
};
