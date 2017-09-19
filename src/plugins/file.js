import config from '../config'
import File from '../models/FileModel'
import _ from 'lodash'
import uuid from 'uuid'
import uuidV5 from 'uuid/v5'
import fs from 'fs'
import del from 'del'
import path from 'path'
const fileUuid = (name) => {
  const [fileName, ext] = _.split(name, '.')
  const nameSpace = uuid.v1()
  return `${uuidV5(fileName, nameSpace)}.${ext}`
}
const uploadFiles = ({files, email, filesPath}) => {
  const uploadFile = (file) => {
    if(!file){
      throw new Error('[files] file is undefined')
    }
    const fileName = fileUuid(file.hapi.filename)
    const filePath = path.join(filesPath, fileName)
    const fileStream = fs.createWriteStream(filePath)
    return new Promise((resolve, reject) => {
      file.on('error', function(error){
        reject(error)
      })
      file.pipe(fileStream)
      file.on('end', function(){
        resolve({
          email,
          fileName,
        })
      })
    })
  }
  if(_.isArray(files)){
    const promises = _.map(files, uploadFile)
    return Promise.all(promises)
  }
  if(files){
    return uploadFile(files)
  }
  throw new Error('[files] files is undefined')
}

const toBeArray = (item) => (_.isArray(item) ? item : [item])
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
        return _.map(fileNames, deleteOne)
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
