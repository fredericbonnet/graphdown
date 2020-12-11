export default [
  /*
   * 4-way connections
   */

  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[-+]\+[-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 5 0, 5 20, M 0 10, 10 10"/>`,
  },

  /*
   * 3-way connections
   */

  /* Top */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[-+]\+[-+]/, /.[^|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 5 0, 5 10, M 0 10, 10 10"/>`,
  },

  /* Bottom */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[^|+]./, /[-+]\+[-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 5 20, 5 10, M 0 10, 10 10"/>`,
  },

  /* Left */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[-+]\+[^-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 0 10, 5 10, M 5 0, 5 20"/>`,
  },

  /* Right */
  {
    hotspot: '+',
    size: 1,
    patterns: [/.[|+]./, /[^-+]\+[-+]/, /.[|+]./],
    mask: [[], [false, true, false], []],
    svg: `<path d="M 10 10, 5 10, M 5 0, 5 20"/>`,
  },
];
