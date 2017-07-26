/* global global*/
/**
 * @type {{connect}}
 */
import mongoose from 'mongoose'
/**
 * @type {{database}}
 */
import config from '../config'

const {console} = global
const {PRODUCTION} = config.server
const {HOST, PORT, DATABASE} = config.database.connection

const app = {
    /**
     *
     * @param {Server} server
     * @param {object}options
     * @param {function}next
     */
    register(server, options, next) {
        let mongooseConnectionAddress
        server.expose({
            db: mongoose,
        })

        if (PRODUCTION) {
            mongooseConnectionAddress = `mongodb://${HOST}:${PORT}/${DATABASE}`
        } else {
            mongooseConnectionAddress = `mongodb://${HOST}:${PORT}/${DATABASE}`
        }

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
