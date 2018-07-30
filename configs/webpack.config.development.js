const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackDashboard = require('webpack-dashboard/plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.config.common');

module.exports = merge.smart(common, {
  mode: 'development',
  watch: true,
  plugins: [
    new CleanWebpackPlugin(['./build']),
    new WebpackDashboard(),
    new BundleAnalyzer(),
  ],
});
