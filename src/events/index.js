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
  if(!events){
    events = requireAll({
      dirname: __dirname,
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
    const eventInstant = new Event(server, io, key)
    if(eventInstants[eventInstant.nameSpace]){
      eventInstants[eventInstant.nameSpace].push(eventInstant)
      return true
    }
    _.assign(eventInstants, {[eventInstant.nameSpace]: [eventInstant]})
    return true
  })

  return eventInstants
}
