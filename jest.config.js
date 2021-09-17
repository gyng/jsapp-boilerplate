module.exports = {
  globals: {
    __WEBPACKDEFINE_APP_CONFIG_PATH__: "/config.json",
  },
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: {
    "@cfg": "<rootDir>/config",
    "@cfg/(.*)": "<rootDir>/config/$1",
    "@src/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/test/$1",
    "\\.icon-svg": "<rootDir>/test/helpers/svgrMock.js",
    "\\.svg": "<rootDir>/test/helpers/svgrMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/test/helpers/index.ts"],
  testEnvironment: "jsdom",
  testMatch: ["**/src/**/*.test.(ts|tsx|js)", "**/src/test/*.test.(ts|tsx|js)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
    "^.+\\.(css|less|sass|scss|pcss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  timers: "fake",
};
