const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@src$': '<rootDir>/src',
    '@src/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: {
        'target': 'esnext',
      },
      moduleDirectories: [
        'node_modules',
        'src'
      ],
      moduleFileExtensions: [
        'ts',
        'js',
        'jsx'
      ]
    },
  },
  transformIgnorePatterns: [],
  transform: {
    ...tsjPreset.transform,
    '^.+\\.(ts|js)?$': require.resolve('babel-jest'),
  },
  testMatch: [
    '<rootDir>/tests/**/*Test.ts?(x)'
  ],
};
