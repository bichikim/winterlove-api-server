/* eslint-disable class-methods-use-this */
/* global global */
import _ from 'lodash'

let io

export const initializeEvent = (myIo) => {
    io = myIo
}

/**
 * Event
 * @class
 */
export default class IOEvent {
    /**
     * @constructor
     * @param {string|null} channel
     */
    constructor(channel = null) {
        if (_.isString(channel)) {
            this._chanel = channel
        } else {
            throw new Error('chanel must be string!')
        }
    }

    /**
     *
     * @return {object}
     */
    get io() {
        if (io) {
            return io
        }
        throw new Error('global.___ is needed')
    }

    /**
     *
     * @param {{}} event
     * @param {{}} listener
     */
    on(event, listener) {
        this.io.on(event, listener)
    }

    /**
     *
     * @param {{}} data
     */
    emit(data) {
        const {Json} = global
        this.io.emit(this._chanel, Json.parse(data))
    }
}
