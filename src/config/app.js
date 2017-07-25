import env from '../lib/env'

const {
    APP_NAME = 'WinterLove',
    APP_ENV = 'production',
} = env

export default {
    APP_NAME,
    development: APP_ENV === 'development',
    production: APP_ENV === 'production',
    mode: APP_ENV,
}
