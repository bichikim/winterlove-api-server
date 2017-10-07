import config from '../config'
import handlebars from 'handlebars'

const plugin = (globalServer) => {
  const plugin = {
    /**
     * setting Vision of views (using handlebars)
     * @param {Server} server
     * @param {object}options
     * @param {function}next
     */
    register(server, options, next){
      const {root} = config.path.client
      globalServer.views({
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
    version: '0.0.2',
    dependencies: ['app', 'vision'],
  }
  return plugin
}

export default plugin
