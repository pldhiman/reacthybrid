const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const buildPath = path.resolve(__dirname, 'build');
var webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const Routes=require('./staticRoutes');
const {entryPaths,htmlWebpackRoutes}=require('./webpack.config');




module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: entryPaths(Routes),

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: {} },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          { loader: "sass-loader", options: {} }
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/media'
            }
          }
        ]
      },
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new MiniCssExtractPlugin({
      filename:`static/css/style.${new Date().getTime()}.css`
      // filename: "[name].[contenthash].css",
      // chunkFilename: "[id].[contenthash].css"
    }),
    new CopyWebpackPlugin([
      { from: 'public' }
    ]),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false,}),
  ].concat(htmlWebpackRoutes(Routes)),

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimizer: [
      new webpack.optimize.AggressiveMergingPlugin(),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          warnings: false,
          compress: {
            drop_console: true,
          },
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ],
  },
};
