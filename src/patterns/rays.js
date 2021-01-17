import { anchor } from '../characters.js';
import { connections, allDirections } from '../utils.js';
import { ends } from './ends.js';

/*
 * Character patterns
 */
const rayPatterns = {
  tl: {
    pattern: connections({ tl: true }),
    shapes: [ends.br],
  },
  t: {
    pattern: connections({ t: true }),
    shapes: [ends.b],
  },
  tr: {
    pattern: connections({ tr: true }),
    shapes: [ends.bl],
  },
  r: {
    pattern: connections({ r: true }),
    shapes: [ends.l],
  },
  br: {
    pattern: connections({ br: true }),
    shapes: [ends.tl],
  },
  b: {
    pattern: connections({ b: true }),
    shapes: [ends.t],
  },
  bl: {
    pattern: connections({ bl: true }),
    shapes: [ends.tr],
  },
  l: {
    pattern: connections({ l: true }),
    shapes: [ends.r],
  },
};
export const rays = ({ t, tr, r, br, b, bl, l, tl }) => {
  const patterns = [];
  if (tl) patterns.push(rayPatterns.tl);
  if (t) patterns.push(rayPatterns.t);
  if (tr) patterns.push(rayPatterns.tr);
  if (r) patterns.push(rayPatterns.r);
  if (br) patterns.push(rayPatterns.br);
  if (b) patterns.push(rayPatterns.b);
  if (bl) patterns.push(rayPatterns.bl);
  if (l) patterns.push(rayPatterns.l);
  return patterns;
};

export default [
  /* Arbitrary junction */
  {
    hotspot: anchor,
    size: 1,
    rules: rays(allDirections),
  },
];
