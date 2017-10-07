/* eslint-disable class-methods-use-this */
import Controller from './Controller'
import models from '../models'
const {User} = models

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
    }).catch((error) => {
      console.log(error)
      reply({})
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
    const {id, roles} = request.headers
    reply({id, roles})
    // const {email, fileName} = request.payload
    // const newFile = this.model.File({email, fileName})
    // newFile.save().then((document) => (reply(document)))
  }
}
