const plugin = (globalServer) => {
  const plugin = {
    /**
     * setting controllers that using in routes
     * @param {Server} server
     * @param {object} options
     * @param {function}next
     */
    register(server, options, next){
      next()
    },
  }
  plugin.register.attributes = {
    name: '!!name!!',
    version: '0.0.1',
    dependencies: ['!!name!!'],
  }
  return plugin
}

export default plugin
