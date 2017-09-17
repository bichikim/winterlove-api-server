import Event from './Event'
/**
 * @class
 * @extends Event
 */
export default class PostEvent extends Event{
  /**
   * @constructor
   * @param {array}params
   */
  constructor(...params){
    super(...params)
    this._nameSpace = '/post'
  }

  /**
   *
   * @param {*} data
   */
  on(data){
    console.log(data)
  }
}
