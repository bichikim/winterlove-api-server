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
import View from './plugins/view'
import File from './plugins/file'
import Models from './plugins/models'
import HapiSwagger from 'hapi-swagger'
import packageJson from '../package.json'
import config from './config'
import {register, start} from './lib/server-initializer'
const server = new Hapi.Server()

/**
 * Register all plugins and start
 * @return {Promise.<void>}
 */
const registerPluginsAndStart = async function(){
  await register(server, Inert)
  // It needs Inert
  await register(server, App)
  // It needs App
  await register(server, Vision)
  // It needs App and Vision. setting Vision(view)
  await register(server, View)
  // It needs App
  await register(server, HapiAuthJwt2)
  // It needs App and Vision
  await register(server, Controllers)
  // It needs App
  await register(server, Bell)
  // It needs App
  await register(server, DB)
  // It needs App
  if(config.app.isProduction){
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
  }
  // It needs App, DB and Bell
  await register(server, Auth)
  // It needs App, Controllers and Auth
  await register(server, Routes)
  await register(server, Models)
  await register(server, File)
  // It needs App and Auth
  await register(server, Socket)

  // https://github.com/glennjones/hapi-swagger
  // URL = ~/documentation
  // It needs App and Routes
  await register(server, HapiSwagger, {
    info: {
      title: config.app.name,
      version: packageJson.version,
    },
    grouping: 'tags',
  })

  return await start(server)
}

/**
 * Do register all Plugins and start server
 */
registerPluginsAndStart().then(() => {
  const {console} = global
  console.log(`MongoDB server Connected to: ${server.plugins.db.address}`)
  console.log(`Public files at: ${config.path.client.root}`)
  console.log(`Server running at: ${server.select(config.server.labels).info.uri}`)
  console.log(`Event running at: ${server.select(config.event.labels).info.uri}`)
}).catch((error) => {
  console.error(error)
})
