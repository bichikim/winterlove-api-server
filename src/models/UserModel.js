/* eslint-disable camelcase */
/**
 * @type {{Schema, model}}
 */
import mongoose from 'mongoose'
const name = 'users'
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        default: 'man',
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

schema.loadClass(UserModel)

export default mongoose.model(name, schema)
