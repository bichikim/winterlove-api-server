/**
 * @type {{listen}}
 */
import SocketIO from 'socket.io'
import config from '../config'
const app = {
  /**
   *
   * @param {Server} server
   * @param {object} options
   * @param {function}next
   */
  register(server, options, next) {
    const {labels} = config.event
    const io = SocketIO.listen(server.select(labels).listener)
    server.expose({
      io: io,
    })
    next()
  },
}

app.register.attributes = {
  name: 'socket',
  version: '0.0.1',
}

export default app.register
