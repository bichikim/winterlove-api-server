import config from '../config'

const {LABELS} = config.server
const {APP_KEY, STRATEGY} = config.auth

const app = {
  /**
   *
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
    /**
     * @type {{auth:{strategy, default}}}
     */
    const webServer = server.select(LABELS)

    server.expose({
    })

    webServer.auth.strategy(STRATEGY, 'jwt', {
      key: APP_KEY,
      validateFunc: (decoded, request, next) => {
        const {email, role} = decoded
        Object.assign(request.headers, {email, role})
        return next(null, true)
      },
      verifyOptions: {
        algorithms: ['HS256'],
      },
    })

    webServer.auth.default(STRATEGY)

    next()
  },
}

app.register.attributes = {
  name: 'auth',
  version: '0.0.1',
}

export default app.register
