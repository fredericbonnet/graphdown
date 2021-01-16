// @ts-check

/*
 * SVG Utilities
 */

/** Set stroke-width on given SVG */
export const strokeWidth = (width, svg) =>
  `<g stroke-width="${width}">${svg}</g>`;

/** Make SVG stroke wide */
export const wide = (svg) => strokeWidth(3, svg);

/** Highlight path */
export const highlight = (svg) => `<g stroke-width="4" stroke="red">${svg}</g>`;

/** Make path */
export const path = ([x, y], commands) => `<path d="M ${x} ${y} ${commands}"/>`;

/** Make filled path */
export const filledPath = ([x, y], commands) =>
  `<path d="M ${x} ${y} ${commands}" class="filled"/>`;

/** Make circle */
export const circle = ([x, y], r) =>
  `<circle cx="${x}" cy="${y}" r="${r}" class="outline"/>`;

/** Make filled circle */
export const filledCircle = ([x, y], r) =>
  `<circle cx="${x}" cy="${y}" r="${r}"/>`;
