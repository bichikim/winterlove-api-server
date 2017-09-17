/* eslint-disable class-methods-use-this */
import Controller from './Controller'

/**
 * @class
 * @extends Controller
 */
export default class MapController extends Controller{
  /**
   *
   * @constructor
   * @param {{}} request
   * @param {Function} reply
   */
  index(request, reply){
    const {role, email} = request.headers
    reply({say: 'hello', data: {role, email}})
  }

  /**
   *
   */
  main(){
    // Console.log(this._name)
  }
}
