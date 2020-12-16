import { anchor } from './characters.js';

/*
 * Character patterns
 */
export default [
  /*
   * Single connector = plus sign
   */
  {
    hotspot: anchor,
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: `<path d="M 2 10, 8 10, M 5 7, 5 13"/>`,
  },
];
