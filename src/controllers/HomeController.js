/* eslint-disable class-methods-use-this */
import Controller from './Controller'

/**
 *
 */
export default class HomeController extends Controller {
    /**
     *
     * @param {{}} request
     * @param {Function} reply
     */
    index(request, reply) {
        reply({say: 'hello'})
    }

    /**
     *
     */
    main() {
        // console.log(this._name)
    }
}
