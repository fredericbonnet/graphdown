/**
 * Render options
 */
export type RenderOptions = {
  /**
   * Inline style; true = use default style; false or default = no style
   */
  style?: string | boolean;
  /**
   * Width (characters); negative or default = adapt to widest line
   */
  width?: number;
  /**
   * Minimum width (characters); negative or default = no minimum
   */
  minWidth?: number;
};

/**
 * Render GraphDown string
 *
 * @param {string} data Source text
 * @param {RenderOptions} [options] Options
 *
 * @return SVG code
 */
export function renderGraphdown(data: string, options?: RenderOptions): string;

/**
 * Default style; kept in sync with css/graphdown.css
 *
 * @type {string}
 */
export const defaultStyle: string;
