import config from '../config'
import _ from 'lodash'
const {CLIENT_FILES_PATH} = config.path.client
const {ALLOW} = config.file

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
            path: '/js/{filename}.js',
            config: {
                auth: false,
            },
            handler: (request, reply) => {
                const {filename} = request.params
                return reply.file(`js/${filename}.js`)
            },
        },
        {
            method: 'GET',
            path: `/${CLIENT_FILES_PATH}/{filename}.{ext}`,
            config: {
                auth: false,
            },
            handler: (request, reply) => {
                const {filename, ext} = request.params
                if (_.indexOf(ALLOW, ext) > -1) {
                    return reply.file(`${CLIENT_FILES_PATH}/${filename}.${ext}`)
                }
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
