/**
 *
 */
export default class FileModel{
  static db = 'files'
  static schema = {
    fileName: {
      type: String,
      required: true,
      unique: true,
      index: true,
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
