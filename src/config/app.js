const env = require('../../.env.json')

const {
    APP_NAME = 'WinterLove',
    APP_ENV = 'production',
} = env

export default {
    APP_NAME,
    APP_ENV,
}
