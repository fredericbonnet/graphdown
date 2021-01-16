import { path } from '../svg';
import { connections, noDirection } from '../utils';
import { anchor } from '../characters.js';
import { lines } from './lines.js';

/*
 * SVG templates
 */

// prettier-ignore
export const ticks = {
  '─': path([2, 10], 'l 6  0'),
  '│': path([5,  7], 'l 0  6'),
  '╲': path([3,  9], 'l 4  2'),
  '╱': path([3, 11], 'l 4 -2'),
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
