/**
 *
 * @param {Server} server
 * @return {[]}
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
