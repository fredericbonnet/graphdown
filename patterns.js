/** Patterns */
export const patterns = [
  /*
   * Lines
   */

  /* Horizontal line */
  {
    hotspot: '-',
    size: 0,
    patterns: ['-'],
    mask: [[true]],
    svg: `<path d="M 0 10, 10 10"/>`,
  },

  /* Vertical line */
  {
    hotspot: '|',
    size: 0,
    patterns: ['|'],
    mask: [[true]],
    svg: `<path d="M 5 0, 5 20"/>`,
  },

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

  /*
   * Single connector = plus sign
   */
  {
    hotspot: '+',
    size: 0,
    patterns: [/\+/],
    mask: [[true]],
    svg: `<path d="M 2 10, 8 10, M 5 7, 5 13"/>`,
  },
];
