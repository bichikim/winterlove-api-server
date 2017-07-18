/* global __dirname global*/
import requireAll from 'require-all'

let config

export default () => {
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
