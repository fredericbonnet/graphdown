import { anchor } from '../characters.js';
import { ticks } from './ticks.js';

/*
 * Character patterns
 */
export default [
  /*
   * Single anchor = double ticks
   */
  {
    hotspot: anchor,
    shapes: [ticks['│'], ticks['─']],
  },
];
