/* global __dirname*/
import requireAll from 'require-all'

const composers = (function(global) {
    return requireAll({
        dirname: `${__dirname}/../composers/`,
        filter: /^(?!example).*(\.js)$/,
        resolve: (config) => {
            return config.default
        },
        map: (name, path) => {
            return path.split('//').pop()
            .split('.')
            .shift()
        },
    })
}(global))

export default composers
