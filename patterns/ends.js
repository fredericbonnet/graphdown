export default [
  /*
   * Terminal tick
   */

  /* Top */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[^|+]./, /[^-+]\+[^-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 2 10, 8 10, M 5 10, 5 20"/>`,
  },

  /* Bottom */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[^-+]\+[^-+]/, /.[^|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 2 10, 8 10, M 5 10, 5 0"/>`,
  },

  /* Left */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[^|+]./, /[^-+]\+[-+]/, /.[^|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 5 7, 5 13, M 5 10, 10 10"/>`,
  },

  /* Right */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[^|+]./, /[-+]\+[^-+]/, /.[^|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 5 7, 5 13, M 5 10, 0 10"/>`,
  },
];
