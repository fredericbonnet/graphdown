export default [
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
];
