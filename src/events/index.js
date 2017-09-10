import requireAll from 'require-all'
import _ from 'lodash'

let events

/**
 *
 * @param {Server} server
 * @param {object} io
 * @return {object}
 */
export const getEventClasses = () => {
  if (!events) {
    events = requireAll({
      dirname: `${__dirname}/../events/`,
      filter: /(.+Event)\.js$/,
      resolve: (event) => {
        return event.default
      },
    })
  }
  return events
}

export default (server, io) => {
  const events = getEventClasses()
  const eventInstants = {}
  _.forEach(events, (Event, key) => {
    _.assign(eventInstants, {[key]: new Event(server, io, key)})
  })
  return eventInstants
}
