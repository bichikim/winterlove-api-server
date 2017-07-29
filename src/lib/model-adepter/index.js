import _ from 'lodash'
/**
 * To make connection between model and any provider's model
 */
export default class ModelAdepter {
    /**
     * It can accept any Model by config
     * @param {string}name
     * @param {*}anyModel
     */
    constructor(name, anyModel) {
        this._model = anyModel
        this._config = ModelAdepter.getConfig(name, anyModel)
    }

    /**
     * Save data in db my any Model
     * @param {object} data
     * @return {Promise}
     */
    save(target, data) {
        return ModelAdepter._runConfig(this._config.save, {target, data})
    }

    /**
     * Save data in db my any Model
     * @param {object} data
     * @return {Promise}
     */
    create(data) {
        return ModelAdepter._runConfig(this._config.save, {data})
    }

    /**
     * @param {object} data
     * @return {*}
     */
    find(data) {
        return ModelAdepter._runConfig(this._config.find, {data})
    }

    // Static ////////////////////////////////////////////////////////////////////////

    /**
     *
     * @param {function}func
     * @param {object}data
     * @return {*}
     * @private
     */
    static _runConfig(func, data) {
        if (_.isFunction(func)) {
            return func(data)
        }
        throw new Error(`Waring cannot run config function`)
    }

    /**
     * Return config what model needs
     * @param {string}name
     * @param {*}anyModel
     * @return {object}
     */
    static getConfig(name, anyModel) {
        switch (name) {
        case 'mongoose':
            return require('./config/mongoose')(anyModel)
            // No default
        }
        throw new Error(`Waring cannot find a config for ${name} model`)
    }
}
