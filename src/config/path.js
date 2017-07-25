/* global global */
import path from 'path'
import env from '../lib/env'

const root = path.join(__dirname, '../../')
const {
    CLIENT_STATIC_PATH = 'static',
    CLIENT_JS_PATH = 'js',
    CLIENT_ASSETS_INFO_PATH = 'assets.json',
    CLIENT_BUNDLE_JS_NAME = 'bundle.js',
    CLIENT_VENDOR_JS_NAME = 'vendor.js',
} = env

export default {
    CONFIG: path.join(root, 'src/config'),
    client: {
        CLIENT_STATIC_FULL_PATH: path.join(root, 'public', CLIENT_STATIC_PATH),
        CLIENT_ASSETS_FULL_INFO_PATH: path.join(root, 'public', CLIENT_ASSETS_INFO_PATH),
        CLIENT_BUNDLE_JS_NAME,
        CLIENT_VENDOR_JS_NAME,
        CLIENT_STATIC_PATH,
        CLIENT_ASSETS_INFO_PATH,
        CLIENT_JS_PATH,
    },
    server: {
        PUBLIC: path.join(root, 'public'),
        ROOT: root,
    },
}
