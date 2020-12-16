import { connections } from '../utils';
import { anchor } from './characters.js';

/*
 * Character patterns
 */
export default [
  /*
   * Ticks
   */

  /* Vertical line, horizontal tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: false, b: true, l: false }),
    svg: `<path d="M 2 10, 8 10, M 5 0, 5 20"/>`,
  },

  /* Horizontal line, vertical tick */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: true, b: false, l: true }),
    svg: `<path d="M 5 7, 5 13, M 0 10, 10 10"/>`,
  },
];
