/** Make connectable segment */
export const segment = (
  { from: [x1, y1], to: [x2, y2], forward, backward },
  attrs = ''
) => ([dx, dy]) =>
  `<path d="M ${x1 + dx} ${y1 + dy} ${forward || ''} L ${x2 + dx} ${y2 + dy}" ${
    attrs || ''
  }/>`;

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
