/* global __dirname*/
import config from '../config'
import controllers from '../controllers'

const plugin = {
  /**
   * setting controllers that using in routes
   * @param {Server} server
   * @param {object} options
   * @param {function}next
   */
  register(server, options, next) {
    const {labels} = config.server
    const webServer = server.select(labels)
    const handler = controllers(webServer)

    // Set handler options name 'controller'
    server.handler('controller', handler)

    next()
  },
}

plugin.register.attributes = {
  name: 'controllers',
  version: '0.0.2',
}

export default plugin.register
