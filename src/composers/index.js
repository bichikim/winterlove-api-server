/* global __dirname*/
import requireAll from 'require-all'

let composers

/**
 * 같은 폴더에 무조건 제공 합칠 값이 있으면 합쳐서 보여준다.
 * @return {*}
 */
export default () => {
    if (!composers) {
        composers = requireAll({
            dirname: `${__dirname}/../composers/`,
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
    return composers
}
