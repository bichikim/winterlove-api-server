/* eslint-disable camelcase */
/**
 * @type {{Schema, model}}
 */
import createMongooseModel from '../lib/create-mongoose-model'
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import config from '../config'

/**
 *
 */
class UserModel{
  static db = 'users'
  static schema = {
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      default: 'man',
    },
    beer: {
      type: String,
    },
    point: {
      type: Number,
      default: 0,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    modified: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  }
  static pre = {
    save({next, document}){
      // eslint-disable-next-line no-invalid-this
      const user = document
      const password = 'password'

      // only hash the password if it has been modified (or is new)
      if(!user.isModified(password)) return next()

      // override the password with the hashed one
      user[password] = passwordHash.generate(user[password], {
        algorithm: 'sha512',
      })
      next()
    },
  }
  /**
   *
   * @param {Array}role
   * @param {string}expiresIn
   * @return {*}
   */
  getToken(role = [], expiresIn = '18h'){
    const {email} = this
    const {key} = config.auth
    return jwt.sign({
      email,
      role: ['basics', ...role],
    }, key, {expiresIn})
  }

  /**
   *
   * @return {{gender: UserModel.gender, point: UserModel.point, email: UserModel.email, name: UserModel.name}}
   */
  getInfo(){
    const {gender, point, email, name} = this
    return {gender, point, email, name}
  }

  /**
   *
   * @param {String}password
   * @param {Function|null}next
   * @return {*}
   */
  verifyPassword(password, next = null){
    // verify password with db.hashed password
    // eslint-disable-next-line no-invalid-this
    const isVerified = (passwordHash.verify(password, this.password))
    if(next){
      next(isVerified)
    }
    return isVerified
  }
}

export default createMongooseModel(UserModel)
