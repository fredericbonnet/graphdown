const copy = require('recursive-copy');
const { build } = require('esbuild');
build({
  entryPoints: ['src/index.js'],
  bundle: true,
  target: 'es2018',
  format: 'esm',
  outfile: 'dist/index.mjs',
})
  .then(() =>
    build({
      entryPoints: ['src/index.js'],
      bundle: true,
      target: 'es2018',
      format: 'cjs',
      outfile: 'dist/index.cjs',
    })
  )
  .then(() => copy('css', 'dist/css'))
  .catch(() => process.exit(1));
