import config from '../config'
import handlebars from 'handlebars'

const plugin = {
  /**
   * setting Vision of views (using handlebars)
   * @param {Server} server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
    const {labels} = config.server
    const webServer = server.select(labels)
    const {root} = config.path.client
    webServer.views({
      engines: {
        // It will be name of file type
        html: {
          // Set what kind of module to use for file type
          module: handlebars,
        },
      },
      // Root path for vision(view)
      relativeTo: root,
    })
    next()
  },
}

plugin.register.attributes = {
  name: 'view',
  version: '0.0.1',
}

export default plugin.register
