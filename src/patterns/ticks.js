import { segment } from '../shapes.js';
import { connections, noDirection } from '../utils.js';
import { anchor } from '../characters.js';
import { lines } from './lines.js';

/*
 * Shapes
 */

// prettier-ignore
export const ticks = {
  '─': segment({from: [2, 10], to: [8, 10]}),
  '│': segment({from: [5,  7], to: [5, 13]}),
  '╲': segment({from: [3,  9], to: [7, 11]}),
  '╱': segment({from: [3, 11], to: [7,  9]}),
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
    shapes: [lines['│'], ticks['─']],
  },

  /* Horizontal line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, r: true, l: true }),
    shapes: [lines['─'], ticks['│']],
  },

  /* Downward line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, tl: true, br: true }),
    shapes: [lines['╲'], ticks['╱']],
  },

  /* Upward line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ ...noDirection, tr: true, bl: true }),
    shapes: [lines['╱'], ticks['╲']],
  },
];
