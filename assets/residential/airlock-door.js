import { P } from '../lib/palette.js';

export default {
  key: 'airlock-door',
  name: 'Airlock Door',
  category: 'residential',
  blurb: 'Reinforced bulkhead pressure door with rotary dog wheel mechanism and thick viewport.',
  what: 'an airlock door',
  footprint: [1.2, 0.8],
  height: 1.5,
  tags: ['residential', 'door', 'airlock', 'bulkhead', 'seal'],
  refs: ['AF-RES-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // doorway threshold frame
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 0.6, h: 0.16, c: P.steelDark });

    // outer structural door surround frame
    g.box({ x: 0, y: 0, z: 0.16, w: 0.95, d: 0.45, h: 1.24, c: P.steel });

    // recessed insulated door panel
    g.box({ x: 0, y: 0, z: 0.22, w: 0.72, d: 0.32, h: 1.1, c: P.offWhite });

    // hermetic circular viewport
    g.circle({ x: 0, y: 0.17, z: 0.92, r: 0.14, c: P.teal, bias: 0.55 });

    // rotary locking wheel hub
    g.cyl({ x: 0, y: 0.18, z: 0.6, r: 0.12, h: 0.08, axis: 'y', c: P.steelDark, segments: 10 });
  },
};
