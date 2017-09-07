import Controller from './Controller'
import config from '../config'
import last from 'lodash/last'
import indexOf from 'lodash/indexOf'
import Boom from 'boom'
const {staticName} = config.client
const {appName} = config.app
const {allow} = config.file
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
    const file = last(paths)
    const fileSplit = file.split('.')
    const ext = last(fileSplit)
    if (indexOf(allow, ext) > -1) {
      return reply.file(`${staticName}/${request.params.paths}`)
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
      title: appName,
    })
  }
}
