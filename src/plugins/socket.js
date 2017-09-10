import SocketIO from 'socket.io'
import config from '../config'
import _ from 'lodash'
import getEvents from '../events'
// TOdo this is not done
const plugin = {
  /**
   *
   * @param {Server} server
   * @param {object} options
   * @param {function}next
   */
  register(server, options, next) {
    const io = SocketIO.listen(server.select(config.event.labels).listener)
    // https://www.npmjs.com/package/jsonwebtoken
    const {verify} = server.plugins.auth.jwt
    const webServer = server.select(config.server.labels)
    const events = getEvents(webServer, io)
    server.expose({
      io,
      events,
    })
    // connection behavior
    io.on('connection', (client) => {
      const user = {}
      events.forEach((event) => {
        if (_.isFunction(event.connection)) { event.connection(client) }
      })
      // register a user by jwt to connection
      client.on('connect-user', (jwt) => {
        verify(jwt, (err, decoded) => {
          if (err) {
            throw new Error(err)
          }
          _.assign(user, decoded)
          _.forEach(events, (item, key) => {
            if (!_.isFunction(item.on)) {
              return true
            }
            client.on([key], (data) => {
              item.on(data, user)
            })
            return true
          })
        })
      })
      client.on('disconnect', () => {
        events.forEach((event) => {
          if (_.isFunction(event.disconnect)) { event.disconnect(client) }
        })
      })
    })
    next()
  },
}

plugin.register.attributes = {
  name: 'socket',
  version: '0.0.1',
}

export default plugin.register
