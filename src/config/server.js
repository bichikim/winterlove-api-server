/* global __dirname*/
import Path from 'path'
export default {
    host: 'localhost',
    port: '80',
    labels: 'server',
    routes: {
        cors: true,
        files: {
            relativeTo: Path.join(__dirname, '../../../public'),
        },
    },
}
