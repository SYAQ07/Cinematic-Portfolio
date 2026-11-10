import { build } from 'esbuild';

await build({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'Asset/dist/app.js',
  loader: { '.jsx': 'jsx' },
  jsx: 'automatic',
  target: ['es2020'],
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

console.log('Portfolio built: Asset/dist/app.css + Asset/dist/app.js');
