const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Routes=require('./staticRoutes');
const {entryPaths,htmlWebpackRoutes}=require('./webpack.config');



module.exports = {

  devtool: 'eval-cheap-module-source-map',

  entry: entryPaths(Routes),

  // https://webpack.js.org/configuration/dev-server/
  // devServer: {
  //   port: 3003
  // },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          // Please note we are not running postcss here
        ]
      },
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use:['eslint-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192
            }
          }
        ]
      }
    ],
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' }
    ])
  ].concat(htmlWebpackRoutes(Routes))
};