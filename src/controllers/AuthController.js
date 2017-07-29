/* eslint-disable class-methods-use-this auth */
import Controller from './Controller'
import User from '../models/UserModel'
import passwordHash from 'password-hash'
import config from '../config'
import _ from 'lodash'
const {NOT_FOUND, NOT_AUTH, NOT_UNIQUE} = config.errorCode
/**
 * @type {{object:function, validate:function, string:function}}
 */
import Joi from 'joi'

const getPassword = (password) => {
    return passwordHash.generate(password, {
        algorithm: 'sha512',
    })
}

const verify = (password, hashedPassword) => {
    return passwordHash.verify(password, hashedPassword)
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
        const result = Joi.validate(request.payload, Joi.object().keys({
            id: Joi.string().required(),
            password: Joi.string().required(),
        }))
        if (result.error) {
            return reply({
                success: false,
                error: result.error,
            })
        }
        const {id, password} = request.payload
        this._user.findOne({id})
            .then((documents) => {
                const hashedPassword = documents.password
                if (_.isObject(documents) && verify(password, hashedPassword)) {
                    reply({
                        success: true,
                        data: documents,
                    })
                } else {
                    reply({
                        success: false,
                        error_code: NOT_AUTH,
                        error: 'Password error',
                    })
                }
            })
            .catch((error) => {
                reply({
                    success: false,
                    error_code: NOT_FOUND,
                    error,
                })
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
        const result = Joi.validate(request.payload, Joi.object().keys({
            id: Joi.string().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().required(),
            gender: Joi.string(),
        }))
        if (result.error) {
            return reply({
                success: false,
                error: result.error,
            })
        }
        const {id, name, email, password, gender = 'man'} = request.payload
        const newUser = this._user({id, name, password: getPassword(password), email, gender})
        newUser.save()
            .then((documents) => {
                return reply({
                    success: true,
                })
            }).catch((error) => {
                return reply({
                    success: false,
                    errorCode: NOT_UNIQUE,
                    error: error.errmsg,
                })
            })
    }
}
