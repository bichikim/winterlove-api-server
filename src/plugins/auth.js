import User from '../models/UserModel'
import config from '../config'

const {LABELS} = config.server
const {APP_KEY, STRATEGY} = config.auth

const app = {
    /**
     *
     * @param {Server}server
     * @param {object}options
     * @param {function}next
     */
    register(server, options, next) {
        /**
         * @type {{auth:{strategy, default}}}
         */
        const webServer = server.select(LABELS)

        server.expose({
            user: User,
        })

        webServer.auth.strategy(STRATEGY, 'jwt', {
            key: APP_KEY,
            validateFunc: (decoded, request, next) => {
                const {email} = decoded
                User.findOne({email})
                    .then((document) => {
                        if (document) {
                            return next(null, true)
                        }
                        return next(null, false)
                    })
                    .catch(() => {
                        return next(null, false)
                    })
            },
            verifyOptions: {
                algorithms: ['HS256'],
            },
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
