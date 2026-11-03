import { P } from '../lib/palette.js';

export default {
  key: 'cargo-drone',
  name: 'Cargo Drone',
  category: 'transport',
  blurb: 'Heavy-lift logistics drone carrying an underslung modular container pod with flight stabilizer booms.',
  what: 'a cargo drone',
  footprint: [1.6, 1.6],
  height: 1.1,
  tags: ['transport', 'drone', 'cargo', 'logistics', 'aerial'],
  refs: ['AF-TRN-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // underslung cargo container payload
    g.box({ x: 0, y: 0, z: 0.12, w: 0.85, d: 0.65, h: 0.52, c: P.steel });

    // heavy drone flight chassis
    g.box({ x: 0, y: 0, z: 0.64, w: 1.0, d: 0.9, h: 0.22, c: P.steelDark });

    // multi-rotor propulsion disc plane
    g.cyl({ x: 0, y: 0, z: 0.82, r: 0.72, h: 0.06, c: P.teal, segments: 12 });

    // top avionics / GPS navigation dome
    g.cyl({ x: 0, y: 0, z: 0.86, r: 0.22, r2: 0.1, h: 0.16, c: P.offWhite, segments: 10 });

    // cargo latch lock mechanism
    g.box({ x: 0, y: 0, z: 0.58, w: 0.55, d: 0.4, h: 0.12, c: P.offWhite });
  },
};
