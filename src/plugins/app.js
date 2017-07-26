/**
 * Set config and connection according to config
 */
/* global process*/
import config from '../config'

const app = {
    /**
     *
     * @param {Server} server
     * @param {object}options
     * @param {function}next
     */
    register(server, options, next) {
        server.expose({
            config: config,
        })

        {
            const {HOST, PORT, LABELS, CORS} = config.server
            const {PUBLIC} = config.path.server
            server.connection({
                host: HOST,
                port: PORT,
                labels: LABELS,
                routes: {
                    cors: CORS,
                    files: {
                        relativeTo: PUBLIC,
                    },
                },
            })
        }
        {
            const {HOST, PORT, LABELS} = config.event
            server.connection({
                host: HOST,
                port: PORT,
                labels: LABELS,
            })
        }
        next()
    },
}

app.register.attributes = {
    name: 'app',
    version: '0.0.1',
    connections: false,
}

export default app.register
