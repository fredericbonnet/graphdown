export default [
  /*
   * Corners
   */

  /* Top-left */
  {
    hotspot: '+',
    size: 1,
    patterns: ['', /.\+[-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 10 10, 5 10, 5 20"/>`,
  },

  /* Top-right */
  {
    hotspot: '+',
    size: 1,
    patterns: ['', /[-+]\+./, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 0 10, 5 10, 5 20"/>`,
  },

  /* Bottom-left */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /.\+[-+]/, ''],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 10 10, 5 10, 5 0"/>`,
  },

  /* Bottom-right */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[-+]\+./, ''],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 0 10, 5 10, 5 0"/>`,
  },
];
