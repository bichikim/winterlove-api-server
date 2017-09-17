/* global global*/
/**
 * @typedef {object} mongoose
 * @property {object} connection
 * @property {Promise} Promise
 */
import mongoose from 'mongoose'
import config from '../config'

const plugin = {
  /**
   * setting a db connection
   * @param {Server} server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next){
    const {console} = global
    const {host, port, database} = config.database
    const mongooseConnectionAddress = `mongodb://${host}:${port}/${database}`
    server.expose({
      db: mongoose,
      address: mongooseConnectionAddress,
    })

    // Plugging in My own Promises Library since deprecation mpromise
    mongoose.Promise = global.Promise

    // To know why using "useMongoClient" visit here: http://mongoosejs.com/docs/connections.html#use-mongo-client
    mongoose.connect(mongooseConnectionAddress, {useMongoClient: true})

    {
      const {connection} = mongoose
      connection.on('error', console.error)
      connection.once('open', () => {
        next()
      })
    }
  },
}

plugin.register.attributes = {
  name: 'db',
  version: '0.0.2',
}

export default plugin.register
