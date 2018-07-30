const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.common');

module.exports = merge.smart(common, {
  bail: true,
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
});
