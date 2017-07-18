import webRouteConfig from '../routes/web'
import authRouteConfig from '../routes/auth'
import apiRouteConfig from '../routes/api'
import getConfig from '../config'

const app = {
    register(server, options, next) {
        const config = getConfig()
        const webServer = server.select(config.server.labels)
        const webRoute = webRouteConfig(webServer)
        const authRoute = authRouteConfig(webServer)
        const apiRoute = apiRouteConfig(webServer)

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
