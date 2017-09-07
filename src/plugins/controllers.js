/* global __dirname*/
import _ from 'lodash'
import config from '../config'
import getControllers from '../controllers'

/**
 * Factory to make controller handlers
 * @param {Server} server
 * @return {function(*, *=)}
 */
const controllers = (server) => {
  const controllers = getControllers(server)

  return (route, options) => {
    let handle, controllerName, methodName

    // Find Controller by name
    if (_.isObject(options)) {
      const {name, method} = options
      if (_.isString(name) && _.isString(method)) {
        controllerName = name
        methodName = method
      } else {
        throw new Error('It needs a name or a method')
      }
    } else if (_.isString(options)) {
      const [method, kind] = options.split('@')
      if (_.isString(kind) && _.isString(method)) {
        controllerName = kind
        methodName = method
      } else {
        throw new Error('String controller option is odd')
      }
    } else {
      throw new Error('It needs correct options')
    }

    const controller = controllers[controllerName]
    if (_.isObject(controller)) {
      handle = controller[methodName]
    } else {
      throw new Error('It needs a correct controller name')
    }

    if (!_.isFunction(handle)) {
      throw new Error('IT needs a correct method name')
    }

    return handle.bind(controller)
  }
}

const app = {
  /**
   *
   * @param {Server} server
   * @param {object} options
   * @param {function}next
   */
  register(server, options, next) {
    const {labels} = config.server
    const webServer = server.select(labels)
    const handler = controllers(webServer)

    server.expose({
      handler,
    })

    // Set handler options name 'controller'
    server.handler('controller', handler)

    next()
  },
}

app.register.attributes = {
  name: 'controllers',
  version: '0.0.1',
}

export default app.register
