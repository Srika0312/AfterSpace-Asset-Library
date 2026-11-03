import { P } from '../lib/palette.js';

export default {
  key: 'ventilation-outlet',
  name: 'Ventilation Outlet',
  category: 'environmental',
  blurb: 'Mushroom-head habitat exhaust air stack with louvered intake grille, conical cowl, and inspection dome.',
  what: 'a ventilation outlet',
  footprint: [1.3, 1.0],
  height: 1.35,
  tags: ['environmental', 'ventilation', 'outlet', 'exhaust', 'hvac'],
  refs: ['AF-PRP-025'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete base curb mount
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 0.85, h: 0.2, c: P.steelDark });

    // vertical tubular air duct riser
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.32, h: 0.7, c: P.steel, segments: 12 });

    // louvered exhaust intake grille
    g.cyl({ x: 0, y: 0, z: 0.9, r: 0.38, h: 0.2, c: P.teal, segments: 12 });

    // conical weather cowl mushroom cap
    g.cyl({ x: 0, y: 0, z: 1.1, r: 0.48, r2: 0.15, h: 0.22, c: P.offWhite, segments: 12 });

    // top inspection access dome
    g.circle({ x: 0, y: 0, z: 1.33, r: 0.14, c: P.teal, bias: 0.55 });
  },
};
