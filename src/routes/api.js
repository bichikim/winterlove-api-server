/**
 *
 * @param {Server} server
 * @return {[{method, path, handler: (object|undefined)}]}
 */
export default (server) => {
  return [
    {
      method: 'POST',
      path: '/',
      config: {
        plugins: {
          crumb: true,
        },
      },
      handler: {
        // It can be string like controller: 'HomeController@index'
        controller: {
          name: 'HomeController',
          method: 'index',
        },
      },
    },
    {
      method: 'POST',
      path: '/test',
      config: {
        plugins: {
          crumb: false,
        },
        auth: false,
      },
      handler: (request, reply) => {
        reply({success: true})
      },
    },
  ]
}
