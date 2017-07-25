/**
 * Make registering Promise
 * @param {Server} server
 * @param {*} plugin
 * @param {object} options
 * @return {Promise}
 */
export const register = (server, plugin, options = {}) => {
    return new Promise(function(resolve, reject) {
        server.register({
            register: plugin,
            options: options,
        }, (error) => {
            if (error) {
                const {name, version} = plugin.attributes
                Object.assign(error, {name, version})
                return reject(error)
            }
            resolve()
        })
    })
}

/**
 * Make promise to start server
 * @param {Server} server
 * @return {Promise}
 */
export const start = (server) => {
    return new Promise(function(resolve, reject) {
        server.start((error) => {
            if (error) {
                return reject(error)
            }
            resolve()
        })
    })
}
