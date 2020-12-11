export default [
  /*
   * Ticks
   */

  /* Vertical line, horizontal tick */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[^-+]\+[^-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 2 10, 8 10, M 5 0, 5 20"/>`,
  },

  /* Horizontal line, vertical tick */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[^|+]./, /[-+]\+[-+]/, /.[^|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 5 7, 5 13, M 0 10, 10 10"/>`,
  },
];
