import createMongooseModel from '../lib/create-mongoose-model'

/**
 *
 */
class BeerModel{
  static db = 'beers'
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

export default createMongooseModel(BeerModel)
