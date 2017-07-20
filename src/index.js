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
import config from './config'
import {register, start} from './lib/server-initializer'

/**
 * New server
 * @type {Server}
 */
const server = new Server()

/**
 * After loading all plugins
 * @param {Server} server
 */
const globalSet = (server) => {
    const {path} = config
    // View setting todo temporarily being here. it needs to be replaced
    server.views({
        engines: {
            // It will be name of file type
            handlebars: {
                // Set what kind of module to use for file type
                module: handlebars,
            },
        },
        // Root path for vision(view)
        relativeTo: path.server.public,
    })
}

/**
 * Register all plugins
 * @return {Promise.<void>}
 */
const registerPlugins = async function() {
    await register(server, Inert)
    // It needs Inert
    // It has connection so all plugins need App
    await register(server, App)
    await register(server, Vision)
    // It needs Vision and App
    await register(server, Controllers)
    await register(server, Bell)
    await register(server, DB)
    await register(server, AuthCookie)
    await register(server, Crumb, {
        // When server running as restful server (this server is restful mode server + file server + view server[only index.handlebars])
        restful: true,
        cookieOptions: {
            // When app is using http it needs isSecure to be false.
            isSecure: false,
        },
        // It is flag using view or not default : true
        // AddToViewContext: false,
        // It is able to turn on generating crumb each reloading page default : true
        // AutoGenerate: false,
    })
    // It needs App, AuthCookie, DB and Bell
    await register(server, Auth)
    // It needs Controllers, Auth and App
    await register(server, Routes)
    await register(server, Status)
    return await register(server, Socket)
}

/**
 * Do register all Plugins and then set global setting and start server after loading all
 */
registerPlugins().then(() => {
    globalSet(server)
    start(server).then(() => {
        // Serve string messages
        console.log('Server running at:', server.select(server.plugins.app.config.server.labels).info.uri)
        console.log('Event running at:', server.select(server.plugins.app.config.event.labels).info.uri)
    })
})
