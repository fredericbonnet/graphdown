/*
 * Utilities
 */

export const strokeWidth = (width, svg) =>
  `<g stroke-width="${width}">${svg}</g>`;
export const wide = (svg) => strokeWidth(3, svg);
