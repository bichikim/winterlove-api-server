import requireAll from 'require-all'

let controllers

/**
 *
 * @param {Server} server
 * @return {object}
 */
export default (server) => {
    if (!controllers) {
        controllers = requireAll({
            dirname: `${__dirname}/../controllers/`,
            filter: /(.+Controller)\.js$/,
            resolve: (controller) => {
                // eslint-disable-next-line new-cap
                return new controller.default(server)
            },
        })
    }
    return controllers
}
