import config from '../config'
import _ from 'lodash'
import jwt from 'jsonwebtoken'

const plugin = {
  /**
   * setting auth & its strategy (jwt)
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next){
    const {labels} = config.server
    const {key, strategy} = config.auth
    const webServer = server.select(labels)

    server.expose({
      jwt: {
        verify(token, callback = null){
          if(_.isFunction(callback)){
            return jwt.verify(token, key, callback)
          }
          return jwt.verify(token, key)
        },
      },
    })

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

plugin.register.attributes = {
  name: 'auth',
  version: '0.0.2',
}

export default plugin.register
