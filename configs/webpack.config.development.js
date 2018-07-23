const merge = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge.smart(common, {
  mode: 'development',
});
