/**
 *
 * @param {Server} server
 * @return {[{method, path, handler: (object|undefined)}]}
 */
export default (server) => {
  return [
    {
      method: 'POST',
      path: '/sign-in',
      config: {
        plugins: {
          crumb: true,
          filter: {
            response: {
              only: ['name', 'email', 'gender', 'access_token'],
            },
          },
        },
        auth: {
          mode: 'try',
        },
      },
      handler: {
        controller: {
          name: 'AuthController',
          method: 'signIn',
        },
      },
    },
    {
      method: 'POST',
      path: '/sign-up',
      config: {
        plugins: {
          crumb: false,
        },
        auth: false,
      },
      handler: {
        controller: {
          name: 'AuthController',
          method: 'signUp',
        },
      },
    },
  ]
}
