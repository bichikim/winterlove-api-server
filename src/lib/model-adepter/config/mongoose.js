import _ from 'lodash'

/**
 * @typedef {function} Model
 * @property {function} find
 * @property {function} findById
 */

/**
 *
 * @version 0.0.1
 * @param {Model} model
 * @return {{save, find}}
 */
export default (model) => {
    return {
        /**
         *
         * @param {object} data
         * @return {Promise}
         */
        save(data) {
            const newModelObject = model(data)
            return newModelObject.save()
        },

        /**
         *
         * @param {object | number}data
         * @return {Promise}
         */
        find(data) {
            if (_.isNumber(data)) {
                return model.findById(data)
            }
            return model.find(data)
        },
    }
}
