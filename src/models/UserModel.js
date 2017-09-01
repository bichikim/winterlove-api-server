/* eslint-disable camelcase */
/**
 * @type {{Schema, model}}
 */
import mongoose from 'mongoose'
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'

import config from '../config'
const name = 'users'
const password = 'password'
const {APP_KEY} = config.auth
const schema = new mongoose.Schema({
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
})

/**
 *
 */
class UserModel {
}

schema.pre('save', function(next) {
  // eslint-disable-next-line no-invalid-this
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified(password)) return next()

  // override the password with the hashed one
  user[password] = passwordHash.generate(user[password], {
    algorithm: 'sha512',
  })
  next()
})

schema.methods.verifyPassword = function(password, next) {
  // verify password with db.hashed password
  // eslint-disable-next-line no-invalid-this
  const isVerified = (passwordHash.verify(password, this.password))
  if (next) {
    next(isVerified)
  }
  return isVerified
}

schema.methods.getToken = function(role = [], expiresIn = '18h') {
  const {email} = this
  return jwt.sign({
    email,
    role: ['basics', ...role],
  }, APP_KEY, {expiresIn})
}

schema.loadClass(UserModel)

export default mongoose.model(name, schema)
