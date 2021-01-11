// @ts-check

import {
  linkTop,
  linkBottom,
  linkLeft,
  linkRight,
  linkTopRight,
  linkBottomRight,
  linkBottomLeft,
  linkTopLeft,
} from './characters.js';

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

/** Build a negative lookeahead excluding all characters */
export const except = (range) => (range ? `(?![${regexpEscape(range)}])` : '');

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

/**
 * Build a pattern for all allowed connections from a character
 *
 * Allowed connections are given for each 8 directions around the center,
 * starting at top and clockwise.
 *
 * @param {*} dirs Allowed connections
 */
export const connections = (...dirs) =>
  new RegExp(dirs.map(connectionString).join('|'));

/**
 * Build a pattern for all allowed connections from a character
 *
 * Allowed connections are given for each 8 directions around the center,
 * starting at top and clockwise.
 *
 * @param {{[key: string]: string|boolean}} dirs Allowed connections
 */
export const connectionString = ({ t, tr, r, br, b, bl, l, tl }) =>
  [
    '^.',
    connection(t, linkTop),
    connection(tr, linkTopRight),
    connection(r, linkRight),
    connection(br, linkBottomRight),
    connection(b, linkBottom),
    connection(bl, linkBottomLeft),
    connection(l, linkLeft),
    connection(tl, linkTopLeft),
    '$',
  ].join('');

export const noDirection = {
  t: false,
  tr: false,
  r: false,
  br: false,
  b: false,
  bl: false,
  l: false,
  tl: false,
};
export const allDirections = {
  t: true,
  tr: true,
  r: true,
  br: true,
  b: true,
  bl: true,
  l: true,
  tl: true,
};
export const straightDirections = { t: true, r: true, b: true, l: true };
export const diagonalDirections = { tl: true, tr: true, bl: true, br: true };
