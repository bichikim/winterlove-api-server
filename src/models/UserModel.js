/* eslint-disable camelcase */
/**
 * @type {{Schema, model}}
 */
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import config from '../config'
import {encodeBase64ID} from '../lib/base64ID'

/**
 *
 */
export default class UserModel{
  static db = 'users'
  static schema = {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
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
  getToken(role = [], expiresIn = '20m'){
    const {_id} = this
    const {key} = config.auth
    const id = encodeBase64ID(_id)
    return jwt.sign({
      id,
      roles: ['basics', ...role],
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
