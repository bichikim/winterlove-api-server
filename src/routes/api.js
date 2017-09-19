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
            name: 'Test',
            method: 'test',
          },
        },
      },
      {
        method: 'POST',
        path: '/test2',
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
            name: 'Test',
            method: 'test2',
          },
        },
      },
    ]}
}
