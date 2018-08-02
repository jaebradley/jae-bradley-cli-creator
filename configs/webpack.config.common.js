const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolveConfig = require('./webpack.config.resolve');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, '../src/index.js'),
  resolve: resolveConfig,
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js',
    library: 'jae-bradley-cli-creator',
    libraryTarget: 'umd',
  },
  node: {
    __dirname: true,
  },
  plugins: [
    new CleanWebpackPlugin(['build'], { root: path.join(__dirname, '..') }),
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
    new CopyWebpackPlugin([
      { from: 'src/templates/', to: 'templates/' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'shebang-loader',
        ],
      },
    ],
  },
};
