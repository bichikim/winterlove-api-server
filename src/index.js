/* global global*/
import Hapi from 'hapi'
import Inert from 'inert'
import App from './plugins/app'
import HapiAuthJwt2 from 'hapi-auth-jwt2'
import Controllers from './plugins/controllers'
import Routes from './plugins/routes'
import Bell from 'bell'
import Vision from 'vision'
import DB from './plugins/db'
import Crumb from 'crumb'
import Auth from './plugins/auth'
import Socket from './plugins/socket'
// import Status from './plugins/status'
// import DataFilter from './plugins/data-filter'
import HapiSwagger from 'hapi-swagger'
import handlebars from 'handlebars'
import packageJson from '../package.json'
import config from './config'
import {register, start} from './lib/server-initializer'
/**
 * @typedef {object} Hapi
 * @property {function} Server
 */

/**
 * @typedef {function} Server
 * @property {function} views
 * @property {function} register
 * @property {function} start
 * @property {function} select
 * @property {function} expose
 * @property {function} connection
 * @property {function} handler
 * @property {function} continue
 * @property {{crumb:{generate}, app}} plugins
 */

/**
 * New server
 * @type {Server}
 */
const server = new Hapi.Server()

const {console} = global

const globalSet = (server) => {
  viewsSet(server)
}
/**
 * After loading all plugins
 * @param {Server} server
 */
const viewsSet = (server) => {
  const {root} = config.path.client
  console.log(`Public files at: ${root}`)
  server.views({
    engines: {
      // It will be name of file type
      html: {
        // Set what kind of module to use for file type
        module: handlebars,
      },
    },
    // Root path for vision(view)
    relativeTo: root,
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
  await register(server, HapiAuthJwt2)
  // It needs Vision and App
  await register(server, Controllers)
  await register(server, Bell)
  await register(server, DB)
  await register(server, Crumb, {
    // It is true When server running as restful server
    // (this server is restful mode server + file server + view server[only index.handlebars])
    restful: true,
    cookieOptions: {
      // It is false When this server is using http
      isSecure: false,
    },
    // It is a flag for using view or not. default : true
    // AddToViewContext: false,
    // It is able to turn on generating crumb whenever reloading page. default : true
    // AutoGenerate: false,
  })
  // It needs App, AuthCookie, DB and Bell
  await register(server, Auth)
  // It needs Controllers, Auth and App
  await register(server, Routes)
  // await register(server, Status)
  // await register(server, DataFilter)
  await register(server, Socket)
  // https://github.com/glennjones/hapi-swagger
  // URL = ~/documentation
  await register(server, HapiSwagger, {
    info: {
      title: config.app.name,
      version: packageJson.version,
    },
  })
  await globalSet(server)
  return await start(server)
}

/**
 * Do register all Plugins and then set global setting and start server
 */
registerPlugins().then(() => {
  console.log('Server running at:', server.select(config.server.labels).info.uri)
  console.log('Event running at:', server.select(config.event.labels).info.uri)
}).catch((error) => {
  console.error(error)
})
