/* global global*/
/**
 * @type {{connect}}
 */
import mongoose from 'mongoose'
/**
 * @type {{database}}
 */
import config from '../config'

const app = {
  /**
   *
   * @param {Server} server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next) {
    const {console} = global
    const {host, port, database} = config.database
    const mongooseConnectionAddress = `mongodb://${host}:${port}/${database}`
    server.expose({
      db: mongoose,
    })

    // Plugging in My own Promises Library since deprecation mpromise
    mongoose.Promise = global.Promise

    // To know why using "useMongoClient" visit here: http://mongoosejs.com/docs/connections.html#use-mongo-client
    mongoose.connect(mongooseConnectionAddress, {useMongoClient: true})

    {
      /**
       * @type {{on: function, once: function}}
       */
      const {connection} = mongoose
      connection.on('error', console.error)
      connection.once('open', () => {
        console.log(`MongoDB server Connected to: ${mongooseConnectionAddress}`)
        next()
      })
    }
  },
}

app.register.attributes = {
  name: 'db',
  version: '0.0.1',
}

export default app.register
