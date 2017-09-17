import createMongooseModel from '../lib/create-mongoose-model'

/**
 *
 */
class UserModel{
  static db = 'db-name'
  static schema = {
    id: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
  }
  static pre = {
    //
  }
  static post = {
    //
  }
}

export default createMongooseModel(UserModel)
