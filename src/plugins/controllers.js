/* global __dirname*/
import _ from 'lodash'
import config from '../config'
import getControllers from '../controllers'
const {LABELS} = config.server
/**
 * Factory to make controller handlers
 * @param {{}} server
 * @return {function(*, *=)}
 */
const controllers = (server) => {
    const controllers = getControllers(server)

    return (route, options) => {
        let controller, handle

        if (_.isObject(options)) {
            if (_.isString(options.name)) {
                controller = controllers[options.name]
            } else {
                throw new Error('need a name for controllers')
            }
        } else if (_.isString(options)) {
            throw new Error('not yet to support String option sorry')
        } else {
            throw new Error('needs correct options for controllers')
        }

        if (_.isObject(controller)) {
            if (_.isString(options.method)) {
                handle = controller[options.method]
            } else {
                throw new Error('need a method name for controllers')
            }
        }

        return handle.bind(controller)
    }
}

const app = {
    register(server, options, next) {
        const webServer = server.select(LABELS)
        const handler = controllers(webServer)

        server.expose({
            handler,
        })

        server.handler('controller', handler)

        next()
    },
}

app.register.attributes = {
    name: 'controllers',
    version: '0.0.1',
}

export default app.register
