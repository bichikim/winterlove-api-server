/* eslint-disable class-methods-use-this auth */
/**
 * @typedef {object} Joi
 * @property {function} validate
 * @property {function} string
 * @property {function} object
 * @property {function} boolean
 */
import Controller from './Controller'
import User from '../models/UserModel'
import _ from 'lodash'
import Boom from 'boom'

/**
 * AuthController
 * @class
 * @extends Controller
 */
export default class AuthController extends Controller {
  /**
   * signIn! if client needs Access token (jwt) response it
   * @param {{payload:object}} request
   * @param {Function} reply
   */
  signIn(request, reply) {
    const {email, password, isNeedAccessToken = false} = request.payload
    User.findOne({email})
      .then((documents) => {
        if (!documents) {
          return reply(Boom.notFound('Email not found.'))
        }
        const isVerified = documents.verifyPassword(password)
        if (isVerified) {
          const {gender, point, email, name} = documents._doc
          const data = {gender, point, email, name}
          if (isNeedAccessToken === true) {
            Object.assign(data, {access_token: documents.getToken()})
          }
          reply({
            success: true,
            data,
          })
        } else {
          reply(Boom.forbidden('Password incorrect'))
        }
      })
      .catch((error) => {
        reply(Boom.badImplementation(error))
      })
  }

  /**
   * sign up todo I must validate email via the email
   * @param {{payload:object}} request
   * @param {Function} reply
   */
  signUp(request, reply) {
    const {name, email, password, gender = 'man'} = request.payload
    const newUser = User({name, password, email, gender})
    newUser.save()
      .then((documents) => {
        reply({
          success: true,
        })
      }).catch((error) => {
        reply(Boom.badData(error.errmsg))
      })
  }

  /**
   *
   * @param {{payload:object}} request
   * @param {Function} reply
   */
  update(request, reply) {
    const {name, email, beforePassword, password, gender} = request.payload
    User.findOne({email})
      .then((documents) => {
        if (!documents) {
          return reply(Boom.notFound('Email not found.'))
        }
        const isVerified = documents.verifyPassword(beforePassword)
        if (isVerified) {
          if (name) {
            documents.name = name
          }
          if (email) {
            documents.email = email
          }
          if (password) {
            documents.password = password
          }
          if (gender) {
            documents.gender = gender
          }
          reply({
            success: true,
          })
        } else {
          reply(Boom.forbidden('Password incorrect'))
        }
      })
      .catch((error) => {
        reply(Boom.badImplementation(error))
      })
  }
}
