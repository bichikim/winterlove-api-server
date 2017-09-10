import config from '../config'

const plugin = {
  /**
   *
   * @param {Server} server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
    // making web server & api server connection
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
    // making event connection
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

plugin.register.attributes = {
  name: 'app',
  version: '0.0.2',
  // to set connection in this plugins connections options must false
  connections: false,
}

export default plugin.register
