const path = require('path');
const nodeExternals = require('webpack-node-externals');

const resolveConfig = require('./webpack.config.resolve');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, '../src/executables/jb-create-cli.js'),
  resolve: resolveConfig,
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'shebang-loader'],
      },
    ],
  },
};
