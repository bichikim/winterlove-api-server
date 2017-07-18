const env = require('../../.env.json')

const {APP_NAME = 'WinterLove', APP_ENV = 'production',
    CLIENT_BUNDLE_JS_PATH = 'winterlove-client/public/bundle.js', CLIENT_FILES_PATH = 'winterlove-client/public/files'} = env
export default {
    APP_NAME,
    APP_ENV,
    CLIENT_BUNDLE_JS_PATH,
    CLIENT_FILES_PATH,
}
