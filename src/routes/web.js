import config from '../config'
import _ from 'lodash'
const {CLIENT_STATIC_PATH, CLIENT_BUNDLE_JS_NAME, CLIENT_VENDOR_JS_NAME, CLIENT_JS_PATH} = config.path.client
const {ALLOW} = config.file

/**
 * Web routes serve for http get file request only
 * @param {Server} server
 * @namespace server.plugins.crumb
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
            path: `/${CLIENT_JS_PATH}/{filename}.js`,
            config: {
                auth: false,
            },
            handler: (request, reply) => {
                const {filename} = request.params
                return reply.file(`${CLIENT_JS_PATH}/${filename}.js`)
            },
        },
        {
            method: 'GET',
            path: `/${CLIENT_STATIC_PATH}/{filename}.{ext}`,
            config: {
                auth: false,
            },
            handler: (request, reply) => {
                const {filename, ext} = request.params
                if (_.indexOf(ALLOW, ext) > -1) {
                    return reply.file(`${CLIENT_STATIC_PATH}/${filename}.${ext}`)
                }
            },
        },
        {
            method: 'GET',
            path: '/{param*}',
            config: {
                auth: false,
            },
            /**
             *
             * @param {object}request
             * @param {{view}}reply
             */
            handler: (request, reply) => {
                reply.view('index.handlebars', {
                    crumb: server.plugins.crumb.generate(request, reply),
                    vendorJs: `/${CLIENT_JS_PATH}/${CLIENT_VENDOR_JS_NAME}`,
                    bundleJs: `/${CLIENT_JS_PATH}/${CLIENT_BUNDLE_JS_NAME}`,
                })
            },
        },
    ]
}
