module.exports = {
  root: true,
  plugins: ["jest", "jsx-a11y"],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    __WEBPACKDEFINE_APP_CONFIG_PATH__: "readonly"
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:jest/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended"
  ],
  rules: {
    "react/prop-types": 0,
    // Emoji aren't too bad?
    "jsx-a11y/accessible-emoji": 0,
    // Used in Redux reducers a lot
    "no-case-declarations": 0,
    // Ignore unused variables with leading underscore
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // Force import ordering
    "import/order": 1,
  },
  settings: {
    "import/resolver": "webpack",
    react: {
      version: "detect"
    }
  }
};
