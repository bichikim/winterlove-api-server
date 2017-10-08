import requireAll from 'require-all'
import _ from 'lodash'

let controllers

/**
 *
 * @return {object}
 */
export const getControllerClasses = () => {
  if(!controllers){
    controllers = requireAll({
      dirname: __dirname,
      filter: /(.+Controller)\.js$/,
      resolve: (controller) => {
        return controller.default
      },
      map: (name, path) => {
        const [modelName] = name.split('Controller')
        return modelName
      },
    })
  }
  return controllers
}

/**
 * Factory to make controller handlers
 * @param {Server} server
 * @return {function(*, *=)}
 */
export default (server) => {
  // since controllers needs server to use must pass sever when it gets controllers
  const controllersClasses = getControllerClasses()
  const controllers = {}
  _.forEach(controllersClasses, (Controller, key) => {
    _.assign(controllers, {[key]: new Controller(server)})
  })
  return (route, options) => {
    let handle, controllerName, methodName

    // Find Controller by controller(name)
    if(_.isObject(options)){
      const {name, method} = options
      if(_.isString(name) && _.isString(method)){
        controllerName = name
        methodName = method
      }else{
        throw new Error(`[ controllers ] It seems name: ${name} or method: ${method} is not a string `)
      }
      // method@controller name
    }else if(_.isString(options)){
      const [method, controller] = options.split('@')
      if(_.isString(controller) && _.isString(method)){
        controllerName = controller
        methodName = method
      }else{
        throw new Error(`[ controllers ] It is not like method@controller. the current options is ${options}`)
      }
    }else{
      throw new Error(
        `[ controllers ] It needs correct options {method: \'\', controller: \'\'} or method@controller.
         the current options is ${options}`
      )
    }

    // make sure controllerName to be capitalized
    controllerName = _.capitalize(controllerName)
    // make sure methodName to be camelCased
    methodName = _.camelCase(methodName)

    const controller = controllers[controllerName]
    if(_.isObject(controller)){
      handle = controller[methodName]
    }else{
      throw new Error(`[ controllers ] It needs a correct controller name. the current options is ${options}`)
    }

    if(!_.isFunction(handle)){
      throw new Error(`[ controllers ] controller has a member: ${methodName} However that is not a function`)
    }

    return handle.bind(controller)
  }
}
