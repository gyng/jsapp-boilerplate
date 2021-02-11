module.exports = {
  root: true,
  extends: [
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  plugins: ["jest"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // Prefer build-time TS typechecking
    "react/prop-types": 0,
    // Prefer Typescript checks
    "react/require-default-props": 0,
    // Emoji aren't too bad?
    "jsx-a11y/accessible-emoji": 0,
    // Ignore unused variables with leading underscore, useful for documentation
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // Default exports integrate poorly with TS tooling
    "import/prefer-default-export": 0,
    // Sometimes it's more readable with props.xxx
    "react/destructuring-assignment": 0,
    // Useful for library development
    "react/jsx-props-no-spreading": [
      2,
      {
        html: "ignore",
      },
    ],
  },
  settings: {
    "import/resolver": "webpack",
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
};
