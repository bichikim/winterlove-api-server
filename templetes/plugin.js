import config from '../config/config'

const plugin = {
  /**
   * setting routes
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
    const {labels} = config.server
    const webServer = server.select(labels)
    server.expose({
    })
    next()
  },
}

plugin.register.attributes = {
  name: 'plugin-name',
  version: '0.0.1',
}

export default plugin.register
