import env from '../lib/env'

const {
    APP_NAME = 'WinterLove',
    APP_ENV = 'production',
} = env

export default {
    APP_NAME,
    DEVELOPMENT: APP_ENV === 'development',
    PRODUCTION: APP_ENV === 'production',
    MODE: APP_ENV,
}
