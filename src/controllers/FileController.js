import Controller from './Controller'
import config from '../config'
import _ from 'lodash'
import Boom from 'boom'
const {STATIC_PATH} = config.path.client
const {APP_NAME} = config.app
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
  getFile(request, reply) {
    const paths = request.params.paths.split('/')
    const file = _.last(paths)
    const fileSplit = file.split('.')
    const ext = _.last(fileSplit)
    if (_.indexOf(ALLOW, ext) > -1) {
      return reply.file(`${STATIC_PATH}/${request.params.paths}`)
    }
    return reply(Boom.forbidden('Not allow to read the file', {ext}))
  }

  /**
   *
   * @param {*}request
   * @param {*}reply
   * @return {*}
   */
  getHtml(request, reply) {
    return reply.view('index.html', {
      crumb: this.server.plugins.crumb.generate(request, reply),
      title: APP_NAME,
    })
  }
}
