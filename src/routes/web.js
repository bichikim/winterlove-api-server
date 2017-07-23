import config from '../config'
const {path} = config

/**
 * Web routes serve for http get file request only
 * @param {Server} server
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
            path: '/bundle.js',
            config: {
                auth: false,
            },
            handler: {
                file: path.client.bundleJs,
            },
        },
        {
            method: 'GET',
            path: '/files/{param*}',
            config: {
                auth: false,
            },
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: false,
                    index: true,
                },
            },
        },
        {
            method: 'GET',
            path: '/{param*}',
            config: {
                auth: false,
            },
            handler: (request, reply) => {
                reply.view('index.handlebars', {
                    crumb: server.plugins.crumb.generate(request, reply),
                })
            },
        },
    ]
}
