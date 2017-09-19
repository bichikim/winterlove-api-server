/**
 *
 */
export default class PostModel{
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
