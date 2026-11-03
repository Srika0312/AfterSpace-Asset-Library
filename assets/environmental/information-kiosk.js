import { P } from '../lib/palette.js';

export default {
  key: 'information-kiosk',
  name: 'Information Kiosk',
  category: 'environmental',
  blurb: 'Interactive public directory kiosk with angled capacitive touchscreen, canopy hood, and pedestal base.',
  what: 'an information kiosk',
  footprint: [1.2, 0.9],
  height: 1.5,
  tags: ['environmental', 'kiosk', 'directory', 'interactive', 'touchscreen'],
  refs: ['AF-PRP-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // pedestal foundation footing
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 0.8, h: 0.18, c: P.steelDark });

    // main kiosk pedestal pillar
    g.box({ x: 0, y: -0.05, z: 0.18, w: 0.75, d: 0.5, h: 0.68, c: P.offWhite });

    // sloped interactive touch interface display
    g.roof({ x: 0, y: 0.08, z: 0.86, w: 0.85, d: 0.5, h: 0.42, c: P.teal, gable: P.steelDark, ridge: 'x' });

    // top overhead glare sunshield cowl
    g.box({ x: 0, y: -0.1, z: 1.28, w: 0.9, d: 0.35, h: 0.12, c: P.steel });

    // contactless ID card reader sensor
    g.circle({ x: 0.25, y: 0.2, z: 0.75, r: 0.06, c: P.offWhite, bias: 0.55 });
  },
};
