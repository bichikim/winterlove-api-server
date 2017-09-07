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
    const {appKey, strategy} = config.auth
    const webServer = server.select(labels)

    webServer.auth.strategy(strategy, 'jwt', {
      key: appKey,
      // jwt validate
      validateFunc: (decoded, request, next) => {
        const {email, role} = decoded
        Object.assign(request.headers, {email, role})
        return next(null, true)
      },
      verifyOptions: {
        algorithms: ['HS256'],
      },
    })

    webServer.auth.default(strategy)

    next()
  },
}

app.register.attributes = {
  name: 'auth',
  version: '0.0.1',
}

export default app.register
