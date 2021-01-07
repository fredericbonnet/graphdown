const copy = require('recursive-copy');
const { build } = require('esbuild');
build({
  entryPoints: ['src/index.js'],
  bundle: true,
  target: 'es2018',
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.mjs',
})
  .then(() =>
    build({
      entryPoints: ['src/index.js'],
      bundle: true,
      target: 'es2018',
      platform: 'node',
      format: 'cjs',
      outfile: 'dist/index.cjs',
    })
  )
  .then(() =>
    build({
      entryPoints: ['src/index.js'],
      bundle: true,
      target: 'es2018',
      platform: 'browser',
      format: 'esm',
      outfile: 'dist/index.js',
    })
  )
  .then(() => copy('css', 'dist/css'))
  .then(() => copy('src/index.d.ts', 'dist/index.d.ts'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
