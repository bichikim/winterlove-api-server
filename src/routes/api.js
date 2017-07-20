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
                auth: false,
            },
            handler: {
                controller: {
                    name: 'HomeController',
                    method: 'index',
                },
            },
        },
    ]
}
