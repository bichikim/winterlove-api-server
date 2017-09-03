import config from '../config'
const {STATIC_PATH} = config.path.client

/**
 * Web routes serve for http get file request only
 * @param {Server} server
 * @namespace server.plugins.crumb
 * @return {[{method, path, handler: (object|undefined)}]} returning file routing info
 */
export default (server) => {
  return [
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
      path: `/${STATIC_PATH}/{paths*}`,
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
  ]
}
