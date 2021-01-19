/** @typedef {[x: number, y: number]} Point */

/** Segment shape */
export class Segment {
  /** @type {Point} Segment begin */
  from;

  /** @type {Point} Segment end */
  to;

  /** @type {string} SVG path from begin to end */
  forward;

  /** @type {string} SVG path from end to begin */
  backward;

  /** @type {string} SVG attributes */
  attrs;

  constructor(from, to, forward, backward, attrs) {
    this.from = from;
    this.to = to;
    this.forward = forward;
    this.backward = backward;
    this.attrs = attrs;
  }

  /** Generate SVG */
  render([dx, dy]) {
    return `<path d="M ${this.from[0] + dx} ${this.from[1] + dy} ${
      this.forward || ''
    } L ${this.to[0] + dx} ${this.to[1] + dy}" ${this.attrs || ''}/>`;
  }
}

/** Make connectable segment */
export const segment = ({ from, to, forward, backward }, attrs = '') =>
  new Segment(from, to, forward, backward, attrs);

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
