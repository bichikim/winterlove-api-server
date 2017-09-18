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
import Boom from 'boom'

/**
 * AuthController
 * @class
 * @extends Controller
 */
export default class AuthController extends Controller{
  /**
   * signIn! if client needs Access token (jwt) response it
   * @param {{payload:object}} request
   * @param {Function} reply
   */
  signIn(request, reply){
    const {email, password, isNeedAccessToken = false} = request.payload
    User.findOne({email}).then((documents) => {
      if(!documents){
        return reply(Boom.notFound('Email not found.'))
      }
      const isVerified = documents.verifyPassword(password)
      if(isVerified){
        const data = documents.getInfo()
        if(isNeedAccessToken === true){
          Object.assign(data, {accessToken: documents.getToken()})
        }
        reply(data)
      } else {
        reply(Boom.forbidden('Password incorrect'))
      }
    }).catch((error) => {
      reply(Boom.badImplementation(error))
    })
  }

  /**
   * sign up
   * @param {{payload:object}} request
   * @param {Function} reply
   */
  signUp(request, reply){
    const {name, email, password, gender = 'man'} = request.payload
    const newUser = User({name, password, email, gender})
    newUser.save().then((documents) => {
      reply({...documents.getInfo(), accessToken: documents.getToken()})
    }).catch((error) => {
      reply(Boom.badData(error.errmsg))
    })
  }

  /**
   *
   * @param {{payload:object}} request
   * @param {Function} reply
   */
  update(request, reply){
    const {name, email, nextEmail, password, nextPassword, gender} = request.payload
    User.findOne({email}).then((documents) => {
      if(!documents){
        return reply(Boom.notFound('Email not found.'))
      }
      const isVerified = documents.verifyPassword(password)
      if(!isVerified){
        return reply(Boom.forbidden('Password incorrect'))
      }

      if(name){
        documents.name = name
      }
      if(nextEmail){
        documents.email = nextEmail
      }
      if(nextPassword){
        documents.password = nextPassword
      }
      if(gender){
        documents.gender = gender
      }
      documents.save().then(() => {
        reply({
          success: true,
        })
      }).catch((error) => {
        reply(Boom.badImplementation(error))
      })
    }).catch((error) => {
      reply(Boom.badImplementation(error))
    })
  }

  /**
   *
   * @param {{payload:object}} request
   * @param {Function} reply
   */
  delete(request, reply){
    const {email, password} = request.payload
    User.findOne({email}).then((documents) => {
      if(!documents){
        return reply(Boom.notFound('Email not found.'))
      }
      const isVerified = documents.verifyPassword(password)
      if(!isVerified){
        reply(Boom.forbidden('Password incorrect'))
      }
      User.remove().then(() => {
        reply({
          success: true,
        })
      })
    }).catch((error) => {
      reply(Boom.badImplementation(error))
    })
  }
}
