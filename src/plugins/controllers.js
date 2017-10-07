/* global __dirname*/
import controllers from '../controllers'

const plugin = (globalServer) => {
  const plugin = {
    /**
     * setting controllers that using in routes
     * @param {Server} server
     * @param {object} options
     * @param {function}next
     */
    register(server, options, next){
      const handler = controllers(globalServer)

      // Set handler options name 'controller'
      server.handler('controller', handler)
      next()
    },
  }
  plugin.register.attributes = {
    name: 'controllers',
    version: '0.0.2',
    dependencies: ['app', 'view', 'hapi-auth-jwt2'],
  }
  return plugin
}

export default plugin
