/**
 * Set config and connection according to config
 */
/* global process*/
import config from '../config'

const app = {
  /**
   *
   * @param {Server} server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
/*    server.expose({
      config: config,
    })*/

    {
      const {host, port, labels, cors} = config.server
      const {root} = config.path.client
      server.connection({
        host,
        port,
        labels,
        routes: {
          cors,
          files: {
            relativeTo: root,
          },
        },
      })
    }
    {
      const {host, port, labels} = config.event
      server.connection({
        host,
        port,
        labels,
      })
    }
    next()
  },
}

app.register.attributes = {
  name: 'app',
  version: '0.0.1',
  connections: false,
}

export default app.register
