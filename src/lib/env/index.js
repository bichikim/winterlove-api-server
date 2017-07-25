import fs from 'fs'

let env

if (!env) {
    env = {}
    let envLow
    try {
        envLow = fs.readFileSync(`${__dirname}/../../../.env`).toString()
    } catch (e) {
        console.warn(`Warning server needs .env.json ${e}`)
        env = {}
    }
    envLow.split('\n').forEach((declaration) => {
        declaration = declaration.trim()

        if (declaration.length > 1 && declaration.indexOf('=') === -1) {
            throw new Error('invalid declaration:', declaration)
        }

        const [key, value] = declaration.split('=')

        if (value && key) {
            env[key.trim()] = value.trim()
        }
    })
}

export default env
