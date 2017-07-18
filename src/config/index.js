/* global __dirname global*/
import requireAll from 'require-all'

let config

const getConfig = () => {
    if (!config) {
        config = requireAll({
            dirname: `${__dirname}/`,
            filter: /^(?!index).*(\.js)$/,
            resolve: (config) => {
                return config.default
            },
            map: (name, path) => {
                return path.split('//').pop()
                .split('.')
                .shift()
            },
        })
    }
    return config
}

export default getConfig()
