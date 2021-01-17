/** Make path */
export const path = ([x, y], commands, attrs = '') => ([dx, dy]) =>
  `<path d="M ${x + dx} ${y + dy} ${commands}" ${attrs}/>`;

/** Make filled path */
export const filledPath = ([x, y], commands) => path([x, y], commands, filled);

/** Stroke width attribute */
export const strokeWidth = (width) => `stroke-width="${width}"`;

/** Wide stroke attribute */
export const wide = strokeWidth(3);

/** Filled shape attribute */
export const filled = `class="filled"`;
