const env = require('../../.env.json')

export default {
    name: env.APP_NAME || 'WinterLove',
    env: env.APP_ENV || 'production',
}
