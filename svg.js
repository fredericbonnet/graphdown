// @ts-check

/*
 * SVG Utilities
 */

/** Set stroke-width on given SVG */
export const strokeWidth = (width, svg) =>
  `<g stroke-width="${width}">${svg}</g>`;
/** Make SVG stroke wide */
export const wide = (svg) => strokeWidth(3, svg);
