import _ from 'lodash'
export default (item) => (_.isArray(item) ? item : [item])
