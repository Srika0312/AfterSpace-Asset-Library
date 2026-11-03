import { P } from '../lib/palette.js';

export default {
  key: 'parking-marker',
  name: 'Parking Marker',
  category: 'environmental',
  blurb: 'Rover docking bay wheel stop barrier with hazard stripes and ground induction charging pad.',
  what: 'a parking marker',
  footprint: [1.6, 1.2],
  height: 0.3,
  tags: ['environmental', 'parking', 'marker', 'docking', 'charging'],
  refs: ['AF-PRP-020'],
  hero: 0,
  status: 'review',
  draw(g) {
    // low-profile wheel curb bumper
    g.box({ x: 0, y: -0.35, z: 0, w: 1.5, d: 0.28, h: 0.18, c: P.steelDark });

    // bay boundary stripe marker pad
    g.box({ x: 0, y: 0.2, z: 0, w: 1.4, d: 0.7, h: 0.05, c: P.steel });

    // hazard stripe collar
    g.box({ x: 0, y: -0.35, z: 0.18, w: 1.2, d: 0.24, h: 0.06, c: P.amber });

    // induction ground charging pad disc
    g.cyl({ x: 0, y: 0.2, z: 0.05, r: 0.32, h: 0.04, c: P.teal, segments: 14 });

    // docking sensor alignment node
    g.circle({ x: 0, y: 0.2, z: 0.1, r: 0.1, c: P.amber, bias: 0.55 });
  },
};
