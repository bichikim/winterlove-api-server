const env = require('../../.env.json')
export default {
    connection: {
        host: env.DB_HOST || '127.0.0.1',
        port: env.DB_PORT || '27017',
        database: env.DB_DATABASE || 'winterlove',
        user: env.DB_USER || 'admin',
        password: env.DB_PASSWORD || 'password',
    },
}
