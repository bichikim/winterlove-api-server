const getRegister = (plugin, server) => {
  const {register} = plugin
  let attributes
  if(register){
    attributes = register.attributes
  }else{
    attributes = plugin.attributes
  }
  if(attributes){
    return plugin
  }
  return plugin(server)
}
/**
 * Make registering Promise
 * @param {Server} server
 * @param {*} plugin
 * @param {object} options
 * @return {Promise}
 */
export const register = (server, plugin, options = {}) => {
  return new Promise(function(resolve, reject){
    const register = getRegister(plugin, server)
    server.register({
      register,
      options,
    }, (error) => {
      if(error){
        return reject(error)
      }
      resolve()
    })
  })
}

/**
 * Make promise to start server
 * @param {Server} server
 * @return {Promise}
 */
export const start = (server) => {
  return new Promise(function(resolve, reject){
    server.start((error) => {
      if(error){
        return reject(error)
      }
      resolve()
    })
  })
}
