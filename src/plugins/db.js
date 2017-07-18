/* global global*/
import mongoose from 'mongoose'
import getConfig from '../config'

const app = {
    register(server, options, next) {
        let mongooseConnectionAddress
        const config = getConfig()
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

        mongoose.connect(mongooseConnectionAddress)

        {
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
