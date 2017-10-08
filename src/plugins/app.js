import config from '../config'
import fs from 'fs'

const plugin = {
  /**
   * setting server connections
   * @param {Server} server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next){
    // making web server & api server connection
    const {root} = config.path.client
    const setTls = (options) => {
      const {key, cert} = config.tls
      if(!key || !cert){
        throw new Error(`[plugins app setTls] to use protocol https It needs key and cert. key: ${key} cert : ${cert}`)
      }
      let myKey, myCert
      try{
        myKey = fs.readdirSync(key)
      }catch(error){
        throw new Error(`[plugins app setTls] can not read key. key: ${key}`)
      }
      try{
        myCert = fs.readdirSync(cert)
      }catch(error){
        throw new Error(`[plugins app setTls] can not read cert. cert: ${cert}`)
      }
      Object.assign(options, {tls: {
        key: myKey,
        cert: myCert,
      }})
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
      if(protocol === 'https'){
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
      if(protocol === 'https'){
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
  dependencies: 'inert',
}

export default plugin
