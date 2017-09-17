import _ from 'lodash'
/**
 * default Event
 * in Client io.emit('EventClass', data) will call EventClass.on(data) in Server
 * in Server EventClass.emit(data) will call io.on in Client with nameSpace '/EventClass'
 * defined Event stuff
 * @class
 */
export default class Event{
  /**
   *
   * @constructor
   * @param {Server} server
   * @param {object} io
   * @param {string|null} eventName
   */
  constructor(server, io, eventName = null){
    this._server = server
    this._io = io
    this._eventName = eventName
    /**
     * mark what name space is
     * @type {string}
     * @protected
     */
    this._nameSpace = '/'
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
  get nameSpace(){
    return this._nameSpace
  }

  /**
   *
   * @return {Server}
   */
  get server(){
    if(this._server){
      return this._server
    }
    throw new Error('Needs server')
  }

  /**
   *
   * @return {object}
   */
  get io(){
    if(this._io){
      return this._io
    }
    throw new Error('Needs io')
  }

  /**
   *
   * @return {string|null|*}
   */
  get eventName(){
    if(this._eventName){
      return this._eventName
    }
    throw new Error('Needs eventName')
  }

  /**
   *
   * @param {{email}}user
   * @return {(object|undefined)}
   * @private
   */
  _getSocket(user){
    if(!user.email){
      throw new Error(`[ Event ] user in the emitToUser needs email. user: ${user}`)
    }
    const {nameSpace, io} = this
    const {isObject, find} = _
    let sockets
    if(nameSpace !== '/'){
      sockets = io.of(`/${nameSpace}`).sockets
    } else {
      sockets = io.sockets
    }
    const {connected} = sockets.connected
    if(!connected){
      return io
    }
    const socket = find(connected, (item) => {
      if(!isObject(item.user)){
        return false
      }
      return item.user.email === user.email
    })
    if(!socket){
      return io
    }
    return socket
  }

  /**
   * @param {object} data
   * @param {object} options
   * @param {({email}|null)} options.user
   * @param {(string|null)} options.room
   */
  emit(data, options = {}){
    const {Json} = global
    const {user = null, room = null} = options
    const {eventName, nameSpace, _getSocket} = this
    let socket
    if(user){
      socket = _getSocket(user)
    }
    if(nameSpace !== '/'){
      socket = socket.of(nameSpace)
    }
    if(_.isString(room)){
      socket = socket.to(room)
    }
    socket.emit(eventName, Json.parse(data), nameSpace)
  }
}
