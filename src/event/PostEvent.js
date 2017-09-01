import IOEvent from './IOEvent'
/**
 * @class
 * @extends IOEvent
 */
export default class PostEvent extends IOEvent {
  /**
   * @constructor
   */
  constructor() {
    super('post')
  }
}
