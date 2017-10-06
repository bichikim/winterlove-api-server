const $path = require('path')
const config = require('../config')
const {path, name, babel} = config
const root = $path.resolve(__dirname, '..')
module.exports = {
  entry: `./${path.src}/${name.index}`,
  target: 'node',
  output: {
    path: $path.join(root, path.dist),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: $path.join(root, path.src),
        exclude: $path.join(root, 'node_modules'),
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
