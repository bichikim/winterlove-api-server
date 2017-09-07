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

    // Find Controller by controller(name)
    if (_.isObject(options)) {
      const {controller, method} = options
      if (_.isString(name) && _.isString(method)) {
        controllerName = controller
        methodName = method
      } else {
        throw new Error(`[ controllers ] It seems name: ${name} or method: ${method} is not a string `)
      }
      // method@controller name
    } else if (_.isString(options)) {
      const [method, controller] = options.split('@')
      if (_.isString(controller) && _.isString(method)) {
        controllerName = controller
        methodName = method
      } else {
        throw new Error(`[ controllers ] It is not like method@controller. the current options is ${options}`)
      }
    } else {
      throw new Error(
        `[ controllers ] It needs correct options {method: \'\', controller: \'\'} or method@controller.
         the current options is ${options}`
      )
    }

    const controller = controllers[controllerName]
    if (_.isObject(controller)) {
      handle = controller[methodName]
    } else {
      throw new Error(`[ controllers ] It needs a correct controller name. the current options is ${options}`)
    }

    if (!_.isFunction(handle)) {
      throw new Error(`[ controllers ] controller has a member: ${methodName} However that is not a function`)
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
  version: '0.0.2',
}

export default app.register
