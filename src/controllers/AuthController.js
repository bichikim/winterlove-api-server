/* eslint-disable class-methods-use-this auth */
/**
 * @typedef {object} Joi
 * @property {function} validate
 * @property {function} string
 * @property {function} object
 */
import Controller from './Controller'
import User from '../models/UserModel'
import _ from 'lodash'
import Boom from 'boom'
import Joi from 'joi'
const Schema = {
    signIn: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/),
        access_token: Joi.string(),
    }).with('email', 'password').without('password', 'access_token').without('email', 'access_token'),
    signUp: Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/).required(),
        gender: Joi.string(),
    }),
}

/**
 * AuthController
 * @class
 * @extends Controller
 */
export default class AuthController extends Controller {
    /**
     * @constructor
     * @param {Server} server
     */
    constructor(server) {
        super(server)
        this._user = User
    }

    /**
     *
     * @param {{payload:object}} request
     * @param {Function} reply
     * @return {*}
     */
    signIn(request, reply) {
        const result = Joi.validate(request.payload, Schema.signIn)
        if (result.error) {
            return reply(Boom.notAcceptable(result.error))
        }
        const {email, password} = request.payload
        this._user.findOne({email})
            .then((documents) => {
                if (!documents) {
                    return reply(Boom.notFound('Email not found.'))
                }
                documents.verifyPassword(password, (isVerified) => {
                    if (_.isObject(documents) && isVerified) {
                        reply({
                            success: true,
                            data: documents,
                        })
                    } else {
                        reply(Boom.forbidden('Password incorrect'))
                    }
                })
            })
            .catch((error) => {
                reply(Boom.badImplementation(error))
            })
    }

    /**
     *
     * @param {{}} request
     * @param {Function} reply
     */
    signOut(request, reply) {
        // TODO Make this
    }

    /**
     *
     * @param {{payload:object}} request
     * @param {Function} reply
     * @return {*}
     */
    signUp(request, reply) {
        const result = Joi.validate(request.payload, Schema.signUp)
        if (result.error) {
            return reply(Boom.notAcceptable(result.error))
        }
        const {name, email, password, gender = 'man'} = request.payload
        const newUser = this._user({name, password, email, gender})
        newUser.save()
            .then((documents) => {
                reply({
                    success: true,
                })
            }).catch((error) => {
                reply(Boom.badImplementation(error.errmsg, {success: false}))
            })
    }
}
