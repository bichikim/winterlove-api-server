/* eslint-disable class-methods-use-this auth */
import Controller from './Controller'
import User from '../models/UserModel'
import passwordHash from 'password-hash'
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
        this._user.find({id, password})
            .then((documents) => {
                if (documents.length < 1) {
                    reply({
                        success: false,
                        data: documents,
                    })
                }
                return reply({
                    success: true,
                    data: documents,
                })
            /**
             * @param {{errmsg}} error
             */
            }).catch((error) => {
                return reply({
                    success: false,
                    error: error.errmsg,
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

        }))
        if (result.error) {
            return reply({
                success: false,
                error: result.error,
            })
        }
        const {id, name, email, password} = request.payload
        const newUser = this._user({id, name, password: getPassword(password), email})
        newUser.save()
            .then((documents) => {
                reply({
                    success: true,
                    data: documents,
                })
            }).catch((error) => {
                reply({
                    success: false,
                    error: error.errmsg,
                })
            })
    }
}
