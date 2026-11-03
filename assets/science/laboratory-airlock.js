import { P } from '../lib/palette.js';

export default {
  key: 'laboratory-airlock',
  name: 'Laboratory Airlock',
  category: 'science',
  blurb: 'Decontamination cleanroom airlock chamber with overhead air shower hood and interlocking hermetic doors.',
  what: 'a laboratory airlock',
  footprint: [2.0, 1.6],
  height: 1.65,
  tags: ['science', 'airlock', 'cleanroom', 'decontamination', 'laboratory'],
  refs: ['AF-SCI-015'],
  hero: 0,
  status: 'review',
  draw(g) {
    // cleanroom entrance ramp threshold
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.5, h: 0.2, c: P.steelDark });

    // sealed air shower decontamination vestibule
    g.box({ x: 0, y: 0, z: 0.2, w: 1.5, d: 1.3, h: 1.15, c: P.offWhite });

    // overhead HEPA air shower fan housing
    g.roof({ x: 0, y: 0, z: 1.35, w: 1.55, d: 1.35, h: 0.25, c: P.teal, gable: P.offWhite, ridge: 'y' });

    // interlocking hermetic door frame
    g.box({ x: 0.76, y: 0, z: 0.22, w: 0.08, d: 0.7, h: 0.95, c: P.steel });

    // decontamination status beacon
    g.circle({ x: 0.77, y: 0, z: 1.25, r: 0.07, c: P.teal, bias: 0.55 });
  },
};
