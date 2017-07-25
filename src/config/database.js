import env from '../lib/env'
const {
    DB_HOST = '127.0.0.1',
    DB_PORT = '27017',
    DB_DATABASE = 'winterlove',
    DB_USER = 'admin',
    DB_PASSWORD = 'password',
} = env

export default {
    connection: {
        HOST: DB_HOST,
        PORT: DB_PORT,
        DATABASE: DB_DATABASE,
        USER: DB_USER,
        PASSWORD: DB_PASSWORD,
    },
}
