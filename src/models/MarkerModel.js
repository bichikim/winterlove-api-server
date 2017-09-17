import createMongooseModel from '../lib/create-mongoose-model'

/**
 *
 */
class MarkerModel{
  static db = 'markers'
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

export default createMongooseModel(MarkerModel)
