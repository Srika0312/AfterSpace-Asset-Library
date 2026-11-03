import { P } from '../lib/palette.js';

export default {
  key: 'pressure-control-valve',
  name: 'Pressure Control Valve',
  category: 'industrial',
  blurb: 'In-line pressure regulating valve with diaphragm actuator dome and manual override wheel.',
  what: 'a pressure control valve',
  footprint: [1.0, 0.8],
  height: 1.15,
  tags: ['industrial', 'valve', 'pressure', 'flow', 'pipeline'],
  refs: ['AF-IND-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // flanged horizontal pipe segment
    g.cyl({ x: 0, y: 0, z: 0.28, r: 0.14, h: 0.85, c: P.steel, axis: 'x', segments: 8 });

    // central cast valve globe body
    g.cyl({ x: 0, y: 0, z: 0.24, r: 0.22, h: 0.35, c: P.steelDark, axis: 'z', segments: 10 });

    // diaphragm actuator bell
    g.cyl({ x: 0, y: 0, z: 0.59, r: 0.3, h: 0.22, r2: 0.16, c: P.steel, axis: 'z', segments: 10 });

    // valve stem shaft
    g.cyl({ x: 0, y: 0, z: 0.81, r: 0.04, h: 0.2, c: P.brass, axis: 'z', segments: 8 });

    // red manual handwheel
    g.circle({ x: 0, y: 0, z: 1.02, r: 0.18, c: P.red, bias: 0.6 });
  },
};
