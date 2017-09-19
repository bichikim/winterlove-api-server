import routesAll from '../routes'
import forEach from 'lodash/forEach'
import config from '../config'

const plugin = (globalServer) => {
  const plugin = {
  /**
   * setting routes
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
    register(server, options, next){
      const {labels} = config.server

      const webServer = server.select(labels)
      const routes = routesAll(globalServer)
      server.expose({
        routes,
      })

      forEach(routes, (item) => {
        webServer.route(item)
      })

      next()
    },
  }

  plugin.register.attributes = {
    name: 'routes',
    version: '0.0.2',
  }
  return plugin
}

export default plugin
