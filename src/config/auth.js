/* global __dirname*/
import env from '../lib/env'
const {
    APP_KEY = '9JTxCSYh/UnXsH5DhZRtKGlQFw8AwLAliHl/T9ZtQeo=',
} = env

export default {
  APP_KEY,
  COOKIE_NAME: 'user-auth',
  STRATEGY: 'jwt',
  DB_STRATEGY_NAME: 'site-point-db',
}
