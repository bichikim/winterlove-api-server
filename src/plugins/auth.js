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
    const {key, strategy} = config.auth
    const webServer = server.select(labels)

    // its auth strategy is jwt
    webServer.auth.strategy(strategy, 'jwt', {
      key,
      // jwt validate this will be called if it needs validate jwt
      validateFunc: (decoded, request, next) => {
        const {email, role} = decoded
        Object.assign(request.headers, {email, role})
        return next(null, true)
      },
      verifyOptions: {
        algorithms: ['HS256'],
      },
    })

    // default auth strategy
    webServer.auth.default(strategy)

    next()
  },
}

app.register.attributes = {
  name: 'auth',
  version: '0.0.2',
}

export default app.register
