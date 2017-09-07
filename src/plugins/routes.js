import web from '../routes/web'
import auth from '../routes/auth'
import api from '../routes/api'
import forEach from 'lodash/forEach'
import config from '../config'

const app = {
  /**
   *
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
    const {labels} = config.server
    const webServer = server.select(labels)
    const routes = {
      web: web(webServer),
      auth: auth(webServer),
      api: api(webServer),
    }
    server.expose({
      routes,
    })

    forEach(routes, (item) => {
      webServer.route(item)
    })

    next()
  },
}

app.register.attributes = {
  name: 'route',
  version: '0.0.2',
}

export default app.register
