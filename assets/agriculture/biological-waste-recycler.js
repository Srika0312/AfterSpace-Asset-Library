import { P } from '../lib/palette.js';

export default {
  key: 'biological-waste-recycler',
  name: 'Biological Waste Recycler',
  category: 'agriculture',
  blurb: 'Closed-loop anaerobic bio-digester with vertical reactor vessel, gas recovery dome, and fertilizer separator.',
  what: 'a biological waste recycler',
  footprint: [2.0, 1.5],
  height: 1.75,
  tags: ['agriculture', 'waste', 'recycler', 'anaerobic', 'biogas'],
  refs: ['AF-AGR-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base digester foundation pad
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.4, h: 0.22, c: P.steelDark });

    // vertical anaerobic digestion reactor vessel
    g.cyl({ x: -0.32, y: 0, z: 0.22, r: 0.55, h: 1.15, c: P.canopy, segments: 14 });

    // gas recovery dome top cap
    g.cyl({ x: -0.32, y: 0, z: 1.37, r: 0.44, r2: 0.2, h: 0.3, c: P.offWhite, segments: 12 });

    // effluent liquid fertilizer separator
    g.box({ x: 0.45, y: -0.15, z: 0.22, w: 0.65, d: 0.75, h: 0.85, c: P.steel });

    // methane biogas collection riser conduit
    g.cyl({ x: 0.45, y: 0.3, z: 0.22, r: 0.12, h: 1.25, axis: 'z', c: P.canopy, segments: 8 });
  },
};
