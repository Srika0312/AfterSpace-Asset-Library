import { P } from '../lib/palette.js';

export default {
  key: 'weather-monitoring-device',
  name: 'Weather Monitoring Device',
  category: 'science',
  blurb: 'Micro-meteorological probe station with cup anemometer, thermal radiation shield, and solar winglet.',
  what: 'a weather monitoring device',
  footprint: [1.2, 1.2],
  height: 2.3,
  tags: ['science', 'weather', 'meteorology', 'anemometer', 'probe'],
  refs: ['AF-SCI-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // ballast base footing plate
    g.box({ x: 0, y: 0, z: 0, w: 1.0, d: 1.0, h: 0.2, c: P.steelDark });

    // central tubular sensor mast
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.12, h: 1.6, c: P.steel, segments: 10 });

    // mid-level sensor radiation shield
    g.box({ x: 0, y: 0, z: 0.95, w: 0.45, d: 0.45, h: 0.35, c: P.offWhite });

    // wind anemometer cup head
    g.cyl({ x: 0, y: 0, z: 1.8, r: 0.34, r2: 0.08, h: 0.32, c: P.teal, segments: 12 });

    // mast solar panel charging winglet
    g.box({ x: 0, y: 0.28, z: 1.35, w: 0.45, d: 0.12, h: 0.25, c: P.teal });
  },
};
