import { connections } from '../utils';
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
    pattern: connections({ t: true, r: false, b: true, l: false }),
    svg: lines['│'] + ticks['─'],
  },

  /* Horizontal line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: true, b: false, l: true }),
    svg: lines['─'] + ticks['│'],
  },

  /* Downward line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: true, tr: false, br: true, bl: false }),
    svg: lines['╲'] + ticks['╱'],
  },

  /* Upward line with tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: false, tr: true, br: false, bl: true }),
    svg: lines['╱'] + ticks['╲'],
  },
];
