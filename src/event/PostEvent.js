import IOEvent from './IOEvent'
/**
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
