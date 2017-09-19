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
    const {files, email} = request.payload
    this.file.upload(files, email).then((result) => {
      console.log(result)
    })
    reply({})
  }
  /**
   *
   * @constructor
   * @param {{}} request
   * @param {Function} reply
   */
  test2(request, reply){
    const {email, fileName} = request.payload
    const newFile = this.model.File({email, fileName})
    newFile.save().then((document) => (reply(document)))
  }
}
