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
        tags: ['api', 'test'],
        validate: {
          params: Joi.object({
            a: Joi.number(),
            b: Joi.number(),
          }).label('Sum'),
        },
        response: {
          schema: Joi.object({
            equals: Joi.number(),
          }).label('Result'),
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
