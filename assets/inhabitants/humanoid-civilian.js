import { P } from '../lib/palette.js';

export default {
  key: 'humanoid-civilian',
  name: 'Humanoid Civilian',
  category: 'inhabitants',
  blurb: 'Colonist inhabitant in casual habitat jumpsuit with personal communicator pad and protective cowl.',
  what: 'a humanoid civilian',
  footprint: [0.6, 0.6],
  height: 1.45,
  tags: ['inhabitants', 'humanoid', 'civilian', 'colonist', 'resident'],
  refs: ['AF-INH-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // standing legs / boots
    g.box({ x: 0, y: 0, z: 0, w: 0.35, d: 0.28, h: 0.55, c: P.steelDark });

    // habitat casual jumpsuit tunic
    g.box({ x: 0, y: 0, z: 0.55, w: 0.45, d: 0.32, h: 0.55, c: P.offWhite });

    // habitat neck collar and head
    g.cyl({ x: 0, y: 0, z: 1.1, r: 0.14, h: 0.26, c: P.clay, segments: 10 });

    // personal communicator pad
    g.box({ x: 0.22, y: 0.1, z: 0.65, w: 0.1, d: 0.14, h: 0.18, c: P.teal });

    // atmospheric protective cowl hair
    g.roof({ x: 0, y: 0, z: 1.32, w: 0.32, d: 0.32, h: 0.12, c: P.teal, gable: P.clay, ridge: 'x' });
  },
};
