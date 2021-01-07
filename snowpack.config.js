// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  // mount: {},
  // plugins: [],
  // installOptions: {},
  // devOptions: {},
  exclude: ['scripts/**/*'],
  testOptions: {
    files: ['test/**/*'],
  },
};
