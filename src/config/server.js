/* global __dirname*/
import path from './path'
export default {
    host: 'localhost',
    port: '80',
    labels: 'server',
    routes: {
        cors: true,
        files: {
            relativeTo: path.server.public,
        },
    },
}
