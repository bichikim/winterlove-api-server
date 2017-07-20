/**
 * default Controller
 * defined Controller stuff
 * @class
 */
export default class Controller {
    /**
     *
     * @constructor
     * @param {Server} server
     */
    constructor(server) {
        this._server = server
    }

    /**
     *
     * @return {Server}
     */
    get server() {
        return this._server
    }
}
