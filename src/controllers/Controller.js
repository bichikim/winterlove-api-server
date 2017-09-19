import config from '../config'
/**
 * default Controller
 * defined Controller stuff
 * @class
 */
export default class Controller{
  /**
   *
   * @constructor
   * @param {Server} server
   */
  constructor(server){
    this._server = server
    this._bind = config.bind(server)
  }

  /**
   *
   * @return {Server}
   */
  get server(){
    return this._server
  }

  /**
   * @return {*}
   */
  get webServer(){
    return this._bind.webServer
  }

  /**
   * @return {*}
   */
  get eventServer(){
    return this._bind.eventServer
  }

  /**
   * @return {*}
   */
  get file(){
    return this._bind.file
  }

  /**
   *
   * @return {*}
   */
  get event(){
    return this._bind.event
  }

  /**
   *
   * @return {*}
   */
  get model(){
    return this._bind.model
  }
}
