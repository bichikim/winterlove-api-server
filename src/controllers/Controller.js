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
    const {labels} = config.server
    return this.server.select(labels)
  }

  /**
   * @return {*}
   */
  get eventServer(){
    const {labels} = config.event
    return this.server.select(labels)
  }

  /**
   * @return {*}
   */
  get file(){
    return this.server.plugins.file
  }

  /**
   *
   * @return {*}
   */
  get event(){
    return this.server.plugins.socket.events
  }

  /**
   *
   * @return {*}
   */
  get model(){
    return this.server.plugins.models
  }
}
