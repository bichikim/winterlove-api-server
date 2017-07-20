import webRouteConfig from '../routes/web'
import authRouteConfig from '../routes/auth'
import apiRouteConfig from '../routes/api'
import _ from 'lodash'
import config from '../config'

/**
 * To make crumb option false when app mode is development
 * @param {[{method, path, handler: (object|undefined)}]} route
 * @return {[{config:{plugins:{crumb: boolean}}}]}
 */
const developmentMode = (route) => {
    const nextRoute = route
    _.map(nextRoute, (item) => {
        const nextItem = item
        if (_.isObject(nextItem)) {
            if (_.isObject(nextItem.config)) {
                if (_.isObject(nextItem.config.plugins)) {
                    nextItem.config.plugins.crumb = false
                } else {
                    nextItem.config.plugins = {
                        crumb: false,
                    }
                }
            } else {
                nextItem.config = {
                    plugins: {
                        crumb: false,
                    },
                }
            }
        }
        return nextItem
    })
    return nextRoute
}

const app = {
    register(server, options, next) {
        const {development} = config.app
        const webServer = server.select(config.server.labels)
        // Override config plugins crumb for testing when app mode is development
        const webRoute = development ? developmentMode(webRouteConfig(webServer)) : webRouteConfig(webServer)
        const authRoute = development ? developmentMode(authRouteConfig(webServer)) : authRouteConfig(webServer)
        const apiRoute = development ? developmentMode(apiRouteConfig(webServer)) : apiRouteConfig(webServer)

        server.expose({
            route: {
                web: webRoute,
            },
        })

        webServer.route(webRoute)

        webServer.route(authRoute)

        webServer.route(apiRoute)

        next()
    },
}

app.register.attributes = {
    name: 'route',
    version: '0.0.1',
}

export default app.register
