// @ts-check
/* eslint-disable no-console */

// https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-511007063
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ShellOnBuildEndPlugin = require("./webpack-util/shell-on-build-end-webpack-plugin");

const buildConfigPath =
  process.env.BUILD_CONFIG_FILE || "./config/configValues";
// eslint-disable-next-line import/no-dynamic-require
const { buildConfig } = require(buildConfigPath);

if (!process.env.HIDE_CONFIG) {
  console.log("BUILD CONFIG = ", buildConfig);
}

const DEV = process.env.NODE_ENV === "development";
const PROD = process.env.NODE_ENV === "production";

/** @type { import('webpack').Configuration } */
const config = {
  // Defaults to development, pass --mode production to override
  mode: "development",

  context: path.resolve(__dirname),

  target: "web",

  entry: {
    app: "./src/index.tsx",
  },

  output: {
    filename: "[name].[fullhash:7].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: buildConfig.url_publicPath,
  },

  module: {
    rules: [
      // Vanilla CSS
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      // PostCSS
      {
        test: /\.(p|s)css$/,
        include: path.resolve(__dirname, "src"),
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: DEV
                  ? "[name]__[local]--[hash:base64:3]"
                  : "[hash:base64:16]",
              },
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.icon-svg$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
      {
        test: /\.svg$/,
        use: [{ loader: "@svgr/webpack" }],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp4|webm|mp3|ogg|\.rawsvg)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "./f/[hash:16].[ext]" },
          },
        ],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /\/node_modules\//,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __WEBPACKDEFINE_APP_CONFIG_PATH__: JSON.stringify(
        buildConfig.url_configPath
      ),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/static/favicon.ico",
    }),
    // Add resource hints to reduce loadtime
    // Ignore chunks at top level: if wanted, use the commented config instead
    // new PreloadWebpackPlugin({
    //   rel: "preload",
    //   include: "allChunks"
    // }),
    new PreloadWebpackPlugin({
      rel: "preload",
      include: "allAssets",
      fileWhitelist: [/\.(woff|woff2|ttf|svg|eot|otf|json|js)/],
    }),
    // Generate .gz for production builds
    // Consider adding brotli-webpack-plugin if your server supports .br
    ...(PROD
      ? [
          new CompressionPlugin({
            include: /\.(js|html|svg)$/,
          }),
        ]
      : []),
    ...(DEV
      ? [
          new ShellOnBuildEndPlugin({
            command: "yarn config:generate:dev",
            once: true,
          }),
        ]
      : []),
    ...(DEV ? [new ReactRefreshWebpackPlugin()] : []),
  ],

  // Using inline-source-map for detailed line numbers
  // Switch to cheap-eval-source-map if build times are too long
  devtool: PROD ? false : "inline-source-map",

  // @ts-expect-error webpack-dev-server checks this
  // but is not defined in webpack.Configuration
  devServer: {
    allowedHosts: ["localhost"],
    clientLogLevel: "warning",
    historyApiFallback: true,
    host: "localhost",
    publicPath: buildConfig.url_publicPath,
    stats: "minimal",
  },

  externals: {
    cheerio: "window",
    "react/addons": true,
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      "@cfg": path.resolve(__dirname, "config"),
      "@src": path.resolve(__dirname, "src"),
      "@test": path.resolve(__dirname, "test"),
    },
  },
};

module.exports = config;
