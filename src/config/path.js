/* global global */
import path from 'path'
import env from '../lib/env'
const root = path.join(__dirname, '../../')
const {
    CLIENT_BUNDLE_JS_PATH = '/bundle.js',
    CLIENT_FILES_PATH = '/static',
} = env

export default {
    config: path.join(root, 'src/config'),
    client: {
        bundleJs: path.join(root, 'public', CLIENT_BUNDLE_JS_PATH),
        staticPath: path.join(root, 'public', CLIENT_FILES_PATH),
        CLIENT_BUNDLE_JS_PATH,
        CLIENT_FILES_PATH,
    },
    server: {
        public: path.join(root, 'public'),
        root,
    },
}
