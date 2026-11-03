import { P } from '../lib/palette.js';

export default {
  key: 'geological-scanner',
  name: 'Geological Scanner',
  category: 'science',
  blurb: 'Ground-penetrating acoustic radar unit with seismic transducer drum, sensor mast, and telemetry console.',
  what: 'a geological scanner',
  footprint: [1.4, 1.2],
  height: 1.5,
  tags: ['science', 'geology', 'scanner', 'radar', 'seismic'],
  refs: ['AF-SCI-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // ground coupling tripod base
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 1.1, h: 0.2, c: P.steelDark });

    // acoustic seismic pulse transducer drum
    g.cyl({ x: 0, y: 0, z: 0.2, r: 0.45, h: 0.55, c: P.steel, segments: 14 });

    // analytical data processing unit
    g.box({ x: 0, y: 0, z: 0.75, w: 0.75, d: 0.65, h: 0.42, c: P.offWhite });

    // upright subsurface sensor antenna mast
    g.cyl({ x: 0.28, y: -0.2, z: 0.75, r: 0.06, h: 0.65, c: P.teal, segments: 8 });

    // pulse calibration emitter disc
    g.circle({ x: 0, y: 0.34, z: 0.95, r: 0.1, c: P.teal, bias: 0.55 });
  },
};
