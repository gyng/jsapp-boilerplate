module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const DEV = process.env.NODE_ENV === "development";

  const presets = [
    "@babel/typescript",
    "@babel/react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ];
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    ...(DEV ? ["react-refresh/babel"] : []),
  ];

  return { presets, plugins };
};
