import createMongooseModel from '../lib/create-mongoose-model'

/**
 *
 */
class PostModel{
  static db = 'posts'
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

export default createMongooseModel(PostModel)
