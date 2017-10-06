const webpackConfig = require('./webpack.config.watch.js')
const webpack = require('webpack')
webpack(webpackConfig, function(err, states){
  if(err){
    throw err
  }
  console.log('done')
})
