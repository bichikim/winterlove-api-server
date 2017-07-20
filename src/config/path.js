/* global global */
import path from 'path'
import env from '../env'
const root = path.join(__dirname, '../../')
const {
    CLIENT_BUNDLE_JS_PATH = 'public/bundle.js',
    CLIENT_FILES_PATH = 'public/static',
} = env

export default {
    config: path.join(root, 'src/config'),
    client: {
        bundleJs: path.join(root, CLIENT_BUNDLE_JS_PATH),
        staticPath: path.join(root, CLIENT_FILES_PATH),
    },
    server: {
        public: path.join(root, 'public'),
        root,
    },
}
