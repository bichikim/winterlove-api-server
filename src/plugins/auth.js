import config from '../config'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import {decodeBase64ID} from '../lib/base64ID'
import Boom from 'boom'

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
        const {id} = decoded
        const authRoles = decoded.roles
        const {settings: {plugins: {roles} = {}} = {}} = request.route
        Object.assign(request.headers, {id: decodeBase64ID(id), roles})
        if(roles){
          const myRoles = _.isArray(roles) ? roles : [roles]
          const dif = _.difference(myRoles, authRoles)
          if(dif.length > 0){
            return next(Boom.unauthorized(`have no roles. it needs roles: ${dif.toString()}`), false)
          }
        }

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
  dependencies: ['app', 'controllers', 'bell', 'db'],
}

export default plugin
