// @ts-check

/*
 * RegExp Utilities
 */

/**
 * Escape characters for RegExp range syntax
 *
 * @param {string} string String to escape
 */
export const regexpEscape = (string) => string.replace(/([\\\[\]^-])/g, '\\$1');

/** Build a pattern including all characters */
export const include = (range) => `[${regexpEscape(range)}]`;

/** Build a pattern excluding all characters */
export const exclude = (range) => `[^${regexpEscape(range)}]`;

/**
 * Build a pattern for a given connection
 *
 * - If **spec** is true, include all characters in **range**
 * - If **spec** is false, exclude all characters in **range**
 * - If **spec** is undefined, allow any character
 * - Else, use **spec** literal value
 *
 * @param {boolean|string} spec Connection specification
 * @param {string} [range] Range to include/exclude when **connection** is a
 *                         boolean flag
 */
const connection = (spec, range) =>
  spec === true
    ? include(range)
    : spec === false
    ? exclude(range)
    : spec === undefined
    ? '.'
    : spec;

/** Connectable neighbors in each direction */
const neighbors = {
  t: '|.+',
  b: "|'+",
  l: "-+.'",
  r: "-+.'",
};

/**
 * Build a pattern for all allowed connections from a character
 *
 * Allowed connections are given for each 8 directions around the center,
 * starting at top and clockwise.
 *
 * @param {{[key: string]: string|boolean}} dirs Allowed connections
 */
export function connections({ t, tr, r, br, b, bl, l, tl }) {
  return new RegExp(
    [
      '^.',
      connection(t, neighbors.t),
      connection(tr),
      connection(r, neighbors.r),
      connection(br),
      connection(b, neighbors.b),
      connection(bl),
      connection(l, neighbors.l),
      connection(tl),
      '$',
    ].join('')
  );
}
