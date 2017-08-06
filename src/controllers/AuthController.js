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
import Joi from 'joi'
const SchemaItems = {
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/),
    gender: Joi.string(),
}
const Schema = {
    signIn: Joi.object().keys({
        email: SchemaItems.email.required(),
        password: Joi.string().required(),
        isNeedAccessToken: Joi.boolean(),
    }),
    signUp: Joi.object().keys({
        name: SchemaItems.name.required(),
        email: SchemaItems.email.required(),
        password: SchemaItems.password.required(),
        gender: SchemaItems.gender,
    }),
    update: Joi.object().keys({
        name: SchemaItems.name,
        email: SchemaItems.email,
        password: SchemaItems.email,
        gender: SchemaItems.gender,
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
        const {email, password, isNeedAccessToken} = request.payload
        this._user.findOne({email})
            .then((documents) => {
                if (!documents) {
                    return reply(Boom.notFound('Email not found.'))
                }
                const isVerified = documents.verifyPassword(password)
                if (_.isObject(documents) && isVerified) {
                    const data = documents._doc
                    if (isNeedAccessToken === 'true') {
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
                reply(Boom.badData(error.errmsg))
            })
    }
}
