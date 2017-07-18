import SocketIO from 'socket.io'
import getConfig from '../config'

const app = {
    register(server, options, next) {
        const config = getConfig()
        const io = SocketIO.listen(server.select(config.event.labels).listener)
        server.expose({
            io: io,
        })
        next()
    },
}

app.register.attributes = {
    name: 'socket',
    version: '0.0.1',
}

export default app.register
