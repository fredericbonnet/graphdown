import { connections } from '../utils';
import { anchor } from '../characters.js';

/*
 * SVG templates
 */
export const ticklines = {
  '─': `<path d="M 0 10, 10 10, M 5  7, 5 13"/>`,
  '│': `<path d="M  5 0,  5 20, M 2 10, 8 10"/>`,
  '╲': `<path d="M 0  0, 10 20, M 3 11, 7  9"/>`,
  '╱': `<path d="M 0 20, 10  0, M 3  9, 7 11"/>`,
};

/*
 * Character patterns
 */
export default [
  /*
   * Ticks
   */

  /* Vertical line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: false, b: true, l: false }),
    svg: ticklines['│'],
  },

  /* Horizontal line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: true, b: false, l: true }),
    svg: ticklines['─'],
  },

  /* Downward line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: true, tr: false, br: true, bl: false }),
    svg: ticklines['╲'],
  },

  /* Upward line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: false, tr: true, br: false, bl: true }),
    svg: ticklines['╱'],
  },
];
