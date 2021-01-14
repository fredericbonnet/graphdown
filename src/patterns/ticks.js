import { connections, noDirection } from '../utils';
import { anchor } from '../characters.js';
import { lines } from './lines.js';

/*
 * SVG templates
 */
export const ticks = {
  '─': `<path d="M 2 10, 8 10"/>`,
  '│': `<path d="M 5  7, 5 13"/>`,
  '╲': `<path d="M 3  9, 7 11"/>`,
  '╱': `<path d="M 3 11, 7  9"/>`,
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
    pattern: connections({ ...noDirection, t: true, b: true }),
    svg: lines['│'] + ticks['─'],
  },

  /* Horizontal line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, l: true }),
    svg: lines['─'] + ticks['│'],
  },

  /* Downward line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, tl: true, br: true }),
    svg: lines['╲'] + ticks['╱'],
  },

  /* Upward line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, tr: true, bl: true }),
    svg: lines['╱'] + ticks['╲'],
  },
];
