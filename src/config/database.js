import env from '../env'
const {
    DB_HOST = '127.0.0.1',
    DB_PORT = '27017',
    DB_DATABASE = 'winterlove',
    DB_USER = 'admin',
    DB_PASSWORD = 'password',
} = env

export default {
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
    },
}
