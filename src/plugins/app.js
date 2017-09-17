import config from '../config'

const plugin = {
  /**
   * setting server connections
   * @param {Server} server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
    // making web server & api server connection
    const {root} = config.path.client
    const setTls = (options) => {
      const {key, cert} = config.tls
      Object.assign(options, {tls: {key, cert}})
    }
    {
      const {host, port, labels, cors, protocol} = config.server
      const options = {
        host,
        port,
        labels,
        routes: {
          cors,
          files: {
            relativeTo: root,
          },
        },
      }
      if (protocol === 'https') {
        setTls(options)
      }
      server.connection(options)
    }
    // making event connection
    {
      const {host, port, labels, protocol} = config.event
      const options = {
        host,
        port,
        labels,
      }
      if (protocol === 'https') {
        setTls(options)
      }
      server.connection(options)
    }
    next()
  },
}

plugin.register.attributes = {
  name: 'app',
  version: '0.0.3',
  // to set connection in this plugins connections options must false
  connections: false,
}

export default plugin.register
