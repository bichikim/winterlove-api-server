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
 *
 */
class PostModel {

}

schema.loadClass(PostModel)

export default mongoose.model(name, schema)
