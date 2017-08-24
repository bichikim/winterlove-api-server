import Controller from './Controller'
import config from '../config'
import _ from 'lodash'
const {CLIENT_STATIC_PATH, CLIENT_BUNDLE_JS_NAME, CLIENT_VENDOR_JS_NAME, CLIENT_JS_PATH} = config.path.client
const {ALLOW} = config.file
/**
 *
 */
export default class FileController extends Controller {
    /**
     *
     * @param {*}request
     * @param {*}reply
     * @return {*}
     */
    getJavascriptMapFile(request, reply) {
        const {filename} = request.params
        return reply.file(`${CLIENT_JS_PATH}/${filename}.js.map`)
    }

    /**
     *
     * @param {*}request
     * @param {*}reply
     * @return {*}
     */
    getJavascriptFile(request, reply) {
        const {filename} = request.params
        return reply.file(`${CLIENT_STATIC_PATH}/js/${filename}.js`)
    }

    /**
     *
     * @param {*}request
     * @param {*}reply
     * @return {*}
     */
    getFile(request, reply) {
        const {filename, ext, type} = request.params
        if (_.indexOf(ALLOW, ext) > -1) {
            return reply.file(`${CLIENT_STATIC_PATH}/${type}/${filename}.${ext}`)
        }
    }

    /**
     *
     * @param {*}request
     * @param {*}reply
     * @return {*}
     */
    getHtml(request, reply) {
        return reply.view('index.handlebars', {
            crumb: this.server.plugins.crumb.generate(request, reply),
            vendorJs: `/${CLIENT_JS_PATH}/${CLIENT_VENDOR_JS_NAME}`,
            bundleJs: `/${CLIENT_JS_PATH}/${CLIENT_BUNDLE_JS_NAME}`,
        })
    }
}
