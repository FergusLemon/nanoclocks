module.exports = {
    roots: [
      "<rootDir>/src"
    ],
    globals: {
      'ts-jest': {
          enableTsDiagnostics: true,
      },
    },
    transform: {
      "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    setupFiles: [
      "raf/polyfill"
    ],
    snapshotSerializers: ["enzyme-to-json"],
    coveragePathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/dist/',
    ],
    collectCoverage: true
};
