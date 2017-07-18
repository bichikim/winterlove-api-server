/* eslint-disable class-methods-use-this auth */
import Controller from './Controller'
import User from '../models/UserModel'
import Joi from 'joi'
/**
 * AuthController
 */
export default class AuthController extends Controller {

    /**
     *
     * @param {{}} server
     */
    constructor(server) {
        super(server)
        this._user = User
    }

    /**
     *
     * @param {{}} request
     * @param {Function} reply
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
     * @param {{}} request
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
        const newUser = this._user({id, name, password, email})
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
