import { P } from '../lib/palette.js';

export default {
  key: 'fuel-storage-tank',
  name: 'Fuel Storage Tank',
  category: 'industrial',
  blurb: 'Horizontal bulk hydrocarbon fuel tank on dual reinforced concrete saddles.',
  what: 'a fuel storage tank',
  footprint: [2.2, 1.2],
  height: 1.4,
  tags: ['industrial', 'fuel', 'tank', 'diesel', 'storage'],
  refs: ['AF-IND-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete saddle cradle pair
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 0.75, h: 0.25, c: P.slate });

    // horizontal cylindrical storage drum
    g.cyl({ x: 0, y: 0, z: 0.65, r: 0.42, h: 1.8, c: P.offWhite, axis: 'x', segments: 12 });

    // top inspection catwalk and ladder head
    g.box({ x: 0, y: 0, z: 1.08, w: 1.2, d: 0.3, h: 0.08, c: P.steelDark });

    // emergency fuel shutoff indicator
    g.circle({ x: 0.92, y: 0, z: 0.65, r: 0.12, c: P.red, bias: 0.6 });
  },
};
