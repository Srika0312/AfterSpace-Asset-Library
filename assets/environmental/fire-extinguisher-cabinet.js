import { P } from '../lib/palette.js';

export default {
  key: 'fire-extinguisher-cabinet',
  name: 'Fire Extinguisher Cabinet',
  category: 'environmental',
  blurb: 'Wall-mounted emergency fire suppression cabinet with inspection viewport and high-pressure cylinder.',
  what: 'a fire extinguisher cabinet',
  footprint: [1.0, 0.8],
  height: 1.4,
  tags: ['environmental', 'fire', 'extinguisher', 'safety', 'emergency'],
  refs: ['AF-PRP-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // wall mounting bracket plinth
    g.box({ x: 0, y: 0, z: 0, w: 0.8, d: 0.6, h: 0.18, c: P.steelDark });

    // main emergency red locker enclosure
    g.box({ x: 0, y: 0, z: 0.18, w: 0.7, d: 0.48, h: 0.95, c: P.red });

    // break-glass inspection viewport
    g.box({ x: 0, y: 0.24, z: 0.42, w: 0.48, d: 0.06, h: 0.55, c: P.offWhite });

    // high-pressure fire suppression cylinder
    g.cyl({ x: 0, y: 0.05, z: 0.3, r: 0.14, h: 0.65, c: P.red, segments: 10 });

    // emergency station beacon
    g.circle({ x: 0, y: 0.25, z: 1.05, r: 0.07, c: P.offWhite, bias: 0.55 });
  },
};
