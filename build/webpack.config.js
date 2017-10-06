const $path = require('path')
const config = require('../config')
const {path, name, babel} = config
const root = $path.resolve(__dirname)
module.exports = {
  entry: {
    server: `./${path.src}/${name.index}`,
  },
  output: {
    path: $path.join(root, path.dist),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: $path.join(root, path.src),
        options: babel,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': $path.join(root, 'src'),
    },
  },
}
