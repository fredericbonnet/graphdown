import { anchor } from '../characters.js';
import { connections, allDirections } from '../utils.js';
import { ends } from './ends.js';

/*
 * Character patterns
 */
const rayPatterns = {
  tl: {
    pattern: connections({ tl: true }),
    svg: ends.br,
  },
  t: {
    pattern: connections({ t: true }),
    svg: ends.b,
  },
  tr: {
    pattern: connections({ tr: true }),
    svg: ends.bl,
  },
  r: {
    pattern: connections({ r: true }),
    svg: ends.l,
  },
  br: {
    pattern: connections({ br: true }),
    svg: ends.tl,
  },
  b: {
    pattern: connections({ b: true }),
    svg: ends.t,
  },
  bl: {
    pattern: connections({ bl: true }),
    svg: ends.tr,
  },
  l: {
    pattern: connections({ l: true }),
    svg: ends.r,
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
