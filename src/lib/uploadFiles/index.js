import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import fileUuid from '../fileUuid'

export const uploadFile = ({file, email, filesPath}) => {
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

export default ({files, email, filesPath}) => {
  if(_.isArray(files)){
    const promises = _.map(files, (file) => (uploadFile({file, email, filesPath})))
    return Promise.all(promises)
  }
  if(files){
    return uploadFile(files)
  }
  throw new Error('[files] files is undefined')
}
