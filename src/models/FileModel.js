import createMongooseModel from '../lib/create-mongoose-model'

/**
 *
 */
class FileModel{
  static db = 'files'
  static schema = {
    fileName: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    email: {
      type: String,
      required: true,
    },
  }
  static pre = {
    //
  }
  static post = {
    //
  }
}

export default createMongooseModel(FileModel)
