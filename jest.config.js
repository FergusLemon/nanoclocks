module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "setupFiles": [
    "raf/polyfill"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>src/setupTests.ts",
  "snapshotSerializers": ["enzyme-to-json"]
};
