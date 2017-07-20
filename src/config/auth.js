/* global __dirname*/
import env from '../env'
const {
    APP_KEY = '9JTxCSYh/UnXsH5DhZRtKGlQFw8AwLAliHl/T9ZtQeo=',
} = env

export default {
    cookieKey: APP_KEY,
    cookieName: 'user-auth',
    strategy: 'site-point-cookie',
    dbStrategyName: 'site-point-db',
}
