import _ from 'lodash'
import composers from '../../composers/index'
import config from '../../config/index'
// todo need refactoring
const app = {
  /**
   *
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
    const {labels} = config.server
    const errorCode = {
      unauthorized: 401,
      unknownPage: 404,
    }
    const webServer = server.select(labels)

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
        if (request.response.isBoom) {
          // Console.log(request.response.output.statusCode)
          const {statusCode} = request.response.output
          switch (statusCode) {
            /* A case errorCode.unknownPage:
            return reply.view('index', {crumb: server.plugins.crumb.generate(request, reply)})*/
            case errorCode.unauthorized:
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
