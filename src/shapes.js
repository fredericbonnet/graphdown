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

  /** Get a new segment offset by the given coordinates */
  offset([dx, dy]) {
    return new Segment(
      [this.from[0] + dx, this.from[1] + dy],
      [this.to[0] + dx, this.to[1] + dy],
      this.forward,
      this.backward,
      this.attrs
    );
  }

  /** Check for mergeability */
  isMergeable(segment) {
    return (
      this != segment &&
      this.attrs === segment.attrs &&
      (segment.from.toString() === this.from.toString() ||
        segment.to.toString() === this.to.toString() ||
        segment.from.toString() === this.to.toString() ||
        segment.to.toString() === this.from.toString())
    );
  }

  /** Merge with segment */
  merge(segment) {
    if (this.from.toString() == segment.from.toString()) {
      const forward = [segment.backward, 'L', ...this.from, this.forward]
        .join(' ')
        .trim();
      const backward = [this.backward, 'L', ...this.from, segment.forward]
        .join(' ')
        .trim();
      return new Segment(segment.to, this.to, forward, backward, this.attrs);
    } else if (this.to.toString() == segment.to.toString()) {
      const forward = [this.forward, 'L', ...this.to, segment.backward]
        .join(' ')
        .trim();
      const backward = [segment.forward, 'L', ...this.to, this.backward]
        .join(' ')
        .trim();
      return new Segment(
        this.from,
        segment.from,
        forward,
        backward,
        this.attrs
      );
    } else if (this.to.toString() == segment.from.toString()) {
      const forward = [this.forward, 'L', ...this.to, segment.forward]
        .join(' ')
        .trim();
      const backward = [segment.backward, 'L', ...this.to, this.backward]
        .join(' ')
        .trim();
      return new Segment(this.from, segment.to, forward, backward, this.attrs);
    } else if (this.from.toString() == segment.to.toString()) {
      const forward = [segment.forward, 'L', ...this.from, this.forward]
        .join(' ')
        .trim();
      const backward = [this.backward, 'L', ...this.from, segment.backward]
        .join(' ')
        .trim();
      return new Segment(segment.from, this.to, forward, backward, this.attrs);
    }
  }
}

/** Mergeable segment list */
export class SegmentList {
  /** @type {Set<Segment>} Segments*/
  segments;

  /** @type {Map<string, Set<Segment>>} Map of segments per coordinate */
  segmentsPerCoordinate;

  constructor() {
    this.segments = new Set();
    this.segmentsPerCoordinate = new Map();
  }

  /**
   * Add & merge segment
   *
   * @param {Segment} segment Segment to add
   */
  add(segment) {
    const from = segment.from.join(',');
    const to = segment.to.join(',');
    const fromSegments = this.segmentsPerCoordinate.get(from);
    if (fromSegments) {
      for (let mergeWith of fromSegments.values()) {
        if (mergeWith.isMergeable(segment)) {
          this.remove(mergeWith);
          this.add(mergeWith.merge(segment));
          return;
        }
      }
    }
    const toSegments = this.segmentsPerCoordinate.get(to);
    if (toSegments) {
      for (let mergeWith of toSegments.values()) {
        if (mergeWith.isMergeable(segment)) {
          this.remove(mergeWith);
          this.add(mergeWith.merge(segment));
          return;
        }
      }
    }

    this.segments.add(segment);
    if (fromSegments) {
      fromSegments.add(segment);
    } else {
      this.segmentsPerCoordinate.set(from, new Set([segment]));
    }
    if (toSegments) {
      toSegments.add(segment);
    } else {
      this.segmentsPerCoordinate.set(to, new Set([segment]));
    }
  }

  /**
   * Remove segment
   *
   * @param {Segment} segment Segment to add
   */
  remove(segment) {
    const from = segment.from.join(',');
    const to = segment.to.join(',');
    this.segments.delete(segment);
    this.segmentsPerCoordinate.get(from).delete(segment);
    this.segmentsPerCoordinate.get(to).delete(segment);
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
