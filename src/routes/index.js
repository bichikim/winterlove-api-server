/* global __dirname global*/
import requireAll from 'require-all'
import _ from 'lodash'
import joinUrl from 'join-url'

let routes

export default (server) => {
  if(!routes){
    routes = requireAll({
      dirname: __dirname,
      filter: /^(?!index).*(\.js)$/,
      resolve: (config) => {
        const routes = config.default(server)
        const {basePath} = routes
        if(basePath){
          _.forEach(routes.routes, (item) => {
            Object.assign(item, {path: joinUrl.pathname(basePath, item.path)})
          })
        }
        return routes.routes
      },
      map: (name, path) => {
        const nameJs = path.split('//').pop()
        const [routeName] = nameJs.split('.')
        return routeName
      },
    })
  }
  return routes
}
