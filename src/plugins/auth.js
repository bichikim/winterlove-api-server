import User from '../models/UserModel'
import config from '../config'

const {LABELS} = config.server
const {COOKIE_KEY, COOKIE_NAME, STRATEGY} = config.auth

const app = {
    register(server, options, next) {
        const webServer = server.select(LABELS)

        server.expose({
            user: User,
        })

        webServer.auth.strategy(STRATEGY, 'cookie', {
            password: COOKIE_KEY,
            cookie: COOKIE_NAME,
            isSecure: false,
        })

        webServer.auth.default(STRATEGY)

        next()
    },
}

app.register.attributes = {
    name: 'auth',
    version: '0.0.1',
}

export default app.register
