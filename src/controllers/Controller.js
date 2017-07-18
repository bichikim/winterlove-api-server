/**
 *
 */
export default class Controller {

    /**
     *
     * @param {{}} server
     */
    constructor(server) {
        this._server = server
    }

    /**
     *
     * @return {*}
     */
    get server() {
        return this._server
    }
}
