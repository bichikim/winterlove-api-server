const env = require('../../.env.json')

const {APP_NAME = 'WinterLove', APP_ENV = 'production', APP_BUNDLE_JS_PATH = 'winterlove-client/dist/bundle.js'} = env
export default {
    APP_NAME,
    APP_ENV,
    APP_BUNDLE_JS_PATH,
}
