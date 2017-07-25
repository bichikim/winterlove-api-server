/* global __dirname*/
import env from '../lib/env'
const {
    APP_KEY = '9JTxCSYh/UnXsH5DhZRtKGlQFw8AwLAliHl/T9ZtQeo=',
} = env

export default {
    COOKIE_KEY: APP_KEY,
    COOKIE_NAME: 'user-auth',
    STRATEGY: 'site-point-cookie',
    DB_STRATEGY_NAME: 'site-point-db',
}
