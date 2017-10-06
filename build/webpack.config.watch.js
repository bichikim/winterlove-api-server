const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
module.exports = webpackMerge(webpackConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch: true,
})
