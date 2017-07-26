/**
 * @type {{Schema, model}}
 */
import mongoose from 'mongoose'
const name = 'posts',
    schema = new mongoose.Schema({
        name: String,
        created: {
            type: Date,
            default: Date.now,
        },
        modified: {
            type: Date,
            default: Date.now,
        },
    })

/**
 * PostModal
 * @class
 */
class PostModel {

}

schema.loadClass(PostModel)

export default mongoose.model(name, schema)
