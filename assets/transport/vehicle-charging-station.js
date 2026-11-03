import { P } from '../lib/palette.js';

export default {
  key: 'vehicle-charging-station',
  name: 'Vehicle Charging Station',
  category: 'transport',
  blurb: 'Fast-charging inductive bollard station with illuminated status halo, cable holster, and touch terminal.',
  what: 'a vehicle charging station',
  footprint: [1.3, 1.0],
  height: 1.5,
  tags: ['transport', 'charging', 'power', 'station', 'infrastructure'],
  refs: ['AF-TRN-015'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete curb foundation
    g.box({ x: 0, y: 0, z: 0, w: 1.2, d: 0.9, h: 0.18, c: P.steelDark });

    // vertical charging terminal pillar
    g.box({ x: 0, y: 0, z: 0.18, w: 0.55, d: 0.45, h: 1.15, c: P.offWhite });

    // interactive user interface display panel
    g.box({ x: 0, y: 0.22, z: 0.72, w: 0.38, d: 0.08, h: 0.45, c: P.steel });

    // overhead illuminated status halo cap
    g.cyl({ x: 0, y: 0, z: 1.33, r: 0.22, h: 0.12, c: P.teal, segments: 12 });

    // high-voltage flexible charging conduit
    g.cyl({ x: 0.28, y: -0.1, z: 0.3, r: 0.08, h: 0.75, c: P.teal, segments: 8 });
  },
};
