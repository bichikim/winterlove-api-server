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
                            only: ['name', 'email', 'gender'],
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
            path: '/sign-out',
            config: {
                plugins: {
                    crumb: true,
                },
                auth: {
                    mode: 'required',
                },
            },
            handler: {
                controller: {
                    name: 'AuthController',
                    method: 'signOut',
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
