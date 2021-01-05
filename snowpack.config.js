// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  // mount: {},
  // plugins: [],
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {},
  experiments: {
    optimize: {
      entrypoints: ['render.js'],
      bundle: true,
      minify: true,
      sourceMaps: true,
      target: 'es2018',
    },
  },
};
