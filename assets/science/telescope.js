import { P } from '../lib/palette.js';

export default {
  key: 'telescope',
  name: 'Telescope',
  category: 'science',
  blurb: 'Observatory optical telescope with equatorial pier mount, angled barrel, and counterweight bar.',
  what: 'a telescope',
  footprint: [1.8, 1.4],
  height: 2.0,
  tags: ['science', 'telescope', 'astronomy', 'observatory', 'optics'],
  refs: ['AF-SCI-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy equatorial tripod base
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 1.2, h: 0.24, c: P.steelDark });

    // equatorial pier mount column
    g.cyl({ x: 0, y: 0, z: 0.24, r: 0.22, h: 0.85, c: P.steel, segments: 12 });

    // angled optical telescope barrel
    g.cyl({ x: 0, y: 0.1, z: 1.2, r: 0.32, h: 1.3, axis: 'y', c: P.offWhite, segments: 14 });

    // objective lens dew shield hood
    g.cyl({ x: 0, y: 0.8, z: 1.2, r: 0.36, h: 0.22, axis: 'y', c: P.teal, segments: 14 });

    // declination counterweight bar
    g.cyl({ x: 0, y: -0.45, z: 0.95, r: 0.14, h: 0.22, axis: 'y', c: P.steelDark, segments: 10 });
  },
};
