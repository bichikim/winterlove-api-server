
export default (server) => {
    return [
        {
            method: 'GET',
            path: '/file/{param*}',
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
