import SocketIO from 'socket.io'
import config from '../config'
import _ from 'lodash'
import getEvents from '../events'
// TOdo this is not done
const plugin = {
  /**
   * setting an io socket connection
   * @param {Server} server
   * @param {object} options
   * @param {function}next
   */
  register(server, options, next){
    const io = SocketIO.listen(server.select(config.event.labels).listener)
    // https://www.npmjs.com/package/jsonwebtoken
    const webServer = server.select(config.server.labels)
    const events = getEvents(webServer, io)
    const {verify} = server.plugins.auth.jwt
    server.expose({
      io,
      events,
    })
    // connection behavior
    _.forEach(events, (namespace, key) => {
      const nsp = io.of(key)
      nsp.on('connection', (client) => {
        console.log('connection', key, client.id)
        const onConnection = (event) => {
          if(_.isFunction(event.connected)){ event.connected(client) }
        }
        const onDisconnection = (event) => {
          if(_.isFunction(event.disconnected)){ event.disconnected(client) }
        }
        const onConnectUser = (jwt) => {
          verify(jwt, (err, user) => {
            if(err){
              return
            }
            _.assign(client, {user})
            _.forEach(events, (event, key) => {
              if(!_.isFunction(event.on)){
                return true
              }
              client.on([key], (data) => {
                event.on(data, user)
              })
              return true
            })
            console.log('connect-user', user.email)
          })
        }

        _.forEach(events, onConnection)
        client.on('disconnect', () => {
          console.log('disconnect', client.id)
          _.forEach(events, onDisconnection)
        })
        client.on('connect-user', onConnectUser)
      })
    })
    next()
  },
}

plugin.register.attributes = {
  name: 'socket',
  version: '0.0.1',
}

export default plugin
