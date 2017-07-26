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
        this._config = ModelAdepter.getConfig(name)
    }

    /**
     * Save data in db my any Model
     * @param {object} data
     * @return {Promise}
     */
    save(data) {
        const {save} = this._config
        if (_.isFunction(save)) {
            return save()
        }
        throw new Error(`Waring cannot do save config hse no save function`)
    }

    // Static ////////////////////////////////////////////////////////////////////////

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
