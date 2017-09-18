import Joi from 'joi'
/**
 *
 * @param {Server} server
 * @return {Object}
 */
export default (server) => {
  return {
    routes: [
      {
        method: 'POST',
        path: '/test',
        config: {
          description: 'Array properties',
          tags: ['api'],
          payload: {
            output: 'stream',
            allow: 'multipart/form-data',
          },
          plugins: {
            crumb: false,
          },
          auth: false,
        },
        handler: {
          controller: {
            name: 'TestController',
            method: 'test',
          },
        },
      },
    ]}
}
