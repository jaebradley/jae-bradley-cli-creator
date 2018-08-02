const merge = require('webpack-merge');
const WebpackDashboard = require('webpack-dashboard/plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.config.common');

module.exports = merge.smart(common, {
  mode: 'development',
  watch: true,
  plugins: [
    new WebpackDashboard(),
    new BundleAnalyzer(),
  ],
});
