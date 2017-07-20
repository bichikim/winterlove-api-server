/* global global*/
import {Server} from 'hapi'
import Inert from 'inert'
import App from './plugins/app'
import Controllers from './plugins/controllers'
import Routes from './plugins/routes'
import Bell from 'bell'
import Vision from 'vision'
import DB from './plugins/db'
import AuthCookie from 'hapi-auth-cookie'
import Crumb from 'crumb'
import Auth from './plugins/auth'
import Socket from './plugins/socket'
import Status from './plugins/status'
import handlebars from 'handlebars'

/**
 *
 * @param {Server} server
 * @param {*} plugin
 * @param {object} options
 * @return {Promise}
 */
const register = (server, plugin, options = {}) => {
    return new Promise(function(resolve, reject) {
        server.register({
            register: plugin,
            options: options,
        }, (error) => {
            if (error) {
                return reject(error)
            }
            resolve()
        })
    })
}

/**
 * @type {Server}
 */
const server = new Server()

/**
 * After loading all plugins
 * @param {Server} server
 */
const globalSet = (server) => {
    // View setting todo  temporarily being here. it needs to be replaced
    /**
     * @namespace server.views
     */
    server.views({
        engines: {
            // This object member name will be name of file type
            handlebars: {
                // Set what kind of module the file type use
                module: handlebars,
            },
        },
        // Root path for vision(view)
        relativeTo: `${__dirname}/../public`,
    })
}

/**
 *
 * @param {Server} server
 * @return {Promise}
 */
const start = (server) => {
    return new Promise(function(resolve, reject) {
        server.start((error) => {
            if (error) {
                return reject(error)
            }
            resolve()
        })
    })
}

/**
 *
 * @return {Promise.<void>}
 */
const registerPlugins = async function() {
    await register(server, Inert)
    await register(server, Vision)
    // App needs Inert so register it after Inert
    // App has connection so register before others
    await register(server, App)
    await register(server, Controllers)
    // Routes needs Controllers so register it after Controllers
    // Routes has routes so register before others
    await register(server, Bell)
    await register(server, DB)
    await register(server, AuthCookie)
    await register(server, Crumb, {
        restful: true,
        cookieOptions: {
            // When app is using http it needs isSecure being false.
            isSecure: false,
        },
        // AddToViewContext: false,
        // AutoGenerate: false,
    })
    // Auth needs connection and config so register it after App
    // Auth needs AuthCookie, DB and Bell so register it after Bell, DB and AuthCookie
    await register(server, Auth)
    // Routes is using auth so it needs Auth
    await register(server, Routes)
    await register(server, Status)
    return await register(server, Socket)
}

/**
 *
 */
registerPlugins().then(() => {
    globalSet(server)
    start(server).then(() => {
        console.log('Server running at:', server.select(server.plugins.app.config.server.labels).info.uri)
        console.log('Event running at:', server.select(server.plugins.app.config.event.labels).info.uri)
    })
})
