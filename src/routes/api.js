import Joi from 'joi'
/**
 *
 * @param {Server} server
 * @return {[{method, path, handler: (object|undefined)}]}
 */
export default (server) => {
  return [
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
  ]
}
