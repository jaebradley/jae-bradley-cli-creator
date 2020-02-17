/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

module.exports = {
  modules: [
    path.resolve(__dirname, '../src'),
    'node_modules',
  ],
  alias: {
    App: path.resolve(__dirname, '../src'),
    Prompters: path.resolve(__dirname, '../src/prompters'),
  },
};
