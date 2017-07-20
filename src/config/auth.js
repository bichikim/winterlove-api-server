/* global __dirname*/
const env = require('../../.env.json')
const {
    APP_KEY,
} = env

export default {
    cookieKey: APP_KEY,
    cookieName: 'user-auth',
    strategy: 'site-point-cookie',
    dbStrategyName: 'site-point-db',
}
