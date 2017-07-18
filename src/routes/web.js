export default (server) => {
    return [
        {
            method: 'GET',
            path: '/favicon.ico',
            config: {
                auth: false,
            },
            handler: {
                file: 'favicon.ico'
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
                reply.view('index.handlebars', {crumb: server.plugins.crumb.generate(request, reply)})
            },
        },
    ]
}
