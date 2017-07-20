let env

try {
    env = require('../.env.json')
} catch (e) {
    console.warn(`Warning server needs .env.json ${e}`)
    env = {}
}

export default env
