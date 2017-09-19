import models from '../models'

const plugin = {
  /**
   * setting routes
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next){
    server.expose(models)
    next()
  },
}

plugin.register.attributes = {
  name: 'models',
  version: '0.0.1',
}

export default plugin.register
