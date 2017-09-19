import uuid from 'uuid'
import uuidV5 from 'uuid/v5'
import _ from 'lodash'

export default (name, namespace = 'unknown') => {
  const ext = _.split(name, '.').pop()
  return `${uuidV5(name, namespace)}.${_.lowerCase(ext)}`
}
