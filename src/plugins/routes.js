import routesAll from '../routes'
import forEach from 'lodash/forEach'
import config from '../config'

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
    const routes = routesAll(webServer)
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

export default plugin.register
