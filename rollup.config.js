import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import packageJson from './package.json' with { type: 'json' };

// Packages that should be bundled
const bundledPackages = ['p-limit', 'deepmerge-ts', 'hexo-is', 'is-stream', 'markdown-it', 'node-cache'];

// List external dependencies, excluding specific packages that should be bundled
const external = Object.keys(packageJson.dependencies)
  .concat(Object.keys(packageJson.devDependencies))
  .filter((pkgName) => !bundledPackages.includes(pkgName));

/**
 * @type {import("rollup").RollupOptions}
 */
const declaration = {
  input: './tmp/dist/src/index.d.ts',
  output: [
    { file: 'dist/index.d.ts', format: 'es' },
    { file: 'dist/index.d.cts', format: 'es' },
    { file: 'dist/index.d.mts', format: 'es' }
  ],
  plugins: [dts()]
};

/**
 * @type {import("rollup").RollupOptions}
 */
const fromDist = {
  input: './tmp/dist/src/index.js',
  output: [
    { file: 'dist/index.js', format: 'esm' },
    { file: 'dist/index.cjs', format: 'cjs' },
    { file: 'dist/index.mjs', format: 'esm' }
  ],
  plugins: [
    json(),
    resolve({ preferBuiltins: true }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: '12' },
            modules: false
          }
        ]
      ]
    })
  ],
  external
};

export default [declaration, fromDist];
