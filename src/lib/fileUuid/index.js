import uuid from 'uuid'
import uuidV5 from 'uuid/v5'
import _ from 'lodash'

export default (name) => {
  const [fileName, ext] = _.split(name, '.')
  const nameSpace = uuid.v1()
  return `${uuidV5(fileName, nameSpace)}.${_.lowerCase(ext)}`
}
