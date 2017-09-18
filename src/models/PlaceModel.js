import createMongooseModel from '../lib/create-mongoose-model'

/**
 *
 */
class PlaceModel{
  static db = 'places'
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

export default createMongooseModel(PlaceModel)