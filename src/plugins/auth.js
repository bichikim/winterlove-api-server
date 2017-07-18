import User from '../models/UserModel'
import getConfig from '../config'

const app = {
    register(server, options, next) {
        const config = getConfig()
        const webServer = server.select(config.server.labels)

        server.expose({
            user: User,
        })

        webServer.auth.strategy(config.auth.strategy, 'cookie', {
            password: config.auth.cookieKey,
            cookie: config.auth.cookieName,
            isSecure: false,
        })

        webServer.auth.default(config.auth.strategy)

        next()
    },
}

app.register.attributes = {
    name: 'auth',
    version: '0.0.1',
}

export default app.register
