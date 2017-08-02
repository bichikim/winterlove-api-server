import _ from 'lodash'
import config from '../config'
const {LABELS} = config.server
const app = {
    /**
     *
     * @param {Server}server
     * @param {object}options
     * @param {function}next
     */
    register(server, options, next) {
        const webServer = server.select(LABELS)

        // Inspect the response here, perhaps see if it's a 404?
        // Since using vue route vue route will handle 404
        webServer.ext('onPreResponse',
            /**
             *
             * @param {{response:{isBoom}}}request
             * @param {{continue}}reply
             * @return {*}
             */
            (request, reply) => {
                const {source, variety} = request.response
                if (!source) {
                    return reply.continue()
                }
                const {data} = source
                if (!data) {
                    return reply.continue()
                }
                if (request.route.settings.plugins) {
                    const {filter} = request.route.settings.plugins
                    if (data && variety === 'plain' && filter) {
                        const {response} = filter
                        if (response) {
                            const {only, except} = response
                            if (_.isArray(only)) {
                                request.response.source.data = _.pick(_.clone(data._doc), only)
                                return reply.continue()
                            } else if (_.isArray(except)) {
                                request.response.source.data = _.omit(_.clone(data._doc), except)
                                return reply.continue()
                            }
                        }
                    }
                }

                return reply.continue()
            })

        next()
    },
}

app.register.attributes = {
    name: 'data-filter',
    version: '0.0.1',
}

export default app.register
