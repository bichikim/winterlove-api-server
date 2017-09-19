import config from '../config'
import File from '../models/FileModel'
import _ from 'lodash'
import del from 'del'
import path from 'path'
import uploadFiles from '../lib/uploadFiles'
import toBeArray from '../lib/toBeArray'
const saveFileToDB = (fileInfo) => {
  const promises = _.map(fileInfo, (item) => (File({...item}).save()))
  return Promise.all(promises)
}
const plugin = {
  /**
   * todo in progress
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next){
    const filesPath = config.path.server.files
    server.expose({
      /**
       *
       * @param {Array}files
       * @param {String}email
       * @return {Promise}
       */
      upload(files, email){
        if(!files){
          throw new Error('[files] upload needs files')
        }
        if(!email){
          throw new Error('[files] upload needs email')
        }
        const uploadFilesAndDB = async function(files, email){
          const result = await uploadFiles({files, email, filesPath})
          const filesInfo = toBeArray(result)
          return saveFileToDB(filesInfo)
        }
        return uploadFilesAndDB(files, email)
      },
      /**
       *
       * @param {Object} info
       * @param {Array} info.fileNames
       * @param {string} info.email
       * @return {Promise}
       */
      delete({fileNames, email}){
        const deleteOne = async function(fileName){
          const document = await File.findOne({fileName, email})
          await document.remove()
          return await del(path.join(filesPath, fileName))
        }
        return Promise.all(_.map(fileNames, deleteOne))
      },
      /**
       *
       * @param {Array}fileNames
       * @return {Promise}
       */
      move(fileNames){
        return new Promise((resolve, reject) => {

        })
      },
    })
    next()
  },
}

plugin.register.attributes = {
  name: 'file',
  version: '0.0.1',
}

export default plugin.register
