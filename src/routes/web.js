import config from '../config'
const {staticName} = config.client

/**
 * Web routes serve for getting file request only
 * @param {Server} server
 * @namespace server.plugins.crumb
 * @return {[{method, path, handler: (object|undefined)}]} returning file routing info
 */
export default (server) => {
  return {
    routes: [
      {
        method: 'GET',
        path: '/favicon.ico',
        config: {
          auth: false,
        },
        handler: {
          file: 'favicon.ico',
        },
      },
      {
        method: 'GET',
        path: '/service-worker.js',
        config: {
          auth: false,
        },
        handler: {
          file: 'service-worker.js',
        },
      },

      {
        method: 'GET',
        path: `/${staticName}/{paths*}`,
        config: {
          auth: false,
        },
        handler: {
          controller: {
            name: 'FileController',
            method: 'getFile',
          },
        },
      },
      {
        method: 'GET',
        path: '/{param*}',
        config: {
          auth: false,
        },

        handler: {
          controller: {
            name: 'FileController',
            method: 'getHtml',
          },
        },
      },
    ],
  }
}
