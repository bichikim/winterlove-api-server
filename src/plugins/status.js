import _ from 'lodash'
import composers from '../composers'
import config from '../config'

const app = {
    register(server, options, next) {
        const errorCode = {
            unauthorized: 401,
            unknownPage: 404,
        }
        const webServer = server.select(config.server.labels)
        server.expose({})
        // Inspect the response here, perhaps see if it's a 404?
        // Since using vue route vue route will handle 404

        webServer.ext('onPreResponse', (request, reply) => {
            const {source, variety} = request.response
            /** @namespace request.response.isBoom */
            if (request.response.isBoom) {
                // Console.log(request.response.output.statusCode)
                const {statusCode} = request.response.output
                switch (statusCode) {
                case errorCode.unknownPage :
                    return reply.view('index', {crumb: server.plugins.crumb.generate(request, reply)})
                case errorCode.unauthorized :
                    return reply.continue()
                    // No default
                }
            }

            // Add composers in response object if it is plain response (not file or else) and source is object
            if (variety === 'plain' && _.isObject(source)) {
                Object.assign(source, composers())
            }

            return reply.continue()
        })

        next()
    },
}

app.register.attributes = {
    name: 'status',
    version: '0.0.1',
}

export default app.register
