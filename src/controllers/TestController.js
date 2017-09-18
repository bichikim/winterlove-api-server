/* eslint-disable class-methods-use-this */
import Controller from './Controller'

/**
 * @class
 * @extends Controller
 */
export default class TestController extends Controller{
  /**
   *
   * @constructor
   * @param {{}} request
   * @param {Function} reply
   */
  test(request, reply){
    const {files} = request.payload
    this.files.upload(files).then((result) => {
      console.log(result)
    })
    reply({})
  }
}