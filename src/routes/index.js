/* global __dirname global*/
import requireAll from 'require-all'

let routes

export default (server) => {
  if (!routes) {
    routes = requireAll({
      dirname: `${__dirname}/`,
      filter: /^(?!index).*(\.js)$/,
      resolve: (config) => {
        return config.default(server)
      },
      map: (name, path) => {
        return path.split('//').pop()
          .split('.')
          .shift()
      },
    })
  }
  return routes
}
