/* global global */
import path from 'path'
import env from '../lib/env'
const root = path.join(__dirname, '../../')
const {
    CLIENT_FILES_PATH = 'static',
    CLIENT_JS_PATH = 'js',
} = env

export default {
    config: path.join(root, 'src/config'),
    client: {
        CLIENT_STATIC_FULL_PATH: path.join(root, 'public', CLIENT_FILES_PATH),
        CLIENT_FILES_PATH,
        CLIENT_JS_PATH,
    },
    server: {
        public: path.join(root, 'public'),
        root,
    },
}
