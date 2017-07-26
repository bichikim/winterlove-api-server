/* eslint-disable camelcase */
/**
 * @type {{Schema, model}}
 */
import mongoose from 'mongoose'
const name = 'users'
/**
 * @type {{loadClass}}
 */
const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: false,
    },
    api_id: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
})

/**
 *
 */
class UserModel {

}

schema.loadClass(UserModel)

export default mongoose.model(name, schema)
