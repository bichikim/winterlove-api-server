import config from '../config'
import File from '../models/FileModel'
import _ from 'lodash'
import uuid from 'uuid'
import uuidV5 from 'uuid/v5'
import fs from 'fs'
import path from 'path'
const fileUuid = (name) => {
  const [fileName, ext] = _.split(name, '.')
  const nameSpace = uuid.v1()
  return `${uuidV5(fileName, nameSpace)}.${ext}`
}
const uploadFiles = (files) => {
  if(_.isArray(files)){
    const promises = _.map(files, uploadFile)
    return Promise.all(promises)
  }
  if(files){
    return uploadFile(files)
  }
  throw new Error('[files] files is undefined')
}
const uploadFile = (file) => {
  if(!file){
    throw new Error('[files] file is undefined')
  }
  const originalName = file.hapi.filename
  const fileName = fileUuid(file.hapi.filename)
  const filePath = path.join(config.path.server.files, fileName)
  const fileStream = fs.createWriteStream(filePath)
  return new Promise((resolve, reject) => {
    file.on('error', function(error){
      reject(error)
    })
    file.pipe(fileStream)
    file.on('end', function(){
      resolve({
        fileName,
        originalName,
      })
    })
  })
}

const plugin = {
  /**
   * setting routes
   * @param {Server}server
   * @param {object}options
   * @param {function}next
   */
  register(server, options, next){
    const {labels} = config.server
    const webServer = server.select(labels)
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
        return new Promise((resolve, reject) => {
          uploadFiles(files).then((filesInfo) => {
            if(_.isArray(filesInfo)){
              resolve(filesInfo)
            } else if(_.isObject(filesInfo)){
              resolve([filesInfo])
            }
          }).catch((error) => {
            reject(error)
          })
        })
      },
      /**
       *
       * @param {Object} info
       * @param {Array} info.fileNames
       * @param {string} info.email
       * @return {Promise}
       */
      delete({fileNames, email}){
        return new Promise((resolve, reject) => {

        })
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
  name: 'files',
  version: '0.0.1',
}

export default plugin.register
