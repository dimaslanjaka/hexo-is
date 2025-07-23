import fs from 'fs';
import path from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';

/**
 * @see {@link https://jestjs.io/docs/configuration}
 * * how to run single test {@link https://stackoverflow.com/questions/28725955/how-do-i-test-a-single-file-using-jest}
 */
const config: JestConfigWithTsJest = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'json', 'cjs', 'mjs'],
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  cache: true,
  cacheDirectory: path.join(__dirname, 'tmp/jest'),
  collectCoverageFrom: ['src/**/*.{js,ts,cjs,mjs}'],
  roots: [`<rootDir>/test`],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/tmp/', '/test/'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|[cm]js|cjs|mjs)',
    '**/?(*.)+(spec|test).+(ts|tsx|[cm]js|cjs|mjs)',
    '**/test/*.test.{ts,js,cjs,mjs}'
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    // TypeScript files: handled by ts-jest, ESM support via tsconfig
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        babelConfig: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: 'current' }
              }
            ],
            '@babel/preset-typescript'
          ]
        },
        useESM: true,
        tsconfig: path.join(__dirname, 'tsconfig.jest.json')
      }
    ],
    // JS, CJS, MJS: handled by babel-jest for ESM/CommonJS interop
    '^.+\\.(js|cjs|mjs)$': [
      'babel-jest',
      {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
      }
    ]
  },
  // detectLeaks: true,
  // detectOpenHandles: true,
  clearMocks: true,
  // collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
};

if (!fs.existsSync(<string>config.cacheDirectory)) fs.mkdirSync(<string>config.cacheDirectory, { recursive: true });

export default config;
