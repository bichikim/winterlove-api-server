/* global global*/
import mongoose from 'mongoose'
import config from '../config'

const {console} = global

const app = {
    register(server, options, next) {
        let mongooseConnectionAddress
        server.expose({
            db: mongoose,
        })

        if (config.app.env === 'production') {
            const {host, port, database} = config.database.connection
            mongooseConnectionAddress = `mongodb://${host}:${port}/${database}`
        } else {
            const {host, port, database} = config.database.connection
            mongooseConnectionAddress = `mongodb://${host}:${port}/${database}`
        }

        // Plugging in My own Promises Library since deprecation mpromise
        mongoose.Promise = global.Promise

        // to know why using "useMongoClient" visit here: http://mongoosejs.com/docs/connections.html#use-mongo-client
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
