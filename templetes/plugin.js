import config from '../config'

const plugin = {
  /**
   * setting routes
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next){
    // expose value
    server.expose({
    })
    server.handler('handler-name', (route, options) => (request, reply) => (reply({})))
    // hook event
    // 'onPreStart' - called before the connection listeners are started.
    // 'onPostStart' - called after the connection listeners are started.
    // 'onPreStop' - called before the connection listeners are stopped.
    // 'onPostStop' - called after the connection listeners are stopped.
    // server extension points
    server.ext('onPreStart', (server, next) => (next()))
    // 'onRequest'
    // 'onPostHandler'
    // 'onPreResponse'
    // 'onPreAuth'
    // 'onPostAuth'
    // 'onPreHandler'
    // 'onPostHandler'
    // 'onPreResponse'
    // request extension points
    server.ext('onPreResponse', (request, reply) => (reply.continue()))
    // after plugin registration before start
    server.initialize((error) => {
      if(error){
        console.warn(error)
      }
    })
    // end plugin
    next()
  },
}

plugin.register.attributes = {
  name: '!!name!!',
  version: '0.0.1',
  dependencies: ['!!name!!'],
}

export default plugin.register
