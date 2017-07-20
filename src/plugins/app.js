/**
 * Set config and connection according to config
 */
/* global process*/
import config from '../config'

// eslint-disable-next-line no-process-env
process.env.NODE_ENV = config.app.mode

const app = {
    register(server, options, next) {
        server.expose({
            config: config,
        })

        server.connection(config.server)
        server.connection(config.event)

        next()
    },
}

app.register.attributes = {
    name: 'app',
    version: '0.0.1',
    connections: false,
}

export default app.register
