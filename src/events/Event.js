import _ from 'lodash'
/**
 * default Event
 * defined Event stuff
 * @class
 */
export default class Event {
  /**
   *
   * @constructor
   * @param {Server} server
   * @param {object} io
   * @param {string|undefined} nameSpace
   */
  constructor(server, io, nameSpace = undefined) {
    this._server = server
    this._io = io
    this._nameSpace = nameSpace
  }

  /* functions
  on(data, user)
  connection(client)
  disconnection(client)
   */

  /**
   *
   * @return {string}
   */
  get nameSpace() {
    if (_.isString(this._nameSpace)) {
      return this._nameSpace
    }
    throw new Error('chanel must be string')
  }

  /**
   *
   * @return {Server}
   */
  get server() {
    if (this._server) {
      return this._server
    }
    throw new Error('Needs server')
  }

  /**
   *
   * @return {object}
   */
  get io() {
    if (this._io) {
      return this._io
    }
    throw new Error('Needs io')
  }

  /**
   *
   * @param {object} data
   */
  emit(data) {
    const {Json} = global
    const nameSpace = this.io.of(this.nameSpace)
    nameSpace.emit(Json.parse(data), this.nameSpace)
  }
}
