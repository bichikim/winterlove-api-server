/* global __dirname*/
const env = require('../../.env.json')
export default {
    cookieKey: env.APP_KEY,
    cookieName: 'user-auth',
    strategy: 'site-point-cookie',
    dbStrategyName: 'site-point-db',
}
