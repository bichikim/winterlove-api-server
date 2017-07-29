/* global global */
import path from 'path'
import env from '../lib/env'

const root = path.join(__dirname, '../../')
const {
    CLIENT_STATIC_PATH = 'static',
    CLIENT_JS_PATH = 'js',
    CLIENT_ASSETS_INFO_NAME = 'assets.json',
    CLIENT_BUNDLE_JS_NAME = 'bundle',
    CLIENT_VENDOR_JS_NAME = 'vendor',
} = env
let assets
try {
    assets = require(path.join(root, 'public', CLIENT_ASSETS_INFO_NAME))
} catch (e) {
    console.log(`Warning server needs a ${CLIENT_ASSETS_INFO_NAME}`)
}

if (!assets) {
    assets = {
        [`${CLIENT_BUNDLE_JS_NAME}.js`]: `${CLIENT_BUNDLE_JS_NAME}.js`,
        [`${CLIENT_VENDOR_JS_NAME}.js`]: `${CLIENT_VENDOR_JS_NAME}.js`,
    }
}
console.log(CLIENT_BUNDLE_JS_NAME)
console.log(`${CLIENT_BUNDLE_JS_NAME}.js`)

export default {
    CONFIG: path.join(root, 'src/config'),
    client: {
        CLIENT_STATIC_FULL_PATH: path.join(root, 'public', CLIENT_STATIC_PATH),
        CLIENT_ASSETS_FULL_INFO_PATH: path.join(root, 'public', CLIENT_ASSETS_INFO_NAME),
        CLIENT_BUNDLE_JS_NAME: assets[`${CLIENT_BUNDLE_JS_NAME}.js`].split('/')[1],
        CLIENT_VENDOR_JS_NAME: assets[`${CLIENT_VENDOR_JS_NAME}.js`].split('/')[1],
        CLIENT_STATIC_PATH,
        CLIENT_ASSETS_INFO_NAME,
        CLIENT_JS_PATH,
    },
    server: {
        PUBLIC: path.join(root, 'public'),
        ROOT: root,
    },
}
