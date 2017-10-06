const node = '6.10'
const config = {
  path: {
    src: 'src',
    dist: 'dist',
  },
  name: {
    index: 'index.js',
  },
  node,
  babel: {
    presets: [
      [
        'env', {
          targets: {
            node,
          },
        }],
      'stage-2', 'stage-3',
    ],
    plugins: ['transform-class-properties'],
  },
}

module.exports = config
