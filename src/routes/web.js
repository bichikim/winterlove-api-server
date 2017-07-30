import config from '../config'
const {CLIENT_STATIC_PATH, CLIENT_JS_PATH} = config.path.client

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
            handler: {
                controller: {
                    name: 'FileController',
                    method: 'getJavascriptFile',
                },
            },
        },
        {
            method: 'GET',
            path: `/${CLIENT_JS_PATH}/{filename}.js.map`,
            config: {
                auth: false,
            },
            handler: {
                controller: {
                    name: 'FileController',
                    method: 'getJavascriptMapFile',
                },
            },
        },
        {
            method: 'GET',
            path: `/${CLIENT_STATIC_PATH}/{filename}.{ext}`,
            config: {
                auth: false,
            },
            handler: {
                controller: {
                    name: 'FileController',
                    method: 'getFile',
                },
            },
        },
        {
            method: 'GET',
            path: '/{param*}',
            config: {
                auth: false,
            },

            handler: {
                controller: {
                    name: 'FileController',
                    method: 'getHtml',
                },
            },
        },
    ]
}
